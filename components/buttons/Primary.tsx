import { FC } from 'react';
import tw from 'twin.macro';

export const PrimaryButton: FC<{ onClick?: () => void; disabled?: boolean }> =
  ({ children, disabled, onClick }) => {
    return (
      <button
        css={[disabled && tw`cursor-not-allowed `]}
        disabled={disabled}
        tw="transition-all duration-300 ease-in-out border border-solid border-black py-3 text-black outline-none text-xs font-bold w-full md:text-sm hover:rounded-lg"
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
