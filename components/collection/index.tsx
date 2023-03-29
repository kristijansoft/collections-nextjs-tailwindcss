import * as React from 'react';
import tw from 'twin.macro';
import EmailLeadForm from '../product/EmailLeadForm';
import ProductItem from './ProductItem';
import Filter from './Filter';
import { useRouter } from 'next/router';
import { setCapitalForWords } from '@utils/general';
import SortDropdown from './SortDropdown';
import Pagination from '@components/pagination';
interface ICollectionLayout {
  collectionData: {
    collectionContentful: any;
    collectionShopify: any;
    ctaContentful: any;
  };
}

export const CollectionLayout: React.FC<ICollectionLayout> = ({
  collectionData: { collectionContentful, collectionShopify, ctaContentful },
}) => {
  const [collapseFilter, setCollapseFilter] = React.useState(true);
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 0]);
  const [products, setProducts] = React.useState(collectionShopify?.products);
  const [typesSelected, setTypesSelected] = React.useState<any[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const productTypes = React.useMemo(() => {
    return collectionShopify?.products
      ?.map((item) => item.productType)
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item !== '';
      });
  }, []);

  const currentProductData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 12;
    const lastPageIndex = firstPageIndex + 12;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

  const minPrice = React.useMemo(() => {
    if (!collectionShopify?.products?.length) return 0;
    return collectionShopify?.products?.reduce(function (prev, curr) {
      return parseInt(prev.variants[0].price) < parseInt(curr.variants[0].price)
        ? prev
        : curr;
    })?.variants[0].price;
  }, [collectionShopify?.products]);

  const maxPrice = React.useMemo(() => {
    if (!collectionShopify?.products?.length) return 0;
    return collectionShopify?.products?.reduce(function (prev, curr) {
      return parseInt(prev.variants[0].price) > parseInt(curr.variants[0].price)
        ? prev
        : curr;
    })?.variants[0].price;
  }, [collectionShopify?.products]);

  const router = useRouter();

  React.useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  React.useEffect(() => {
    if (!collectionShopify?.products?.length) return;
    const newProducts: any[] = [...collectionShopify?.products];
    let filtered = newProducts.filter(
      (item) =>
        priceRange[0] <= parseInt(item.variants[0].price) &&
        parseInt(item.variants[0].price) <= priceRange[1]
    );

    if (typesSelected.length) {
      filtered = filtered.filter((item) =>
        typesSelected.includes(item.productType)
      );
    }

    setProducts(filtered);
  }, [priceRange, typesSelected.length]);

  if (!collectionShopify) return null;

  const onChangeSort = (value) => {
    switch (value) {
      case 'alAZ': {
        const sortedCollections = [...products];

        sortedCollections?.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        setProducts(() => sortedCollections);
        break;
      }
      case 'alZA': {
        const sortedCollections = [...products];
        sortedCollections?.sort((a, b) => {
          if (a.title < b.title) {
            return 1;
          }
          if (a.title > b.title) {
            return -1;
          }
          return 0;
        });
        setProducts(() => sortedCollections);
        break;
      }
      case 'pLH': {
        const sortedCollections = [...products];
        sortedCollections?.sort((a, b) => {
          if (parseInt(a.variants[0].price) < parseInt(b.variants[0].price)) {
            return -1;
          }
          if (parseInt(a.variants[0].price) > parseInt(b.variants[0].price)) {
            return 1;
          }
          return 0;
        });
        setProducts(() => sortedCollections);
        break;
      }
      case 'pHL': {
        const sortedCollections = [...products];
        sortedCollections?.sort((a, b) => {
          if (parseInt(a.variants[0].price) < parseInt(b.variants[0].price)) {
            return 1;
          }
          if (parseInt(a.variants[0].price) > parseInt(b.variants[0].price)) {
            return -1;
          }
          return 0;
        });
        setProducts(() => sortedCollections);
        break;
      }
      default:
        break;
    }
  };

  const onChangeSelectedTypes = (type, selected) => {
    const typeIndex = typesSelected.indexOf(type);
    if (selected) {
      if (typeIndex >= 0) return;
      setTypesSelected([...typesSelected, type]);
    } else if (typeIndex >= 0) {
      const newTypes = [...typesSelected];
      newTypes.splice(typeIndex, 1);
      setTypesSelected([...newTypes]);
    }
  };

  return (
    <div tw="flex flex-col">
      {collectionContentful && (
        <>
          <div tw="w-full relative">
            <img
              alt="Product Hero Image"
              css={[{ maxHeight: 421 }]}
              src={collectionContentful?.coverImageHero?.url}
              tw="h-56 w-full md:h-auto object-cover"
            />
            <div tw="absolute flex flex-col top-0 left-0 w-full h-full justify-center items-center">
              <h2 tw="text-3xl text-center md:text-5xl text-white font-bold">
                {collectionContentful?.name}
              </h2>
              <span tw="text-lg text-white mt-4 text-center">
                Products ({collectionShopify?.products?.length})
              </span>
              <span
                css={[{ maxWidth: 844 }]}
                tw="hidden md:block text-white mt-10 text-center"
              >
                {collectionContentful?.description}
              </span>
            </div>
          </div>
          {collectionContentful?.description && (
            <span tw="block md:hidden text-black my-5 px-5">
              {collectionContentful?.description}
            </span>
          )}
        </>
      )}

      {!collectionContentful && (
        <h2 tw="text-3xl text-center md:text-4xl text-black font-bold pl-5 md:pl-16 pb-8">
          {setCapitalForWords(`${router.query.collectionId}`.replace('-', ' '))}
        </h2>
      )}

      <div tw="bg-primary-100 w-full p-5 flex justify-between">
        <div
          tw="flex cursor-pointer"
          onClick={() => setCollapseFilter(!collapseFilter)}
        >
          <span tw="mr-1">Filter</span>
          <img
            alt="Expand"
            css={[collapseFilter ? tw`rotate-180` : tw`rotate-0`]}
            src="/assets/images/filter.svg"
            tw="transition-all duration-300 ease-in-out"
          />
        </div>
        <SortDropdown onFilter={onChangeSort} />
      </div>
      <div tw="flex w-full relative">
        <Filter
          max={parseInt(maxPrice)}
          min={parseInt(minPrice)}
          range={priceRange}
          setPrice={(value) => setPriceRange(value)}
          types={productTypes || []}
          isShow={!collapseFilter}
          selectType={onChangeSelectedTypes}
        />
        <div tw="flex flex-col justify-center mb-20">
          <div
            css={[!collapseFilter ? tw`md:grid-cols-3` : tw`md:grid-cols-4`]}
            tw="w-full grid grid-cols-2 md:grid-cols-3 gap-5 py-14 px-5 md:px-6"
          >
            {currentProductData?.map((product, index) => (
              <ProductItem
                key={`${product.id} - ${index}`}
                collectionName={collectionContentful?.name}
                productData={product}
              />
            ))}
          </div>
          {!!currentProductData.length && (
            <div tw="mx-auto">
              <Pagination
                currentPage={currentPage}
                totalCount={products.length}
                pageSize={12}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
      <div tw="mt-12 sm:mt-0">
        <EmailLeadForm data={ctaContentful} />
      </div>
    </div>
  );
};

export default CollectionLayout;
