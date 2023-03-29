import tw, { styled } from 'twin.macro';

export const Container = styled.div`
  ${tw`justify-center hidden w-2/4 md:flex`}
  div, ul {
    ${tw`w-full h-full`}
  }
  .carousel {
    ${tw`flex justify-center items-center max-h-51.5`}
  }

  .slide {
    ${tw`flex items-center`}
  }

  .image {
    width: 35vw;
    height: 35vw;
    border: 1px solid #e4e4e4;
  }

  .slide img {
    ${tw`object-contain w-90`}
  }

  .thumbs {
    ${tw`flex items-center justify-center gap-3 mt-6`}
  }

  .thumb {
    ${tw`flex items-center justify-center `}
    border: 1px solid #e4e4e4;
  }
`;

export const ImageWrapper = styled.div`
  ${tw`relative w-full h-full`}
`;
export const ArowWrapper = styled.div<{
  marginLeft?: string;
  marginRight?: string;
}>`
  ${tw`absolute z-50 cursor-pointer`}
  left: ${({ marginLeft }) => marginLeft && marginLeft};
  right: ${({ marginRight }) => marginRight && marginRight};
  width: 21.48px !important;
  height: 37.53px !important;
`;
