import 'twin.macro';

import { FC, useState, useEffect, useMemo } from 'react';

import { currencyFormatter } from '../utils/general';
import { RadioButton } from './buttons';
import Text from './Text';
import Dropdown from './Dropdown';
import { setCapitalForWords } from '@utils/general';
import { useCart } from 'context/CartProvider';
import Image from 'next/image';
import { getSkeletonImage } from './Skeleton';

type AddonSelectorProps = {
  shopifyData?: any;
  contentData?: any;
};

const AddonSelector: FC<AddonSelectorProps> = ({
  contentData,
  shopifyData,
}) => {
  const [selectedScent, setSelectedScent] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [variant, setVariant] = useState(null);
  const [selected, setSelected] = useState(false);
  const { addToCart, removeCartItem } = useCart();

  const scentOptions = useMemo(
    () =>
      shopifyData?.options
        ?.filter((option) => ['Color', 'Scent'].includes(option.name))[0]
        ?.values.map(({ value }) => setCapitalForWords(value)),
    [shopifyData]
  );

  const sizeOptions = useMemo(
    () =>
      shopifyData?.options
        ?.filter((option) => ['Size'].includes(option.name))[0]
        ?.values.map(({ value }) => setCapitalForWords(value)),
    [shopifyData]
  );

  useEffect(() => {
    if (scentOptions?.length) {
      setSelectedScent(scentOptions[0]);
    }
  }, [scentOptions]);

  useEffect(() => {
    if (sizeOptions?.length) {
      setSelectedSize(sizeOptions[0]);
    }
  }, [sizeOptions]);

  useEffect(() => {
    if (selectedScent && shopifyData?.variants) {
      const { variants } = shopifyData;
      let sortedVariant = variants.filter(
        (item) =>
          item.selectedOptions[
            item?.selectedOptions?.findIndex((item) =>
              ['Color', 'Scent'].includes(item.name)
            )
          ]?.value.toLowerCase() === selectedScent.toLowerCase()
      );

      if (selectedSize) {
        sortedVariant = sortedVariant.filter(
          (item) =>
            item.selectedOptions[
              item?.selectedOptions?.findIndex((item) =>
                ['Size'].includes(item.name)
              )
            ]?.value.toLowerCase() === selectedSize.toLowerCase()
        );
      }

      // if (sortedVariant?.length > 0) {
      // const { id } = sortedVariant[0];
      // const productIndex =
      //   contentData?.colorVariantsCollection?.items?.findIndex(
      //     (item) => item.shopifyVariant === id
      //   );

      // if (productIndex !== -1) {
      //   sortedVariant[0].image =
      //     contentData?.colorVariantsCollection?.items[
      //       productIndex
      //     ]?.imageCollection?.variantImagesCollection?.items[0]?.url;
      // }
      // }

      if (sortedVariant?.length) {
        setVariant({
          ...sortedVariant[0],
          description: contentData.productDescription,
          image:
            contentData?.colorVariantsCollection?.items[0]?.imageCollection
              ?.variantImagesCollection?.items[0]?.url ??
            sortedVariant[0].image,
        });
      }
    }
  }, [selectedScent, selectedSize]);

  const onChangeAddon = () => {
    if (!selected) {
      addToCart({
        imageSrc: variant.image,
        price: variant.priceV2,
        productName: shopifyData.title,
        quantity: 1,
        sku: variant.sku,
        variantId: variant.id,
      });
    } else {
      removeCartItem({
        imageSrc: variant.image,
        price: variant.priceV2,
        productName: shopifyData.title,
        quantity: 1,
        sku: variant.sku,
        variantId: variant.id,
      });
    }

    setSelected(!selected);
  };

  if (!shopifyData || !contentData || !variant) return null;

  return (
    <div tw="flex flex-col border border-solid border-black py-2.5 px-4 select-none">
      <div tw="flex gap-3 items-center justify-between ">
        <div tw="inline-flex">
          <RadioButton selected={selected} onChange={onChangeAddon} />
        </div>
        <div tw="border border-gray-300 w-16 h-16 flex-shrink-0 relative">
          <Image
            alt="Product"
            layout="fill"
            objectFit="cover"
            src={variant.image}
            blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
              64,
              64
            )}`}
            placeholder="blur"
          />
        </div>
        <div tw="mr-2">
          <Text level={6}>{variant.description}</Text>
        </div>
        <Text level={5}>{currencyFormatter(variant.price, 'USD')}</Text>
      </div>
      <div tw="flex flex-col justify-start mt-4 mb-2">
        <span tw="text-xs font-bold mb-3">Fragrance</span>
        <div tw="flex-col flex w-full md:flex-row justify-between gap-x-3">
          {selectedScent && (
            <div tw="mb-3 md:mb-0 w-full">
              <Dropdown
                options={scentOptions}
                selectedOption={selectedScent}
                onChange={(value) => setSelectedSize(`${value}`)}
              />
            </div>
          )}
          {selectedSize && (
            <div tw="w-full">
              <Dropdown
                options={sizeOptions}
                selectedOption={selectedSize}
                onChange={(value) => setSelectedSize(`${value}`)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddonSelector;
