import { FC, ReactElement, useState } from 'react';
import tw, { styled } from 'twin.macro';

import Text from './Text';

const StyledPanel = styled.div<{ isCollapsed: boolean }>`
  ${tw`w-full overflow-hidden transition-all`}

  ${({ isCollapsed }) => isCollapsed && tw`h-0 opacity-0`}
`;

const StyledTitle = styled.span<{ boldHeader: boolean }>`
  ${({ boldHeader }) => boldHeader && tw`font-bold`}
  margin-right: 20px;
`;

type AccordionProps = {
  expanded?: boolean;
  heading: string;
  panel: ReactElement | string;
  boldHeader?: boolean;
};

const Accordion: FC<AccordionProps> = ({
  boldHeader,
  expanded,
  heading,
  panel,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(!expanded);
  return (
    <div>
      <div
        tw="flex items-center justify-between w-full cursor-pointer border-b border-solid border-black py-2.5"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <StyledTitle boldHeader={boldHeader}>{heading}</StyledTitle>
        {isCollapsed ? (
          <img alt="Expand" src="/assets/images/plus.svg" />
        ) : (
          <img alt="Collapse" src="/assets/images/minus.svg" />
        )}
      </div>

      <StyledPanel isCollapsed={isCollapsed}>
        <div tw="py-4">
          <Text level={6}>{panel}</Text>
        </div>
      </StyledPanel>
    </div>
  );
};

export default Accordion;
