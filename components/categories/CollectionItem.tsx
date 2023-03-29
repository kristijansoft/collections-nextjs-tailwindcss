/* eslint-disable react-hooks/exhaustive-deps */
import { currencyFormatter } from '@utils/general';
import React, { FC, useState, useEffect, useRef } from 'react';
import { styled } from 'twin.macro';
import Link from 'next/link';

type props = {
  collection: any;
};

const CollectionItem: FC<props> = ({ collection }) => {
  const imageRef: any = useRef();
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    setDimensions({
      height: imageRef.current.offsetWidth,
      width: imageRef.current.offsetWidth,
    });
  }, [imageRef]);

  return (
    <div ref={imageRef}>
      <div tw="flex">
        <Link passHref href={`/collections/${collection.slug}`} scroll={true}>
          <Image
            alt={collection.name}
            dimensions={dimensions}
            src={collection?.shopifyData?.image?.src}
            tw="md:(w-96) w-48 object-cover cursor-pointer"
          />
        </Link>
      </div>
      <div tw="mt-3 mb-1">
        <span tw="text-gray-600 text-sm md:text-xs">Candles</span>
      </div>
      <div tw="mb-1">
        <span tw="font-bold text-lg md:text-2xl">{collection.name}</span>
      </div>
      <div>
        <span tw="font-bold pt-1 text-xs md:text-lg">
          Starting at{' '}
          {currencyFormatter(
            collection?.price?.amount,
            collection.price?.currencyCode
          )}
        </span>
      </div>
    </div>
  );
};

export default CollectionItem;

const Image = styled.img<{ dimensions: any }>`
  height: ${({ dimensions }: any) => dimensions.height + 'px !important'};
`;
