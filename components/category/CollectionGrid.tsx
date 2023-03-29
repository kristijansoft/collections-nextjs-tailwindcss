import React, { FC, useState } from 'react';
import Link from 'next/link';
import 'twin.macro';

// ** Custom Components
import Dropdown from '../Dropdown';
import CollectionItem from '@components/categories/CollectionItem';

export const sortOptions = [
  { label: 'Alphabetical A-Z', value: 'alAZ' },
  { label: 'Alphabetical Z-A', value: 'alZA' },
  { label: 'Price low to high', value: 'pLH' },
  { label: 'Price high to low', value: 'pHL' },
];

const CollectionGrid: FC<{ collectionsData: any }> = ({ collectionsData }) => {
  const [collections, setCollections] = useState<any[]>(collectionsData?.items);
  const onChangeSort = (value) => {
    switch (value) {
      case 'alAZ': {
        const sortedCollections = [...collections];

        sortedCollections?.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setCollections(() => sortedCollections);
        break;
      }
      case 'alZA': {
        const sortedCollections = [...collections];
        sortedCollections?.sort((a, b) => {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });
        setCollections(() => sortedCollections);
        break;
      }
      case 'pLH': {
        const sortedCollections = [...collections];
        sortedCollections?.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        });
        setCollections(() => sortedCollections);
        break;
      }
      case 'pHL': {
        const sortedCollections = [...collections];
        sortedCollections?.sort((a, b) => {
          if (a.price < b.price) {
            return 1;
          }
          if (a.price > b.price) {
            return -1;
          }
          return 0;
        });
        setCollections(() => sortedCollections);
        break;
      }
      default:
        break;
    }
  };

  if (!collectionsData?.items?.length) return null;

  return (
    <div>
      <div tw="flex flex-col pt-2 md:flex-row justify-between content-end">
        <span tw="text-lg leading-10 max-w-3xl">
          Collections ({collections?.length || 0})
        </span>
        <div tw="md:w-1/4 sm:w-full">
          <Dropdown
            options={sortOptions}
            placeHolder={'Sort by'}
            onChange={onChangeSort}
          />
        </div>
      </div>
      <div tw="grid lg:grid lg:grid-cols-4 gap-5 md:grid-cols-2 grid-cols-2 py-10">
        {collections?.map((collection, index) => (
          <Link
            key={`${collection.name}-${index}`}
            passHref
            href={`/collections/${collection.slug}`}
          >
            <div tw="mb-8">
              <CollectionItem collection={collection} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionGrid;
