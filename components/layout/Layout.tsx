import 'twin.macro';

import { FC, useState } from 'react';
import { CartProvider } from 'context/CartProvider';

import { Footer } from './footer/index';
import Header from './Header';
import MobileMenu from './MobileMenu';
import CartSideBar from '@components/product/CartSideBar';
import AnnounceBar from './AnnounceBar';
import { useRouter } from 'next/router';

export const Layout: FC<{ navbar: any; footer: any; announcementBar: any }> = ({
  announcementBar,
  children,
  navbar,
}) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const { query } = useRouter();

  return (
    <main>
      <CartProvider>
        <div tw="w-full h-full">
          <AnnounceBar data={announcementBar} />
          <MobileMenu
            data={navbar}
            isOpen={isSidebarOpened}
            onClose={() => setIsSidebarOpened(false)}
          />
          {navbar && (
            <Header
              data={navbar}
              isOpen={isSidebarOpened}
              onToggleMenu={() => setIsSidebarOpened(!isSidebarOpened)}
            />
          )}
          <div>{children}</div>
          <Footer brand={query.brand} />
          <CartSideBar />
        </div>
      </CartProvider>
    </main>
  );
};
