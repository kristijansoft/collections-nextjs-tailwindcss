import Image from 'next/image';
import React from 'react';

import {
  Container,
  ImageSection,
  TextSection,
  TextSectionParagraph,
  TextSectionTitle,
} from './TextAndImageSection.style';
import { TextAndImageSectionInterface } from './types';

export const TextAndImageSection: React.FC<{
  textImageSection: TextAndImageSectionInterface;
}> = ({ textImageSection }): JSX.Element => {
  if (!textImageSection) return null;
  const { __typename, sectionBody, sectionImageOrGif, sectionTitle } =
    textImageSection || {};

  return (
    <Container>
      <ImageSection>
        <Image
          alt={__typename}
          layout="fill"
          objectFit="cover"
          src={sectionImageOrGif.url}
        />
      </ImageSection>
      <TextSection>
        <TextSectionTitle>{sectionTitle}</TextSectionTitle>
        <TextSectionParagraph>
          {sectionBody.json.content[0].content[0].value}
        </TextSectionParagraph>
      </TextSection>
    </Container>
  );
};
