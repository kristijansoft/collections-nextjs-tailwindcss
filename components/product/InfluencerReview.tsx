import 'twin.macro';

import React from 'react';
import Image from 'next/image';
import { getSkeletonImage } from '@components/Skeleton';

const InfluencerReview = ({ data }: { data: any }) => {
  if (!data) return null;
  return (
    <div id={data.__typename} tw="flex flex-col md:flex-row bg-secondary">
      {data?.influencerPhoto?.url && (
        <div css={[{ minHeight: 450 }]} tw="md:w-5/12 relative">
          <Image
            alt="Infulencer Photo"
            layout="fill"
            objectFit="cover"
            src={data?.influencerPhoto?.url}
            blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
              626,
              626
            )}`}
            placeholder="blur"
          />
        </div>
      )}

      <div tw="flex flex-col justify-center items-center md:w-7/12">
        <span tw="text-black text-xl italic leading-10 text-center px-5 pt-11 md:max-w-xl">
          {data?.reviewText?.json?.content[0]?.content[0]?.value}
        </span>
        <span tw="text-black text-lg leading-5 text-center font-bold pt-8 pb-14">
          {data?.influencerName}
        </span>
      </div>
    </div>
  );
};

export default InfluencerReview;
