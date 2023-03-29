import tw, { styled } from 'twin.macro';

import React, { FC, useMemo } from 'react';
import SwiperCore, { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { currencyFormatter } from '../../utils/general';
import { useCart } from 'context/CartProvider';
import Image from 'next/image';
import { getSkeletonImage } from '@components/Skeleton';

SwiperCore.use([FreeMode, Pagination]);

type FloatingCATDesktopProps = {
  isShow: boolean;
  sections: Array<{ id: string; title: string }>;
};

const FloatingCATDesktop: FC<FloatingCATDesktopProps> = ({
  isShow,
  sections,
}) => {
  const { addToCart, currentCartItem, openCartSidebar } = useCart();

  const onAddToCart = () => {
    addToCart(currentCartItem);
    openCartSidebar(true);
  };

  const cartPrice = useMemo(() => {
    return currencyFormatter(
      parseInt(currentCartItem?.price?.amount) * currentCartItem?.quantity,
      currentCartItem?.price?.currencyCode
    );
  }, [currentCartItem]);

  const onClickSectionLink = (e: any, secitem) => {
    e.preventDefault();

    const element = document.getElementById(secitem);
    const y = element.getBoundingClientRect().top + window.scrollY - 200;

    window.scrollTo({ behavior: 'smooth', top: y });
  };

  return (
    <div
      tw="transition-all duration-300 ease-in-out top-0 sticky w-full justify-center border-b border-t py-5 bg-white z-30"
      css={[isShow ? tw`hidden md:flex` : { transform: 'translateY(-106px)' }]}
    >
      <div tw="w-full flex justify-between px-16">
        <div tw="flex items-center mr-10">
          <StyledSwiper
            freeMode={true}
            pagination={false}
            slidesPerView="auto"
            spaceBetween={20}
          >
            {sections.map((secitem, index) => (
              <SwiperSlide key={secitem.id + '-' + index}>
                <a
                  key={secitem.id}
                  href={`#${secitem.id}`}
                  onClick={(e) => onClickSectionLink(e, secitem.id)}
                  tw="text-[14px]"
                >
                  {secitem.title}
                </a>
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </div>
        <div tw=" flex flex-row justify-end items-center gap-x-8">
          <div tw="flex justify-start">
            {currentCartItem?.imageSrc && (
              <div tw="w-16 h-16 border border-gray-200 border-solid flex-shrink-0 relative">
                <Image
                  alt="Product Image"
                  src={currentCartItem?.imageSrc}
                  layout="fill"
                  objectFit="cover"
                  blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
                    64,
                    64
                  )}`}
                  placeholder="blur"
                />
              </div>
            )}
            <div tw="flex flex-col justify-center items-start ml-5">
              <span tw="text-md font-bold text-[16px]">
                <strong>{currentCartItem?.productName}</strong>{' '}
                {currentCartItem?.scentVariant}
              </span>
              {!!currentCartItem?.sizeVariant && (
                <span tw="text-sm">{currentCartItem.sizeVariant}</span>
              )}
            </div>
          </div>
          <div css={[{ width: 230 }]}>
            <button
              css={[
                !currentCartItem?.available &&
                  tw`cursor-not-allowed bg-primary-200`,
              ]}
              disabled={!currentCartItem?.available}
              tw="outline-none font-bold text-[16px] px-5 py-3.5 w-full text-textColor-primary bg-primary-200 whitespace-nowrap"
              onClick={onAddToCart}
            >
              {currentCartItem?.available
                ? `ADD TO CART • ${cartPrice}`
                : 'Sold Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCATDesktop;

const StyledSwiper = styled(Swiper)`
  .swiper-slide {
    width: auto;
  }
`;
