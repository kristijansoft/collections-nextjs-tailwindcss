import * as React from 'react';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import tw, { styled } from 'twin.macro';
import Image from 'next/image';
import { getSkeletonImage } from '@components/Skeleton';

SwiperCore.use([Pagination]);

const SwiperContainer = styled.div`
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background-color: #2353a7;
  }
`;

const ReasonToLove = ({ data }: { data: any }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  if (!data) return null;
  return (
    <div id={data.__typename} tw="flex flex-col pb-12 mx-5 md:mx-0">
      <span tw="text-3xl leading-9 font-bold md:text-center">
        {data?.sectionTitle}
      </span>
      <span tw="text-lg mt-3 md:text-center">{data?.sectionSubtitle}</span>
      <SwiperContainer tw="block md:hidden">
        <Swiper pagination={true}>
          {data?.textAndImageSetsCollection?.items.map((item, index) => (
            <SwiperSlide key={index}>
              <div tw="flex flex-col pb-12">
                <div
                  css={[{ paddingBottom: '100%' }]}
                  tw="w-full relative h-0 mt-6"
                >
                  <Image
                    alt="Reason Image"
                    layout="fill"
                    src={item.image.url + '?fm=webp'}
                    blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
                      518,
                      518
                    )}`}
                    placeholder="blur"
                  />
                </div>
                <span tw="text-2xl font-bold leading-7 text-center mt-7">
                  {item.title}
                </span>
                <span tw="text-center text-lg mt-4">{item.subtitle}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
      <div tw="hidden md:(flex items-center justify-center mx-40)">
        <div tw="md:(flex flex-row gap-x-24 mt-12)">
          {data?.textAndImageSetsCollection?.items[selectedIndex].image.url && (
            <div tw="w-1/2 relative flex justify-start align-top">
              <Image
                alt="Infulencer Photo"
                layout="fill"
                objectFit="cover"
                src={
                  data?.textAndImageSetsCollection?.items[selectedIndex].image
                    .url + '?fm=webp'
                }
              />
            </div>
          )}
          <div tw="flex flex-col gap-y-10 w-1/2">
            {data?.textAndImageSetsCollection?.items.map((item, index) => (
              <div
                key={index}
                tw="flex flex-col gap-y-3 relative cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              >
                <span
                  css={[selectedIndex !== index && tw`opacity-50`]}
                  tw="text-3xl font-bold leading-9"
                >
                  {item.title}
                </span>
                <span
                  css={[
                    selectedIndex !== index && tw`opacity-50`,
                    { fontSize: 16, lineHeight: '21px' },
                  ]}
                >
                  {item.subtitle}
                </span>
                {selectedIndex === index && (
                  <div tw="absolute top-1 -left-11">
                    <Image
                      alt="Pointer"
                      height={32}
                      src="/assets/images/pointer.svg"
                      width={32}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonToLove;
