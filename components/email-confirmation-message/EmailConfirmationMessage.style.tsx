import tw, { styled } from 'twin.macro';

export const Container = styled.div`
  ${tw`absolute flex items-center justify-center w-full h-full text-xl font-bold leading-7 bg-white md:text-xxl`}

  img {
    @media (min-width: 1024px) {
      width: 7.0625rem;
      height: 8rem;
    }
  }
`;

export const Wrapper = styled.div`
  ${tw`flex flex-col items-center gap-6`}
`;
