import 'twin.macro';

import { FC } from 'react';

import Text from './Text';

type QuantitySelectorProps = {
  quantity?: number;
  onChange?: (quantity: number) => void;
};

const QuantitySelector: FC<QuantitySelectorProps> = ({
  onChange,
  quantity,
}) => {
  return (
    <div tw="border border-solid border-black min-h-11 px-4 flex items-center justify-between select-none">
      <span tw="text-sm">Quantity</span>
      <div tw="flex items-center gap-5">
        <button
          tw="p-1"
          onClick={() => onChange(Math.max((quantity || 1) - 1, 1))}
        >
          <img alt="Minus" src="/assets/images/minus.svg" tw="w-2 h-2" />
        </button>
        <Text level={5} weight={600}>
          {quantity || 1}
        </Text>
        <button tw="p-1" onClick={() => onChange((quantity || 1) + 1)}>
          <img alt="Minus" src="/assets/images/plus.svg" tw="w-2 h-2" />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
