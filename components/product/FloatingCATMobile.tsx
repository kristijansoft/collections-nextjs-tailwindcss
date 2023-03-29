/* eslint-disable sort-destructure-keys/sort-destructure-keys */
import { useCart } from 'context/CartProvider';
import React, { useEffect, useState, useMemo } from 'react';
import tw, { styled } from 'twin.macro';

import { currencyFormatter } from '../../utils/general';

const IconButton = styled.button<{
  icon: string;
  activated: boolean;
  size: number;
}>`
  background: url(${({ icon }) => icon}) center center / auto
    ${({ size }) => size}px no-repeat;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  filter: invert(${({ activated }) => (activated ? 0 : '0.5')});
  transition: all 0.2s ease-in;
`;

const Badge = styled.div<{ activated: boolean }>`
  ${tw`absolute flex items-center justify-center w-4 h-4 font-bold text-center text-black border-2 border-white border-solid bg-primary-200`}
  right: -7px;
  top: -7px;
  border-radius: 100px;
  font-size: 10px;
  line-height: 12px;
`;

const FloatingCATMobile = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [openBtns, setOpenBtns] = useState<boolean>(false);

  const { currentCartItem, isOpenCartSidebar, openCartSidebar, addToCart } =
    useCart();

  const { cartItems } = useCart();

  const totalCartNum = useMemo(
    () => cartItems?.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartPrice = useMemo(() => {
    return currencyFormatter(
      parseInt(currentCartItem?.price?.amount) * currentCartItem?.quantity,
      currentCartItem?.price?.currencyCode
    );
  }, [currentCartItem]);

  const onClickCart = () => {
    setTabIndex(2);
    openCartSidebar(true);
  };

  useEffect(() => {
    if (!isOpenCartSidebar) {
      setTabIndex(0);
    }
  }, [isOpenCartSidebar]);

  const onAddToCart = () => {
    setTabIndex(1);
    addToCart(currentCartItem);
    openCartSidebar(true);
  };

  const openButtons = () => {
    setOpenBtns(true);
    addToCart(currentCartItem);
  };

  return (
    <div css={[{ left: '6vw', width: '88vw' }]} tw="fixed bottom-5 z-20">
      {openBtns ? (
        <div
          css={[
            {
              borderRadius: 69,
              boxShadow: '0px 14px 56px rgba(0, 0, 0, 0.14)',
            },
          ]}
          tw="bg-white px-9 py-3.5 w-full flex justify-between items-center"
        >
          <IconButton
            activated={tabIndex === 0}
            icon="/assets/images/home.svg"
            size={18.4}
            onClick={() => setTabIndex(0)}
          />

          <IconButton
            activated={tabIndex === 1}
            icon="/assets/images/plus.svg"
            size={17}
            onClick={onAddToCart}
          />
          <div tw="relative" onClick={onClickCart}>
            <IconButton
              activated={tabIndex === 2}
              icon="/assets/images/cart.svg"
              size={20}
            />
            <Badge activated={tabIndex === 2}>{totalCartNum}</Badge>
          </div>
        </div>
      ) : (
        <button
          css={[
            {
              borderRadius: 69,
              boxShadow: '0px 14px 56px rgba(0, 0, 0, 0.14)',
            },
            currentCartItem?.available
              ? tw`bg-primary-200 text-textColor-primary`
              : tw`text-white bg-gray-600 cursor-not-allowed`,
          ]}
          disabled={!currentCartItem?.available}
          tw="outline-none font-bold text-lg px-5 py-3.5 w-full"
          onClick={openButtons}
        >
          {currentCartItem?.available
            ? `ADD TO CART • ${cartPrice}`
            : 'Sold Out'}
        </button>
      )}
    </div>
  );
};

export default FloatingCATMobile;
