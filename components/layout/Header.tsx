import React, { FC, useEffect, useMemo } from 'react';
import tw, { styled } from 'twin.macro';
import { useRouter } from 'next/router';

import { IconButton } from '../buttons';
import Logo from '../Logo';
import { useCart } from 'context/CartProvider';
import Dropdown from '@components/Dropdown';

export type INavBar = {
  menu: {
    logo: {
      url: string;
    };
    loginUrl: string;
    linksCollection: {
      items: {
        linkTitle: string;
        linkUrl: string;
      }[];
    };
  };
  categories: any;
};

type HeaderProps = {
  onToggleMenu: () => void;
  isOpen: boolean;
  data: INavBar;
};

const Header: FC<HeaderProps> = ({ data, isOpen, onToggleMenu }) => {
  const router = useRouter();
  const { cartItems, openCartSidebar } = useCart();

  const totalCartNum = useMemo(
    () => cartItems?.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const onClickLogin = (e) => {
    e.preventDefault();
    router.push(data?.menu?.loginUrl ?? '/');
  };

  const onClickCollection = (value) => {
    router.push(`/${router.query.brand}/collections/${value}`);
  };

  useEffect(() => {
    // Replacing the featured category with the first element
    if (data?.categories) {
      const indexFeatured = data?.categories?.findIndex(
        (item) => item.categoryTitle === 'Featured'
      );
      if (indexFeatured > -1) {
        const featured = data?.categories[indexFeatured];
        data.categories[indexFeatured] = data.categories[0];
        data.categories[0] = featured;
      }
    }
  }, [data?.categories]);

  return (
    <HeaderContainer>
      <div tw="flex items-center justify-between w-full">
        <div tw="flex justify-start items-center">
          <button tw="mr-5 md:hidden w-6 h-6" onClick={onToggleMenu}>
            <img
              alt="Menu"
              css={[{ height: isOpen ? 13 : 24, width: isOpen ? 13 : 24 }]}
              src={
                isOpen ? '/assets/images/close.svg' : '/assets/images/menu.svg'
              }
            />
          </button>
          <div tw="hidden md:block">
            <Logo
              href="https://showandtail.co"
              logoUrl={data?.menu?.logo?.url}
            />
          </div>
          <div tw="hidden md:flex ml-8">
            {data?.categories?.map((category, index) => (
              <Dropdown
                key={index}
                options={category.orderedCollectionsCollection?.items?.map(
                  (collection) => ({
                    ...collection,
                    label: collection.name,
                    value: collection.slug,
                  })
                )}
                placeHolder={category.categoryTitle}
                selectedOption={null}
                variant="HEADER"
                onChange={onClickCollection}
              />
            ))}
          </div>
        </div>
        <div tw="block md:hidden">
          <Logo href="https://showandtail.co" logoUrl={data?.menu?.logo?.url} />
        </div>
        <div tw="flex items-center md:hidden">
          <button tw="relative mr-5 ">
            <img alt="Menu" src="/assets/images/search.svg" tw="w-5" />
          </button>
          <button tw="relative" onClick={() => openCartSidebar(true)}>
            <img alt="Menu" src="/assets/images/cart.svg" tw="w-5" />
            {!!totalCartNum && <Badge>{totalCartNum}</Badge>}
          </button>
        </div>
      </div>

      <div tw="hidden md:flex items-center gap-6">
        <IconButton onClick={onClickLogin}>
          <img alt="User" src="/assets/images/search.svg" />
        </IconButton>

        <IconButton onClick={onClickLogin}>
          <img alt="User" src="/assets/images/user.svg" />
        </IconButton>

        <IconButton onClick={() => openCartSidebar(true)}>
          <img alt="Cart" src="/assets/images/cart.svg" />
          {!!totalCartNum && <Badge>{totalCartNum}</Badge>}
        </IconButton>
      </div>
    </HeaderContainer>
  );
};

export default Header;

export const Badge = styled.div`
  ${tw`absolute flex items-center justify-center w-4 h-4 font-bold text-center text-white border-2 border-white border-solid bg-blue`}
  right: -7px;
  top: -7px;
  border-radius: 100px;
  font-size: 10px;
  line-height: 12px;
`;

const HeaderContainer = styled.div`
  ${tw`sticky z-20 flex items-center justify-between w-full px-6 py-4 bg-white border border-gray-300 border-solid md:px-16 md:border-none`}
  top: -1px;
  @media (min-width: 425px) {
    min-height: 80px;
  }
`;
