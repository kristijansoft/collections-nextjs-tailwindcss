import * as React from 'react';
import 'twin.macro';
import SwiperCore, { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import FeaturedCollectionItem from './FeaturedCollectionItem';
import { useWindowSize } from '@hooks/useWindowSize';

SwiperCore.use([FreeMode, Pagination]);

interface IFeaturedCollection {
  data: any;
}

const FeaturedCollections: React.FC<IFeaturedCollection> = ({ data }) => {
  const [slidesToShow, setSlidesToShow] = React.useState(3.2);
  const { width } = useWindowSize();

  React.useEffect(() => {
    if (width > 1024) {
      setSlidesToShow(4);
    } else {
      setSlidesToShow(3.2);
    }
  }, [width]);
  if (!data) return null;
  const {
    orderedCollectionsCollection: { items },
  } = data;

  return (
    <div tw="flex flex-col relative bg-tan md:(py-16 px-16) py-8">
      <span tw="text-xl font-bold leading-10 text-center md:text-5xl mb-6">
        Featured Collections
      </span>
      <div tw="px-2 2xl:px-36">
        <Swiper
          freeMode={true}
          pagination={false}
          slidesPerView={slidesToShow}
          spaceBetween={10}
        >
          {items.map((collection) => (
            <SwiperSlide key={collection.id}>
              <FeaturedCollectionItem
                key={collection.id}
                collection={collection}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedCollections;
