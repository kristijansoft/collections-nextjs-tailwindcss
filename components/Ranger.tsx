import { Range, RangeProps } from 'rc-slider';
import 'rc-slider/assets/index.css';
import tw, { styled } from 'twin.macro';
import { FC } from 'react';

const RangeSector: FC<RangeProps> = (props) => (
  <StyledRange
    railStyle={tw`h-1 bg-white border border-black border-solid`}
    trackStyle={[tw`h-1 bg-black`]}
    {...props}
  />
);

export default RangeSector;

const StyledRange = styled(Range)`
  .rc-slider-handle {
    ${tw`bg-black border-black`}
    width: 20px;
    height: 20px;
    margin-top: -8px;
  }
  .rc-slider-handle-dragging {
    ${tw`bg-black border-black!`}
    box-shadow: none !important;
  }
`;
