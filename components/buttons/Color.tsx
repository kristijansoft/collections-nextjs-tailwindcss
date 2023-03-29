import { FC } from 'react';
import tw from 'twin.macro';

type ColorButtonProps = {
  color: string;
  onClick: () => void;
  selected?: boolean;
};

export const ColorButton: FC<ColorButtonProps> = ({
  color,
  onClick,
  selected,
}) => {
  return (
    <button
      tw="inline-flex justify-center items-center relative rounded-full"
      onClick={onClick}
    >
      <span
        css={[
          tw`w-8 h-8 inline-flex border-2 border-solid border-black rounded-full overflow-hidden`,
          !selected && tw`opacity-0`,
        ]}
      />
      <span
        style={{ backgroundColor: color }}
        tw="inline-flex w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden"
      ></span>
    </button>
  );
};
