import { FC, MouseEventHandler } from 'react';
import 'twin.macro';

type IconButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const IconButton: FC<IconButtonProps> = ({ children, onClick }) => {
  return (
    <button
      tw="inline-flex items-center justify-center cursor-pointer w-6 h-6 relative transition duration-200 ease-in-out hover:scale-110"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
