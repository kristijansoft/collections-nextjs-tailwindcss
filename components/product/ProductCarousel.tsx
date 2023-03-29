import 'twin.macro';

import React, { FC } from 'react';
import SwiperCore, { FreeMode } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { getSkeletonImage } from '@components/Skeleton';

SwiperCore.use([FreeMode]);

const ProductCarousel: FC<{
  images: {
    src: string;
  }[];
}> = ({ images }) => {
  return (
    <Swiper
      slidesPerView={1.2}
      spaceBetween={12}
      slidesOffsetBefore={20}
      freeMode
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div
            css={[{ paddingBottom: '100%' }]}
            tw="border border-gray-200 border-solid w-full h-0"
          >
            <Image
              alt="Product"
              blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
                322,
                322
              )}`}
              layout="fill"
              placeholder="blur"
              priority={index === 0}
              objectFit="cover"
              src={image.src}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;
