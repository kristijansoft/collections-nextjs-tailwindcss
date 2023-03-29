import { styled } from 'twin.macro';

import Link from 'next/link';
import { FC } from 'react';

const LogoImg: FC<{ logoUrl: string }> = ({ logoUrl }) => (
  <LogoImage alt="Logo" src={logoUrl} tw="cursor-pointer" />
);

type LogoProps = {
  href?: string;
  logoUrl: string;
};

const Logo: FC<LogoProps> = ({ href, logoUrl }) => {
  return href ? (
    <Link passHref href={href}>
      <a>
        <LogoImg logoUrl={logoUrl} />
      </a>
    </Link>
  ) : (
    <LogoImg logoUrl={logoUrl} />
  );
};

export default Logo;

const LogoImage = styled.img`
  height: 24px;

  @media (max-width: 425px) {
    height: 22px;
  }
`;
