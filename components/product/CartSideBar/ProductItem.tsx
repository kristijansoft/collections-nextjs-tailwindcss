import React, { useState, useEffect, useMemo } from 'react';
import tw, { theme } from 'twin.macro';
import Image from 'next/image';

import { useCart } from 'context/CartProvider';
import { currencyFormatter, setCapitalForWords } from '@utils/general';
import { PrimaryButton } from '../../buttons';
import Dropdown from '@components/Dropdown';
import { getSkeletonImage } from '@components/Skeleton';

const ProductItem: React.FC<{ product: any }> = ({ product }) => {
  const [selectedScent, setSelectedScent] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [variant, setVariant] = useState(null);

  const shopifyData = product?.shopifyData;

  const { addToCart, openCartSidebar } = useCart();

  const onAddToCart = () => {
    if (!product || !shopifyData) return;
    addToCart({
      imageSrc: variant?.image,
      price: variant?.priceV2,
      productName: shopifyData?.title,
      quantity: 1,
      scentVariant: selectedScent,
      sku: variant?.sku,
      variantId: variant?.id,
    });
    openCartSidebar(true);
  };

  const sizeOptions = useMemo(() => {
    if (shopifyData && shopifyData?.options?.length)
      return shopifyData?.options
        ?.filter((option) => option.name === 'Size')[0]
        ?.values?.map(({ value }) => setCapitalForWords(value));
    return null;
  }, [shopifyData]);

  const scentOptions = useMemo(() => {
    if (shopifyData && shopifyData?.options?.length)
      return shopifyData?.options
        ?.filter((option) => ['Color', 'Scent'].includes(option.name))[0]
        ?.values?.map(({ value }) => setCapitalForWords(value));
    return null;
  }, [shopifyData]);

  useEffect(() => {
    if (scentOptions || sizeOptions) {
      setSelectedScent(scentOptions && scentOptions[0]);
      setSelectedSize(sizeOptions && sizeOptions[0]);
    }
  }, [scentOptions, sizeOptions]);

  useEffect(() => {
    let sortedVariant = shopifyData.variants[0];
    if ((selectedScent || selectedSize) && shopifyData?.variants) {
      const { variants } = shopifyData;
      sortedVariant = variants.filter(
        (item) =>
          item.selectedOptions[
            item?.selectedOptions?.findIndex(
              (item) => item.name === 'Color' || item.name === 'Scent'
            )
          ]?.value === selectedScent
      );

      if (sizeOptions) {
        sortedVariant = sortedVariant.filter(
          (item) =>
            item.selectedOptions[
              item?.selectedOptions?.findIndex((item) => item.name === 'Size')
            ]?.value === selectedSize.toLowerCase()
        );
      }

      if (sortedVariant?.length > 0) {
        const { id } = sortedVariant[0];
        const productIndex = product?.colorVariantsCollection?.items?.findIndex(
          (item) => item.shopifyVariant === id
        );

        if (productIndex !== -1) {
          sortedVariant[0].image =
            product?.colorVariantsCollection?.items[
              productIndex
            ]?.imageCollection?.image1?.src;
        }
      }

      if (!sortedVariant[0].image && shopifyData?.images?.length) {
        sortedVariant[0].image = shopifyData.images[0].src;
      }

      if (!sortedVariant[0].image) {
        sortedVariant[0].image = '/assets/images/skeleton.jpg';
      }
    }
    if (!sortedVariant.image?.src) {
      sortedVariant.image = { src: shopifyData.images[0]?.src };
    }
    setVariant(sortedVariant);
  }, [selectedScent, selectedSize]);

  if (!product || !shopifyData) return null;
  return (
    <div tw="min-w-[192px] cursor-pointer">
      <Image
        alt={product.productName}
        blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(328, 328)}`}
        height={192}
        objectFit="cover"
        placeholder="blur"
        src={variant?.image?.src ?? '/assets/images/skeleton.jpg'}
        width={192}
      />
      <div tw="mt-3 mb-1">
        <span tw="text-gray-600 text-[11px]">{shopifyData?.title}</span>
      </div>
      <div tw="mb-1">
        <span tw="font-bold text-[16px]">{product.productName}</span>
      </div>
      <div tw="flex flex-col justify-between mt-3.5">
        {!!scentOptions && (
          <div tw="mb-3 w-full">
            <Dropdown
              options={scentOptions}
              selectedOption={selectedScent}
              onChange={(value) => setSelectedScent(`${value}`)}
            />
          </div>
        )}
        {!!sizeOptions && (
          <div tw="w-full mb-3">
            <Dropdown
              options={sizeOptions}
              selectedOption={selectedSize}
              onChange={(value) => setSelectedSize(`${value}`)}
            />
          </div>
        )}
      </div>
      <div>
        <PrimaryButton onClick={onAddToCart}>
          <span tw="text-xs">
            Add To Cart • {currencyFormatter(variant?.price, 'USD')}
          </span>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ProductItem;
