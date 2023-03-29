import * as React from 'react';
import 'twin.macro';

import CollectionGrid from './CollectionGrid';
import EmailLeadForm from '../product/EmailLeadForm';

export const CategoryLayout: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null;

  return (
    <div tw="flex flex-col relative md:px-16 py-4 mt-4">
      <div tw="px-5">
        <span tw="text-xl font-bold leading-10 md:text-5xl">
          {data.categoryTitle}
        </span>
      </div>
      <div tw="px-5">
        <CollectionGrid collectionsData={data?.orderedCollectionsCollection} />
      </div>
      <div tw="mt-12 sm:mt-0">
        <EmailLeadForm data={null} />
      </div>
    </div>
  );
};
