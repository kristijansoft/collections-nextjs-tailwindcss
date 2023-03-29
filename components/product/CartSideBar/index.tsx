import React, { useRef, useMemo, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import ScrollContainer from 'react-indiana-drag-scroll';

import ProgressBar from '@components/ProgressBar';
import { useCart } from 'context/CartProvider';
import { useProduct } from 'context/ProductProvider';
import { ICartItem } from 'context/types';
import { currencyFormatter } from '../../../utils/general';
import { SecondaryButton } from '../../buttons';
import CartItem from '../CartItem';

import ProductItem from './ProductItem';

const CartSideBar = () => {
  const sideBarRef = useRef();
  const { productContentData } = useProduct();

  const {
    alsoLikeProducts,
    announcement,
    cartItems,
    checkout,
    isOpenCartSidebar,
    openCartSidebar,
    updateCart,
  } = useCart();

  const {
    productShopifyData: { variants },
  } = useProduct();

  const totalPrice = useMemo(() => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const {
        price: { amount },
        quantity,
      } = cartItems[i];
      total += parseInt(amount) * quantity;
    }

    return currencyFormatter(total, 'USD');
  }, [cartItems]);

  const totalCartNum = useMemo(
    () => cartItems?.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const onChangeQuantity = (quantity: number, cartItem: ICartItem) => {
    updateCart(cartItem.variantId, { ...cartItem, quantity });
  };

  const onChangeVariant = (cartItem: ICartItem) => {
    if (variants?.length) {
      let sortedVariant = variants.filter(
        (item) =>
          item.selectedOptions[
            item?.selectedOptions?.findIndex((item) =>
              ['Color', 'Scent'].includes(item.name)
            )
          ]?.value === cartItem.scentVariant
      );

      if (cartItem.sizeVariant) {
        sortedVariant = sortedVariant.filter(
          (item) =>
            item.selectedOptions[
              item?.selectedOptions?.findIndex((item) => item.name === 'Size')
            ]?.value === cartItem.sizeVariant?.toLowerCase()
        );
      }

      if (sortedVariant?.length === 1) {
        const { id, priceV2, sku, title } = sortedVariant[0];
        const productIndex =
          productContentData?.product?.colorVariantsCollection?.items?.findIndex(
            (item) => item.shopifyVariantId === sku
          );

        if (productIndex !== -1) {
          updateCart(cartItem.variantId, {
            ...cartItem,
            imageSrc:
              productContentData?.product?.colorVariantsCollection?.items[
                productIndex
              ]?.imageCollection?.image1?.src ?? '',
            price: priceV2,
            productName: title,
            quantity: cartItem.quantity,
            variantId: id,
          });
        }
      }
    }
  };

  useEffect(() => {
    if (isOpenCartSidebar) {
      document.body.classList.add('stop-scrolling');
    } else {
      document.body.classList.remove('stop-scrolling');
    }
  }, [isOpenCartSidebar]);

  const containerHeight = () => {
    if (typeof window !== 'undefined') {
      return `${window.document?.documentElement?.clientHeight}px`;
    }
    return '100vh';
  };
  return (
    <>
      <BackgroundArea showCart={isOpenCartSidebar} />
      <Container
        ref={sideBarRef}
        showCart={isOpenCartSidebar}
        tw="z-50 fixed top-0 right-0 bg-white h-screen w-screen md:max-w-lg overflow-hidden transition duration-700 ease-in-out transform"
        css={[
          {
            height: containerHeight(),
          },
        ]}
      >
        <div tw="flex flex-col-reverse md:flex-col sticky top-0 bg-white z-50">
          <CartHeader>
            <button
              tw="relative md:absolute md:left-8"
              onClick={() => openCartSidebar(false)}
            >
              <img
                alt="Menu"
                src="/assets/images/back-arrow.svg"
                tw="block md:hidden"
              />
              <img
                alt="Menu"
                src="/assets/images/close.svg"
                tw="hidden md:block"
              />
            </button>
            <div tw="w-full font-bold ml-4 md:ml-0 text-2xl md:text-center">
              Your Cart ({totalCartNum})
            </div>
          </CartHeader>
          {announcement && (
            <div tw="flex w-full bg-primary-200 py-3 font-bold uppercase justify-center flex-col">
              <span
                css={[{ fontSize: 13 }]}
                tw="text-center font-bold uppercase mr-6 tracking-widest text-white"
              >
                {announcement.title}
              </span>
              {!!announcement.progress && announcement.progress !== 100 && (
                <div tw="w-full px-4 mt-1">
                  <ProgressBar progress={announcement.progress} />
                </div>
              )}
            </div>
          )}
        </div>
        <CartContent>
          {cartItems.map((item, index) => (
            <div
              key={index}
              css={[index === cartItems.length - 1 && tw`border-none`]}
              tw="pb-7 mx-5 mt-6 border-solid border-black border-b md:mx-8"
            >
              <CartItem
                {...item}
                setQuantity={(quantity) => onChangeQuantity(quantity, item)}
                setScentVariant={(scentVariant) =>
                  onChangeVariant({ ...item, scentVariant })
                }
                setSizeVariant={(sizeVariant) =>
                  onChangeVariant({ ...item, sizeVariant })
                }
              />
            </div>
          ))}
          {!!alsoLikeProducts?.length && (
            <div tw="flex flex-col">
              <span tw="text-[24px] font-bold leading-10 text-center pt-6 pb-5">
                You May Also Like
              </span>
              <ScrollArea
                hideScrollbars={false}
                horizontal={true}
                vertical={false}
              >
                {alsoLikeProducts?.map((product, index) => (
                  <div
                    key={index}
                    css={[
                      index === 0 ? tw`pl-5` : tw`pl-3`,
                      index === alsoLikeProducts.length - 1 && tw`pr-5`,
                    ]}
                  >
                    <ProductItem product={product} />
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}
        </CartContent>
        <CartBottom>
          <div tw="mx-5 mt-6 flex flex-col md:mx-8">
            <div tw="flex flex-row justify-between">
              <span tw="font-bold text-lg">Subtotal</span>
              <span tw="font-bold text-lg">{totalPrice}</span>
            </div>
            <div tw="flex flex-row justify-between mt-[18px]">
              <span tw="font-bold text-lg">Shipping</span>
              <span tw="font-bold text-lg">
                {announcement?.progress < 100
                  ? 'Calculated at Checkout'
                  : 'Free'}
              </span>
            </div>
          </div>
          <div tw="mt-[27px] md:mt-8 mx-5 md:mx-8">
            <SecondaryButton width="100%" onClick={() => checkout()}>
              Checkout with Bullstrap
            </SecondaryButton>
          </div>
        </CartBottom>
      </Container>
    </>
  );
};

export default CartSideBar;

const ScrollArea = styled(ScrollContainer)`
  ${tw`flex w-full overflow-auto`}
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div<{ showCart: boolean }>`
  ${({ showCart }) => (showCart ? tw`translate-x-0` : tw`translate-x-full`)}
  @media screen and (min-width: 768px) {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  }
`;

const CartContent = styled.div`
  ${tw`w-full max-h-[calc(100vh - 178.5px)] md:max-h-[calc(100vh - 203.5px)] overflow-y-auto pb-[183px]`}
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BackgroundArea = styled.div<{ showCart: boolean }>`
  background-color: ${({ showCart }) =>
    showCart ? 'rgba(255, 255, 255, 0.72)' : 'transparent'};
  height: 100vh;
  left: 0;
  top: 0;
  position: fixed;
  width: 100vw;
  visibility: ${({ showCart }) => (showCart ? 'visible' : 'hidden')};
  ${tw`transition duration-700 ease-in-out`}
  @media screen and (max-width: 425px) {
    background-color: transparent;
  }
`;

const CartHeader = styled.div`
  ${tw`flex flex-row items-center px-4 py-6 pl-6 md:py-8`}
  @media screen and (max-width: 425px) {
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  }
`;

const CartBottom = styled.div`
  ${tw`absolute bottom-0 flex flex-col w-full pb-8 bg-white bg-opacity-[94%] `}
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.08);
`;
