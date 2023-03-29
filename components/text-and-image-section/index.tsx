import { getSkeletonImage } from '@components/Skeleton';
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

const TextAndImageSection: React.FC<{
  data: TextAndImageSectionInterface;
}> = ({ data }): JSX.Element => {
  if (!data) return null;
  const { __typename, sectionBody, sectionImageOrGif, sectionTitle } =
    data || {};

  return (
    <Container id={data.__typename}>
      <ImageSection>
        <Image
          alt={__typename}
          layout="fill"
          objectFit="cover"
          src={sectionImageOrGif.url + '?fm=webp'}
          blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
            626,
            626
          )}`}
          placeholder="blur"
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

export default TextAndImageSection;
