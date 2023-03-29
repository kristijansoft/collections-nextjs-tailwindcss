import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
import tw from 'twin.macro';
import RangeSector from '../Ranger';
import { Checkbox } from '@components/Checkbox';

const Filter = ({
  isShow,
  max,
  min,
  range,
  selectType,
  setPrice,
  types,
}: {
  max: number;
  min: number;
  range: number[];
  setPrice: (range: number[]) => void;
  types: string[];
  isShow: boolean;
  selectType: (type: string, selected: boolean) => void;
}) => {
  const [collapsePrice, setCollapsePrice] = useState(false);
  const [collapseType, setCollaseType] = useState(false);

  return (
    <div
      css={[
        isShow ? tw`w-full px-4 py-6 md:w-96` : tw`w-0 p-0 overflow-hidden`,
      ]}
      tw="absolute md:relative z-50 bg-white flex-shrink-0 transition-all duration-300 ease-in-out"
    >
      <div tw="flex justify-between items-center mb-6">
        <span css={[{ fontSize: 13 }]} tw="font-bold">
          Price
        </span>
        <div
          css={[collapsePrice ? tw`rotate-180` : tw`rotate-0`]}
          tw="cursor-pointer transition-all duration-300 ease-in-out"
          onClick={() => setCollapsePrice(!collapsePrice)}
        >
          <img alt="Expand" src="/assets/images/up-arrow.svg" />
        </div>
      </div>
      <div
        css={[collapsePrice && tw`hidden`]}
        tw="flex flex-col transition-all duration-300 ease-in-out"
      >
        <div tw="w-full px-2">
          <RangeSector
            max={max}
            min={min}
            value={range}
            onChange={(value) => setPrice(value)}
          />
        </div>
        <div tw="flex justify-between items-center pt-2">
          <PriceInput
            value={range[0]}
            onChange={(value) => setPrice([value, range[1]])}
          />
          <span tw="px-11">-</span>
          <PriceInput
            value={range[1]}
            onChange={(value) => setPrice([range[0], value])}
          />
        </div>
      </div>
      <div tw="flex justify-between items-center mt-6">
        <span css={[{ fontSize: 13 }]} tw="font-bold">
          Product Type
        </span>
        <div tw="cursor-pointer">
          <img
            alt="Expand"
            css={[collapseType ? tw`rotate-180` : tw`rotate-0`]}
            src="/assets/images/up-arrow.svg"
            tw="cursor-pointer transition-all duration-300 ease-in-out"
            onClick={() => setCollaseType(!collapseType)}
          />
        </div>
      </div>
      <div css={[collapseType && tw`hidden`]} tw="mt-4">
        {types.map((type, index) => (
          <Checkbox key={index} label={type} onSelectType={selectType} />
        ))}
      </div>
    </div>
  );
};

export default Filter;

const PriceInput = ({
  onChange,
  value,
}: {
  value: number;
  onChange: (value) => void;
}) => {
  return (
    <div tw="border border-solid border-black flex py-2.5 px-4 text-xs pr-2">
      <span>$</span>
      <input
        tw="outline-none text-right w-full"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
