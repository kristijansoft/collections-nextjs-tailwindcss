/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const brandsConfig = require('./brands.json');

module.exports = withPWA({
  serverRuntimeConfig: {
    ...brandsConfig.reduce(
      (prev, cur) => ({ ...prev, [cur.brand]: cur.credentials }),
      {}
    ),
  },
  publicRuntimeConfig: {
    ...brandsConfig.reduce((prev, cur) => ({ ...prev, [cur.brand]: cur }), {}),
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/categories',
  //       permanent: true,
  //     },
  //   ];
  // },
});
