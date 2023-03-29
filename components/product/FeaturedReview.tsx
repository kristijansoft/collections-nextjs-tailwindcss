import React from 'react';
import tw, { styled } from 'twin.macro';
import Image from 'next/image';

import Ratings from '../Ratings';
import { getSkeletonImage } from '@components/Skeleton';

const Container = styled.div`
  ${tw`flex flex-col md:flex-row gap-x-8`}
  @media screen and (min-width: 768px) {
    margin-left: 11%;
    margin-right: 11%;
  }
`;

const FeaturedReview = ({ data }: { data: any }) => {
  if (!data) return null;
  return (
    <div id={data.__typename} tw="flex flex-col bg-tan md:(pt-14 pb-24) px-5">
      <span tw="text-3xl font-bold leading-9 md:text-center">
        What People Are Saying
      </span>
      <span tw="text-lg mt-3 md:text-center">
        Real Reviews From Real Customers
      </span>
      <Container>
        <div tw="flex flex-col mt-9 w-full md:w-1/2">
          {data?.featuredReviewsCollection?.items?.map((item, index) => (
            <div
              key={index}
              tw="flex flex-col border border-black px-5 py-4.5 mb-5"
            >
              <div tw="flex flex-row justify-between mb-3.5 font-bold">
                <span>{item.reviewerName}</span>
                <Ratings size={16} spacing={5} value={item.reviewStars} />
              </div>
              <span>{item.reviewText.json.content[0].content[0].value}</span>
            </div>
          ))}
          {/* <div tw="md:(w-1/2 m-auto)">
            <PrimaryButton>See More Reviews</PrimaryButton>
          </div> */}
        </div>
        <div tw="hidden justify-center items-center w-1/2 relative md:flex bg-tan">
          {data?.reviewImage?.url && (
            <Image
              alt="Infulencer Photo"
              layout="fill"
              objectFit="contain"
              src={data?.reviewImage?.url + '?fm=webp'}
              blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
                626,
                626
              )}`}
              placeholder="blur"
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default FeaturedReview;
