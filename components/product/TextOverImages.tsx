import React from 'react';
import tw, { styled } from 'twin.macro';
import Image from 'next/image';
import { getSkeletonImage } from '@components/Skeleton';

const Container = styled.div`
  ${tw`relative w-full`}
  @media screen and (min-width: 768px) {
    .product-img {
      max-height: 480px;
      min-height: 480px;
      height: auto;
      object-fit: cover;
    }
  }
`;
const OverlapWrapper = styled.div`
  ${tw`absolute flex items-center justify-center w-full h-full overflow-hidden transition duration-300 ease-in-out`}
  img {
    ${tw`opacity-0`}
  }
  &:hover {
    ${tw`bg-black bg-opacity-30`}
    img {
      ${tw`transition duration-300 ease-in-out opacity-100`}
      filter: brightness(0) invert(1);
    }
  }
`;

const TextOverImages = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <div id={data.__typename} tw="flex flex-col justify-start md:flex-row">
      {data.textOverImageSetsCollection?.items?.map((item, index) => (
        <Container key={index}>
          {/* <img alt="textOverImage" src={item?.image?.url} tw="w-full" /> */}
          {item?.image?.url && (
            <div tw="w-full h-96 cursor-pointer relative">
              <Image
                alt="Infulencer Photo"
                className="product-img"
                layout="fill"
                objectFit="cover"
                src={item?.image?.url + '?fm=webp'}
                blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
                  328,
                  328
                )}`}
                placeholder="blur"
              />
              <OverlapWrapper>
                <Image
                  alt="instagram-icon"
                  height={48}
                  src="/assets/images/footer-icons/icon-instagram.svg"
                  width={48}
                />
              </OverlapWrapper>
            </div>
          )}
          {/* <TextWrapper>
            <span tw="text-white text-4xl font-bold leading-10 uppercase md:text-center">
              {item.title}
            </span>
            <span tw="text-white text-md mt-5 md:text-center">
              {item.subtitle}
            </span>
          </TextWrapper> */}
        </Container>
      ))}
    </div>
  );
};

export default TextOverImages;
