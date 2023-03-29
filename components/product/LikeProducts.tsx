import { useCart } from 'context/CartProvider';
import * as React from 'react';
import 'twin.macro';

import ProductItem from './ProductItem';

const LikeProducts: React.FC<{ data: any }> = ({ data }) => {
  const { onSetAlsoLikeProducts } = useCart();

  React.useEffect(() => {
    if (data?.recommendedProductsCollection?.items?.length) {
      onSetAlsoLikeProducts(data?.recommendedProductsCollection?.items);
    }
  }, [data]);

  return (
    <div
      id={data.__typename}
      tw="flex flex-col relative lg:(pl-0 py-8 pt-14 mx-16) md:(pl-0 py-8 mx-16) py-4 mx-8"
    >
      <span tw="text-xl font-bold leading-10 md:text-center md:text-4xl">
        {data?.sectionTitle}
      </span>
      <span tw="text-lg mt-3 md:text-center">{data?.sectionSubtitle}</span>
      <div tw="flex flex-col lg:grid lg:grid-cols-3 gap-5 md:grid-cols-1 sm:grid-cols-1 py-10">
        {data?.recommendedProductsCollection?.items?.map((product, index) => (
          <div key={index}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikeProducts;
