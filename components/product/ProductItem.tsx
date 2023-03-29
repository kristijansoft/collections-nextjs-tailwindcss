import React, { useState, useEffect, useMemo } from 'react';
import tw, { theme } from 'twin.macro';
import Image from 'next/image';

import { useCart } from 'context/CartProvider';
import { currencyFormatter, setCapitalForWords } from '@utils/general';
import Ratings from '../Ratings';
import Text from '../Text';
import { PrimaryButton } from '../buttons';
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
    if ((selectedScent || selectedSize) && shopifyData?.variants) {
      const { variants } = shopifyData;
      let sortedVariant = variants.filter(
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

      setVariant(sortedVariant && sortedVariant[0]);
    }
  }, [selectedScent, selectedSize]);

  if (!product || !shopifyData) return null;
  return (
    <div>
      {variant?.image && (
        <div tw="flex border-gray-300 relative h-80 cursor-pointer">
          <Image
            alt={product.productName}
            layout="fill"
            loader={() => `${variant?.image}`}
            objectFit="cover"
            src={variant?.image}
            blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
              328,
              328
            )}`}
            placeholder="blur"
          />
        </div>
      )}

      <div tw="mt-3 mb-1">
        <Text color={theme`colors.gray.600`} level={9}>
          {shopifyData?.title}
        </Text>
      </div>
      <div tw="mb-1">
        <span tw="font-bold text-2xl">{product.productName}</span>
      </div>
      <div tw="flex items-center">
        <Ratings size={16} spacing={5} value={5} />
        <div tw="ml-2.5">
          <Text color={theme`colors.black`} level={5}>
            36 Reviews
          </Text>
        </div>
      </div>
      <div tw="flex flex-row justify-between mt-6">
        {!!scentOptions && (
          <div css={[sizeOptions ? tw`w-1/2` : tw`w-full`]} tw="mr-3">
            <Dropdown
              options={scentOptions}
              selectedOption={selectedScent}
              onChange={(value) => setSelectedScent(`${value}`)}
            />
          </div>
        )}
        {!!sizeOptions && (
          <div tw="w-1/2">
            <Dropdown
              options={sizeOptions}
              selectedOption={selectedSize}
              onChange={(value) => setSelectedSize(`${value}`)}
            />
          </div>
        )}
      </div>
      <div tw="mt-8">
        <PrimaryButton onClick={onAddToCart}>
          <span tw="text-lg">
            Add To Cart • {currencyFormatter(variant?.price, 'USD')}
          </span>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ProductItem;
