import { IconButton } from '@components/buttons';
import { currencyFormatter } from '@utils/general';
import { useCart } from 'context/CartProvider';
import { useProduct } from 'context/ProductProvider';
import { ICartItem } from 'context/types';
import * as React from 'react';
import { theme } from 'twin.macro';
import Image from 'next/image';
import Dropdown from '../Dropdown';
import QuantitySelector from '../QuantitySelector';
import Text from '../Text';
import { getSkeletonImage } from '@components/Skeleton';

export type CartItemProps = ICartItem & {
  setQuantity?: (number) => void;
  setScentVariant?: (string) => void;
  setSizeVariant?: (string) => void;
};

const CartItem: React.FC<CartItemProps> = (props) => {
  const {
    productShopifyData: { scentOptions, sizeOptions },
  } = useProduct();

  const { removeCartItem } = useCart();

  return (
    <div tw="flex flex-row">
      <div tw="flex w-32 h-32 relative">
        <Image
          alt={props.productName}
          src={props.imageSrc ?? '/assets/images/skeleton.jpg'}
          layout="fill"
          objectFit="cover"
          blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
            128,
            128
          )}`}
          placeholder="blur"
        />
      </div>
      <div tw="flex flex-col w-2/3 ml-5">
        <div tw="flex justify-between">
          <div tw="flex flex-col">
            <span tw="font-bold text-sm pb-1">
              {props.scentVariant?.toUpperCase()}
            </span>
            <Text color={theme`colors.gray.600`} level={6}>
              {props.productName}
            </Text>
          </div>
          <IconButton onClick={() => removeCartItem(props)}>
            <img alt="User" src="/assets/images/close-circle.svg" />
          </IconButton>
        </div>
        <span tw="font-bold pt-1">
          {currencyFormatter(props?.price?.amount, props.price?.currencyCode)}
        </span>
        <div tw="mt-3">
          {!!scentOptions && props.scentVariant && (
            <Dropdown
              options={scentOptions}
              selectedOption={props.scentVariant}
              onChange={(value) => props.setScentVariant(`${value}`)}
            />
          )}
        </div>
        {!!sizeOptions && props.sizeVariant && (
          <div tw="mt-3">
            <Dropdown
              options={sizeOptions}
              selectedOption={props.sizeVariant}
              onChange={(value) => props.setSizeVariant(`${value}`)}
            />
          </div>
        )}
        <div tw="mt-3">
          <QuantitySelector
            quantity={props.quantity}
            onChange={(value) => props.setQuantity(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
