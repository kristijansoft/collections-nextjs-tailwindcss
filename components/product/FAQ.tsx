import 'twin.macro';

import React, { FC } from 'react';
import { theme } from 'twin.macro';

import Accordion from '../Accordion';
import Text from '../Text';

const FAQ: FC<{ data: any }> = ({ data }) => {
  if (!data) return null;
  return (
    <section
      id={data.__typename}
      tw="mx-5 block md:(flex content-center justify-center mx-0)"
    >
      <div tw="md:(max-w-3xl)">
        <Text color={theme`colors.black`} level={2}>
          {data.sectionTitle}
        </Text>
        <div tw="flex flex-col gap-1 mt-3 md:(mt-6)">
          {data?.informationalDropdownsCollection?.items?.map((item, index) => (
            <Accordion
              key={index}
              boldHeader
              heading={item?.dropdownTitle}
              panel={item?.dropdownBody?.json?.content[0]?.content[0]?.value}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
