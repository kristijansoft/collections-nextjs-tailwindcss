import React, { useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { useRouter } from 'next/router';

const Container = styled.div<{ showCart: boolean }>`
  ${({ showCart }) => (showCart ? tw`translate-x-0` : tw`-translate-x-full`)}
  @media screen and (min-width: 768px) {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  }
`;

const MobileMenu = ({
  data,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: { categories: any };
}) => {
  const sideBarRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  //   useClickOutside(sideBarRef, () => isOpen && onClose());
  const router = useRouter();
  const openCategory = (index) => {
    setSelectedCategory(data.categories[index]);
    setOpenMenu(true);
  };

  const onClickCollection = (slug) => {
    onClose();
    router.push(`/${router.query.brand}/collections/${slug}`);
  };
  return (
    <Container
      ref={sideBarRef}
      css={[{ height: 'calc(100vh - 55px)' }]}
      showCart={isOpen}
      tw="flex flex-col justify-between md:hidden border border-solid border-gray-200 z-50 fixed top-14 left-0 bg-white w-3/4  overflow-x-auto transition duration-700 ease-in-out transform"
    >
      {!openMenu && (
        <div tw="flex flex-col items-center pt-5 px-5 ">
          {data?.categories?.map((category, index) => (
            <div key={index} tw="flex justify-between mb-8 w-full">
              <span>{category.categoryTitle}</span>
              <button
                tw="relative rotate-180"
                onClick={() => openCategory(index)}
              >
                <img alt="Menu" src="/assets/images/arrow_left.svg" />
              </button>
            </div>
          ))}
        </div>
      )}
      {openMenu && selectedCategory && (
        <div tw="flex flex-col items-center pt-5 px-5 ">
          <div tw="flex justify-start mb-8 w-full">
            <button tw="relative mr-2" onClick={() => setOpenMenu(false)}>
              <img alt="Menu" src="/assets/images/arrow_left.svg" />
            </button>
            <span>{selectedCategory.categoryTitle}</span>
          </div>
          {selectedCategory?.orderedCollectionsCollection?.items?.map(
            (item, index) => (
              <div
                key={index}
                tw="flex justify-between w-full mb-8"
                onClick={() => onClickCollection(item.slug)}
              >
                <span>{item.name}</span>
              </div>
            )
          )}
        </div>
      )}
      <div tw="flex pl-5 pb-6">
        <button tw="pr-2" onClick={onClose}>
          <img alt="Menu" src="/assets/images/user.svg" />
        </button>
        <span>Login</span>
      </div>
    </Container>
  );
};

export default MobileMenu;
