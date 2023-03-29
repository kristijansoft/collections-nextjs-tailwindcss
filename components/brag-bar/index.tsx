import { getSkeletonImage } from '@components/Skeleton';
import Image from 'next/image';
import React from 'react';
import Ticker from 'react-ticker';

import { Container, LogoWrapper, Wrapper } from './BragBar.style';
import { BragBarInterface } from './types';

const BragBar: React.FC<BragBarInterface> = ({ data }): JSX.Element => {
  if (!data) return null;
  const { __typename, assetsCollection } = data || {};

  return (
    <Container id={__typename}>
      <Ticker>
        {() => (
          <Wrapper>
            {assetsCollection?.items?.map((item, index) => {
              return (
                <LogoWrapper key={index}>
                  <Image
                    alt={'Logo Image'}
                    height={100}
                    objectFit="contain"
                    src={item?.asset?.url + '?fm=webp'}
                    blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
                      129,
                      76
                    )}`}
                    placeholder="blur"
                    width={150}
                  />
                </LogoWrapper>
              );
            })}
          </Wrapper>
        )}
      </Ticker>
    </Container>
  );
};

export default BragBar;
