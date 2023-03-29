import { useClickOutside } from '@hooks/useClickOutside';
import React, { useState, useRef } from 'react';
import tw from 'twin.macro';

export const sortOptions = [
  { label: 'Alphabetical A-Z', value: 'alAZ' },
  { label: 'Alphabetical Z-A', value: 'alZA' },
  { label: 'Price low to high', value: 'pLH' },
  { label: 'Price high to low', value: 'pHL' },
];

const SortDropdown = ({ onFilter }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [label, setLabel] = useState('Sort by');
  const sortRef = useRef();

  useClickOutside(sortRef, () => openMenu && setOpenMenu(false));
  const onClickFilterItem = (item) => {
    setLabel(item.label);
    onFilter(item.value);
    setOpenMenu(false);
  };

  return (
    <div tw="flex cursor-pointer relative items-center" ref={sortRef}>
      <div
        tw="mr-1 text-xs whitespace-nowrap"
        onClick={() => setOpenMenu(!openMenu)}
      >
        {label}
      </div>
      <img
        alt="Expand"
        css={[openMenu ? tw`rotate-180` : tw`rotate-0`]}
        src="/assets/images/down_arrow.svg"
        tw="transition-all duration-300 ease-in-out"
      />
      <div
        css={[openMenu ? tw`visible` : tw`invisible`]}
        tw="p-2 absolute flex-col top-11 w-36 bg-white -right-1 z-20"
      >
        {sortOptions.map((item, index) => (
          <div
            key={index}
            tw="text-sm py-2 hover:font-bold"
            onClick={() => onClickFilterItem(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortDropdown;
