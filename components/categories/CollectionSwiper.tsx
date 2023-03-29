import React, { useState, useEffect } from 'react';
import tw, { theme, styled } from 'twin.macro';
import { useRouter } from 'next/router';

// ** Third Party Component
import SwiperCore, { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useWindowSize } from '@hooks/useWindowSize';

import CollectionItem from './CollectionItem';

// install Swiper modules
SwiperCore.use([FreeMode, Pagination]);

type props = {
  title: string;
  data: any;
};

const CollectionSwiper: React.FC<props> = ({ data, title }) => {
  const { width } = useWindowSize();

  const [slidesPerView, setSlidesPerView] = useState<number>(3.5);
  const { asPath, basePath } = useRouter();

  useEffect(() => {
    if (width <= 425) {
      setSlidesPerView(2.5);
    } else {
      setSlidesPerView(3.5);
    }
  }, [width]);

  if (!data) return null;

  return (
    <div tw="flex flex-col relative md:(py-4) pl-4">
      <div tw="my-3 flex justify-between">
        <span tw="text-xl font-bold leading-10 text-center md:text-4xl">
          {title}
        </span>
        <a
          css={[{ color: theme`colors.blue` }]}
          href={`${basePath}${asPath}/${data.slug}`}
          tw="text-sm flex items-end md:pr-10 pr-4"
        >
          {'See all >'}
        </a>
      </div>
      <div tw="md:mt-0 relative">
        <Swiper
          freeMode={true}
          pagination={false}
          slidesPerView={slidesPerView}
          spaceBetween={24}
        >
          {data?.orderedCollectionsCollection?.items.map((item) => (
            <SwiperSlide key={item.collectionId}>
              <CollectionItem collection={item} />
            </SwiperSlide>
          ))}
          <Pointer>
            <img src="/assets/images/arrow_circle.svg" />
          </Pointer>
        </Swiper>
      </div>
    </div>
  );
};

export default CollectionSwiper;

const Pointer = styled.button`
  ${tw`absolute right-0 z-10 hidden md:block`}
  top: 180px;
  right: 52px;
  img {
    width: 30px;
    height: 30px;
  }
`;
