import 'twin.macro';

import Link from 'next/link';
import React, { FC } from 'react';

import { CloseButton } from '../buttons';
import Logo from '../Logo';
import { INavBar } from './Header';

type SidebarProps = {
  onClose: () => void;
  data: INavBar;
};

const Sidebar: FC<SidebarProps> = ({ data, onClose }) => {
  return (
    <div tw="w-sidebar h-full px-5 py-4 mt-6 bg-white">
      <div>
        <div tw="flex justify-between items-center pt-2">
          <Logo href="/" logoUrl={data?.menu?.logo?.url} />
          <div tw="mr-1 inline-flex items-center">
            <CloseButton onClick={onClose} />
          </div>
        </div>
        <div tw="mt-10">
          <ul>
            {data?.menu?.linksCollection?.items?.map((link, index) => (
              <li key={index} tw="text-lg font-bold uppercase mb-3">
                <Link href={link.linkUrl}>{link.linkTitle}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
