import * as React from 'react';
import 'twin.macro';
import Link from 'next/link';

type props = {
  collection: any;
};

const FeaturedCollections: React.FC<props> = ({ collection }) => {
  const { name, shopifyData } = collection;

  return (
    <Link passHref href={`collections/${collection.slug}`} scroll={true}>
      <div
        key={collection.id}
        tw="flex flex-col items-center relative justify-center text-center md:mb-4 cursor-pointer w-28 h-28 md:(w-32 h-32) lg:(w-48 h-48) xl:(w-64 h-64)"
      >
        <img
          alt={name}
          src={shopifyData?.image?.src}
          tw="flex justify-center rounded-full object-cover w-full h-full"
        />
        <div tw="hover:(bg-black bg-opacity-30) rounded-full absolute w-full h-full top-0 flex justify-center items-center transition duration-300 ease-in-out">
          <span tw="lg:text-lg xl:text-xl text-md text-white w-3/4 leading-7 z-50">
            {name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCollections;
