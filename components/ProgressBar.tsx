import { FC } from 'react';
import tw, { styled } from 'twin.macro';

type ProgressBarProps = {
  progress: number;
};

const Indicator = styled.div<{ progress: number }>`
  ${tw`flex flex-col justify-center text-center text-white bg-white shadow-none whitespace-nowrap`}
  width: ${({ progress }) => progress}%;
`;

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div tw="relative pt-1">
      <div tw="flex h-4 overflow-hidden text-xs bg-white bg-opacity-40 rounded-lg">
        <Indicator progress={progress} />
      </div>
    </div>
  );
};

export default ProgressBar;
