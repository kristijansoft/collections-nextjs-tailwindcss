import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css';

import React from 'react';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';
import { Global, css } from '@emotion/react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
const { publicRuntimeConfig } = getConfig();

const GlobalStyles = () => {
  const { query } = useRouter();

  const config = publicRuntimeConfig[query.brand as string];

  return (
    <>
      <BaseStyles />
      <Global
        styles={css`
          :root {
            --color-primary-100: ${config?.styles?.colors?.primary[100] ??
            '#F8F3E7'};
            --color-primary-200: ${config?.styles?.colors?.primary[200] ??
            '#FADDCC'};
            --color-primary-300: ${config?.styles?.colors?.primary[300] ??
            '#F3CFB8'};
            --color-secondary: ${config?.styles?.colors?.secondary ??
            '#F3CFB8'};
            --font-main: ${config?.styles?.font.family ?? 'sans-serif'};
            --text-color-primary: ${config?.styles?.colors?.textColor
              ?.primary ?? 'black'};
            --text-color-secondary: ${config?.styles?.colors?.textColor
              ?.secondary ?? 'black'};
          }
          body {
            ${tw`antialiased font-main`}
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            ${tw`m-0`}
          }

          .hide-scroll {
            -ms-overflow-style: none;
            overflow: -moz-scrollbars-none;
          }

          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
          .stop-scrolling {
            height: 100%;
            overflow: hidden;
          }
        `}
      />
    </>
  );
};

export default GlobalStyles;
