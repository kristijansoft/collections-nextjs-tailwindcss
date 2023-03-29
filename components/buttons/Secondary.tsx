import 'twin.macro';

import { FC } from 'react';
import tw from 'twin.macro';

type SecondaryButtonProps = {
  width?: string;
  height?: string;
  padding?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export const SecondaryButton: FC<SecondaryButtonProps> = ({
  children,
  disabled,
  height,
  onClick,
  padding,
  width,
  ...props
}) => {
  return (
    <button
      css={[
        tw`px-5 py-3 font-bold text-textColor-primary transition-all duration-300 ease-in-out outline-none bg-primary-200 text-[16px] md:py-3 md:px-0 hover:(bg-primary-300 rounded-lg)`,
        {
          height,
          minWidth: 166,
          padding,
          width,
        },
      ]}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
