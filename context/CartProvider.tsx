import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ICart, ICartItem, ICheckout, Announcement } from './types';
import { getShopifyClient } from '@services/Shopifyclient';
import { useRouter } from 'next/router';

const initialCart: ICart = {
  announcement: null,
  cartItems: [],
  currentCartItem: null,
  isOpenCartSidebar: false,
  alsoLikeProducts: null,
  isOpenCartCTA: false,
};

const CartContext = createContext<ICart>({ ...initialCart });

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [currentCartItem, setCurrentCartItem] = useState<ICartItem>();
  const [isOpenCartSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const [checkout, setCheckout] = useState<ICheckout>(null);
  const [announcement, setAnnouncement] = useState<Announcement>(null);
  const [alsoLikeProducts, setAlsoLikeProducts] = useState<any[]>(null);
  const [isOpenCartCTA, setIsOpenCartCTA] = useState<boolean>(false);

  const { query } = useRouter();

  const shopifyClient = useMemo(
    () => getShopifyClient(query.brand as string),
    [query.brand]
  );

  useEffect(() => {
    const getCheckoutData = async (checkoutId) => {
      const data = await shopifyClient.checkout.fetch(checkoutId);
      if (data?.lineItems?.length) {
        const crntItems: ICartItem[] = data?.lineItems?.map((item) => {
          const scentVariant =
            item.variant.selectedOptions.filter((option) =>
              ['Color', 'Scent'].includes(option.name)
            )[0]?.value ?? null;
          const sizeVariant =
            item.variant.selectedOptions.filter(
              (option) => option.name === 'Size'
            )[0]?.value ?? null;

          return {
            imageSrc:
              item?.variant?.image?.src ?? '/assets/images/skeleton.jpg',
            price: {
              amount: item.variant.priceV2.amount,
              currencyCode: item.variant.priceV2.currencyCode,
            },
            productName: item.title,
            quantity: item.quantity,
            scentVariant,
            sizeVariant,
            sku: item.variant.sku,
            variantId: item.variant.id,
          };
        });

        setCartItems(crntItems);
      }
    };

    if (typeof window !== 'undefined') {
      const chk = localStorage.getItem(`${query.brand}.checkout`);
      if (chk) {
        const chkObj: ICheckout = JSON.parse(chk);
        setCheckout(chkObj);
        getCheckoutData(chkObj.id);
      }
    }
  }, []);

  const onCheckout = async (cartItem?: ICartItem) => {
    try {
      if (cartItem) await addToCart(cartItem);
      window.location.href = checkout.webUrl;
    } catch (err) {
      console.error('Error in checkout', err);
    }
  };

  const addToCart = (cartItem: ICartItem) => {
    const newCartItems = [...cartItems];
    const existedCartItemIndex = newCartItems.findIndex(
      (item) => item.variantId === cartItem.variantId
    );

    if (existedCartItemIndex !== -1) {
      const newCartItem = { ...newCartItems[existedCartItemIndex] };
      newCartItem.quantity = newCartItem.quantity + cartItem.quantity;

      newCartItems[existedCartItemIndex] = newCartItem;
      updateCartLineItem(newCartItem);
    } else {
      newCartItems.push(cartItem);
      addLineItems(newCartItems);
    }
    setCartItems(newCartItems);
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push(cartItem);
    }
  };

  const addLineItems = async (items: ICartItem[]) => {
    if (!items?.length) return;

    try {
      if (!checkout) {
        const chk: ICheckout = await shopifyClient.checkout.create();
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push(chk);
        }
        if (!chk || !chk.id) {
          console.error('failed to create checkout');
          return;
        }

        const { id, webUrl } = chk;

        await shopifyClient.checkout.addLineItems(
          id,
          items.map(({ quantity, variantId }) => ({
            quantity,
            variantId,
          }))
        );

        setCheckout({ id, webUrl });

        localStorage.setItem(
          `${query.brand}.checkout`,
          JSON.stringify({ id, webUrl })
        );
        return;
      }

      await shopifyClient.checkout.addLineItems(
        checkout.id,
        items.map(({ quantity, variantId }) => ({
          quantity,
          variantId,
        }))
      );
    } catch (error) {
      console.error('error in creating checkout', error);
    }
  };

  const removeCartItem = async (cartItem: ICartItem) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex((item) => item.sku === cartItem.sku);
    if (index > -1) {
      newCartItems.splice(index, 1);
      setCartItems(newCartItems);

      if (!checkout) return;
      const crntCheckout = await shopifyClient.checkout.fetch(checkout.id);

      if (crntCheckout?.lineItems?.length) {
        const itemIndex = crntCheckout.lineItems.findIndex(
          (item) => item?.variant?.id === cartItem.variantId
        );
        if (itemIndex !== -1) {
          await shopifyClient.checkout.removeLineItems(checkout.id, [
            crntCheckout?.lineItems[itemIndex]?.id,
          ]);
        }
      }
    }
  };

  const updateCartLineItem = async (updatedCartItem: ICartItem) => {
    const crntCheckout = await shopifyClient.checkout.fetch(checkout.id);

    if (crntCheckout?.lineItems?.length) {
      const itemIndex = crntCheckout.lineItems.findIndex(
        (item) => item?.variant?.id === updatedCartItem.variantId
      );
      if (itemIndex !== -1) {
        await shopifyClient.checkout.updateLineItems(checkout.id, [
          {
            id: crntCheckout?.lineItems[itemIndex]?.id,
            quantity: updatedCartItem.quantity,
          },
        ]);
      }
    }
  };

  const updateCart = async (
    oldVariantId: string,
    updatedCartItem: ICartItem
  ) => {
    const newCartItems = [...cartItems];
    const existedCartItemIndex = newCartItems.findIndex(
      (item) => item.variantId === oldVariantId
    );

    if (existedCartItemIndex !== -1) {
      newCartItems[existedCartItemIndex] = { ...updatedCartItem };
    }

    setCartItems(newCartItems);

    if (!checkout) return;

    try {
      if (oldVariantId !== updatedCartItem.variantId) {
        await shopifyClient.checkout.removeLineItems(checkout.id, [
          oldVariantId,
        ]);
        await addLineItems([updatedCartItem]);
        return;
      }
      updateCartLineItem(updatedCartItem);
    } catch (error) {
      console.error('error in updating cart items', error);
    }
  };

  const onSetAnnouncement = (data: Announcement) => setAnnouncement(data);
  const onSetAlsoLikeProducts = (data: any[]) => setAlsoLikeProducts(data);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        announcement,
        cartItems,
        checkout: onCheckout,
        currentCartItem,
        isOpenCartSidebar,
        alsoLikeProducts,
        isOpenCartCTA,
        onSetAnnouncement,
        onSetCurrentCurtItem: (cartItem) => setCurrentCartItem({ ...cartItem }),
        openCartSidebar: (isOpen: boolean) => setIsOpenSidebar(isOpen),
        removeCartItem,
        updateCart,
        onSetAlsoLikeProducts,
        onSetIsOpenCartCTA: (isOpen: boolean) => setIsOpenCartCTA(isOpen),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) throw new Error('useCart must be used inside a `CartProvider`');

  return context;
}
