import 'twin.macro';

import { FC } from 'react';

type RadioButtonProps = {
  selected?: boolean;
  onChange?: () => void;
};

export const RadioButton: FC<RadioButtonProps> = ({ onChange, selected }) => {
  return (
    <div
      tw="inline-flex w-4 h-4 rounded-full border-2 border-solid border-black cursor-pointer p-0.5"
      onClick={onChange}
    >
      {selected && <div tw="flex flex-1 rounded-full bg-black" />}
    </div>
  );
};
