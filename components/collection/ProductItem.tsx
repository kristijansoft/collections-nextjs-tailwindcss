/* eslint-disable react-hooks/exhaustive-deps */
import { PrimaryButton } from '@components/buttons';
import Dropdown from '@components/Dropdown';
import { setCapitalForWords } from '@utils/general';
import React, { FC, useState, useEffect, useRef, useMemo } from 'react';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import { useCart } from 'context/CartProvider';
import { ICartItem } from 'context/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSkeletonImage } from '@components/Skeleton';

type props = {
  productData: any;
  collectionName?: string;
};

const ProductItem: FC<props> = ({ collectionName, productData }) => {
  const imageRef: any = useRef();
  const [selectedScent, setSelectedScent] = useState(null);
  const [currentCartItem, setCurrentCartItem] = useState<ICartItem>(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart, openCartSidebar } = useCart();

  const { query } = useRouter();

  useEffect(() => {
    if (!productData) return;
    const { variants } = productData;
    let sortedVariant = variants.filter(
      (item) =>
        item.selectedOptions[
          item?.selectedOptions?.findIndex((item) =>
            ['Color', 'Scent'].includes(item.name)
          )
        ]?.value === selectedScent
    );

    if (selectedSize) {
      if (sortedVariant?.length) {
        sortedVariant = sortedVariant.filter(
          (item) =>
            item.selectedOptions[
              item?.selectedOptions?.findIndex((item) => item.name === 'Size')
            ]?.value === selectedSize.toLowerCase()
        );
      } else {
        sortedVariant = variants.filter(
          (item) =>
            item.selectedOptions[
              item?.selectedOptions?.findIndex((item) => item.name === 'Size')
            ]?.value === selectedSize.toLowerCase()
        );
      }
    }

    if (sortedVariant?.length > 0 || variants.length) {
      const { available, id, priceV2, sku } = sortedVariant[0] ?? variants[0];
      const productIndex =
        productData?.contentData?.colorVariantsCollection?.items?.findIndex(
          (item) => item.shopifyVariantId === sku
        );

      let image = null;
      if (productIndex !== -1) {
        const productSelected =
          productData?.contentData?.colorVariantsCollection?.items[
            productIndex
          ];
        image = productSelected?.imageCollection['image1']?.src;
      }
      if (!image) image = productData?.images[0]?.src;
      setCurrentCartItem({
        available,
        imageSrc: image,
        price: priceV2,
        productName: productData.title,
        quantity: 1,
        scentVariant: selectedScent,
        sku,
        variantId: id,
      });
    }
  }, [selectedScent, selectedSize]);

  const scentOptions = useMemo(
    () =>
      productData?.options
        ?.filter((option) => ['Color', 'Scent'].includes(option.name))[0]
        ?.values.map(({ value }) => setCapitalForWords(value)),
    [productData]
  );

  const sizeOptions = useMemo(
    () =>
      productData?.options
        ?.filter((option) => option.name === 'Size')[0]
        ?.values.map(({ value }) => setCapitalForWords(value)),
    [productData]
  );

  useEffect(() => {
    if (scentOptions?.length) {
      setSelectedScent(scentOptions[0]);
    }

    if (sizeOptions?.length) {
      setSelectedSize(sizeOptions[0]);
    }
  }, [scentOptions, sizeOptions]);

  const onAddToCart = () => {
    addToCart(currentCartItem);
    openCartSidebar(true);
  };

  return (
    <div ref={imageRef} css={[!currentCartItem && tw`hidden`]} tw="mb-8">
      <div tw="flex flex-col justify-between">
        <Link
          key={productData.id}
          passHref
          href={`/${query.brand}/product/${
            productData.urlSlug ?? productData.handle
          }`}
          scroll={true}
        >
          <ImageWrapper>
            <Image
              alt={productData.name}
              css={[{ maxHeight: 300, minHeight: 300 }]}
              layout="fill"
              objectFit="cover"
              blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
                406,
                406
              )}`}
              placeholder="blur"
              src={currentCartItem?.imageSrc ?? '/assets/images/skeleton.jpg'}
            />
          </ImageWrapper>
        </Link>
      </div>
      <div tw="mt-3">
        <span tw="text-gray-600 text-xxs md:text-xs">{collectionName}</span>
      </div>
      <div tw="mt-1 mb-1">
        <span tw="text-black font-bold text-md md:(text-2xl leading-7)">
          {currentCartItem?.productName}
        </span>
      </div>
      {scentOptions && selectedScent && (
        <div tw="mt-3 mb-1 md:mt-4">
          <Dropdown
            options={scentOptions}
            selectedOption={selectedScent}
            onChange={(value) => setSelectedScent(`${value}`)}
          />
        </div>
      )}
      {sizeOptions && selectedSize && (
        <div tw="mt-3 mb-1 md:mt-5">
          <Dropdown
            options={sizeOptions}
            selectedOption={selectedSize}
            onChange={(value) => setSelectedSize(`${value}`)}
          />
        </div>
      )}
      <div tw="mt-3 md:mt-5">
        <PrimaryButton onClick={onAddToCart}>
          ADD TO CART • ${currentCartItem?.price?.amount}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ProductItem;

const ImageWrapper = styled.div`
  ${tw`relative border border-gray-200 border-solid cursor-pointer`}
  width: 100%;
  height: 0;
  padding-bottom: 100%;
`;
