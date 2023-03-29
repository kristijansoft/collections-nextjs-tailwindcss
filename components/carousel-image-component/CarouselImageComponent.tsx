import React from 'react';
import { CarouselImageComponentI } from './types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import {
  ArowWrapper,
  Container,
  ImageWrapper,
} from './CarouselImageComponent.style';
import prevIcon from 'public/icons/icon-arow-prev.png';
import nextIcon from 'public/icons/icon-arow-next.png';
import Image from 'next/image';
import { getSkeletonImage } from '@components/Skeleton';

export const CarouselImageComponent: React.FC<CarouselImageComponentI> = ({
  images,
}): JSX.Element => {
  if (!images) return null;

  return (
    <Container>
      <Carousel
        autoPlay
        infiniteLoop
        showArrows
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <ArowWrapper marginRight="4%" onClick={onClickHandler}>
              {/* <Image alt="icon" height="37.53" src={nextIcon} width="21.48" /> */}
            </ArowWrapper>
          )
        }
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <ArowWrapper marginLeft="4%" onClick={onClickHandler}>
              {/* <Image alt="icon" height="37.53" src={prevIcon} width="21.48" /> */}
            </ArowWrapper>
          )
        }
        showIndicators={false}
        showStatus={false}
        showThumbs={images?.length < 2 ? false : true}
        thumbWidth={50}
      >
        {images?.map((image, index) => {
          return (
            <ImageWrapper key={index} className="image">
              <Image
                alt="image"
                layout="fill"
                blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
                  328,
                  328
                )}`}
                placeholder="blur"
                objectFit="contain"
                src={image.src}
              />
            </ImageWrapper>
          );
        })}
      </Carousel>
    </Container>
  );
};
