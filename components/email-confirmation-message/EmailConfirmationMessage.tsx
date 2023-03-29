import React from 'react';
import { message } from './constants';
import { Container, Wrapper } from './EmailConfirmationMessage.style';
import { EmailConfirmationMessageI } from './types';
import Image from 'next/image';
import 'twin.macro';

export const EmailConfirmationMessage: React.FC<EmailConfirmationMessageI> = ({
  logoUrl,
}): JSX.Element => {
  return (
    <Container>
      <Wrapper>
        {logoUrl && (
          <div tw="relative w-52 h-11">
            <Image
              alt="image"
              layout="fill"
              objectFit="contain"
              src={logoUrl}
            />
          </div>
        )}
        {message}
      </Wrapper>
    </Container>
  );
};
