import React, { useMemo } from 'react';
import tw from 'twin.macro';
import Product from './ProductOverview';
import TextImageSection from '@components/text-and-image-section';
import BragBar from 'components/brag-bar';
import EmailSignupSection from './EmailLeadForm';
import FaqSection from './FAQ';
import ReviewSection from './FeaturedReview';
import InfluencerReview from './InfluencerReview';
import CarouselSection from './ReasonToLove';
import TextOverImageSection from './TextOverImages';
import YouMayAlsoLikeSection from './LikeProducts';

import FloatingCATMobile from './FloatingCATMobile';
import { useWindowSize } from '@hooks/useWindowSize';

const SECTION_MAP = {
  BragBar,
  CarouselSection,
  EmailSignupSection,
  FaqSection,
  InfluencerReview,
  Product,
  ReviewSection,
  TextImageSection,
  TextOverImageSection,
  YouMayAlsoLikeSection,
};

export default function ProductLayout({ sections }: { sections: any }) {
  const [isShowFloatingDesktop, setIsFloatingDesktop] =
    React.useState<boolean>(false);

  const { width } = useWindowSize();

  React.useEffect(() => {
    document.body.scrollTo({ top: 0 });
  }, []);

  React.useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const limitedScroll = width < 768 ? 1200 : 1000;

    if (window.scrollY > limitedScroll) setIsFloatingDesktop(true);
    else setIsFloatingDesktop(false);
  };

  const sectionNames = useMemo(() => {
    return sections.map((sectItem) => ({
      id: sectItem.__typename,
      title: sectItem.sectionTitle,
    }));
  }, [sections]);

  return (
    <div tw="flex flex-col gap-y-6">
      <div css={[isShowFloatingDesktop ? tw`block md:hidden` : tw`hidden`]}>
        <FloatingCATMobile />
      </div>

      {sections.map((section, i) => {
        const Component = SECTION_MAP[section.__typename];

        return Component ? (
          section.__typename === 'Product' ? (
            <Component key={i} data={section} sections={sectionNames} />
          ) : (
            <Component key={i} data={section} />
          )
        ) : null;
      })}
    </div>
  );
}
