import { setCapitalForWords } from '@utils/general';
import { createContext, useContext, useState } from 'react';

import { IProduct } from './types';

const initialProduct: IProduct = {
  productContentData: null,
  productShopifyData: { options: [], title: '', variants: [] },
  upsellShopifyData: null,
};

const ProductContext = createContext<IProduct>({
  ...initialProduct,
});

export function ProductProvider({ children }) {
  const [product, setProduct] = useState<IProduct>(initialProduct);

  const setProductData = (product: IProduct) => {
    const { productShopifyData } = product;
    const sizeOptions = productShopifyData?.options
      ?.filter((option) => option.name === 'Size')[0]
      ?.values.map(({ value }) => setCapitalForWords(value));

    const scentOptions = productShopifyData?.options
      ?.filter((option) => ['Color', 'Scent'].includes(option.name))[0]
      ?.values.map(({ value }) => setCapitalForWords(value));

    setProduct({
      ...product,
      productShopifyData: { ...productShopifyData, scentOptions, sizeOptions },
    });
  };

  return (
    <ProductContext.Provider
      value={{
        ...product,
        setProductData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);

  if (!context)
    throw new Error('useProduct must be used inside a `ProductProvider`');

  return context;
}
