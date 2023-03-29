import tw, { styled } from 'twin.macro';
export const Container = tw.div`
flex 
flex-col
bg-tan
pb-12

lg:flex-row 
lg:flex-row-reverse 
lg:h-45
lg:pb-0
`;

export const ImageSection = tw.div`
flex 
relative 
justify-center 
w-full 
h-25.87 
p-50

lg:w-2/4 
lg:h-full
lg:p-0
`;

export const TextSection = tw.div`
flex
flex-col 
justify-center 
items-start 
px-6 
w-full 
pt-16 

lg:w-2/4 
lg:items-center
lg:pt-0
`;

export const TextSectionTitle = styled.p`
  ${tw`font-bold text-2.25 leading-10 lg:w-28.12 lg:text-xxl`}
  line-height: 56px;
  @media (max-width: 1024px) {
    line-height: 40px;
  }
`;

export const TextSectionParagraph = tw.p`
py-3 
text-lg 
leading-6

lg:w-28.12 
lg:text-1.5 
lg:pt-8
lg:leading-8
`;
