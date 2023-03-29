import 'twin.macro';

import { FC } from 'react';

type CloseButtonProps = {
  onClick: () => void;
};

export const CloseButton: FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button tw="inline-flex justify-center items-center" onClick={onClick}>
      <img alt="Close" src="/assets/images/close.svg" />
    </button>
  );
};
