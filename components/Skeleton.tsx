export const getSkeletonImage = (w, h) => {
  const skeletonImgData = `
  <svg width="${w}" height="${h}" viewBox="0 0 ${h} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#ECECEC"/>
  <path d="M175 169.667V132.333C175 129.4 172.6 127 169.667 127H132.333C129.4 127 127 129.4 127 132.333V169.667C127 172.6 129.4 175 132.333 175H169.667C172.6 175 175 172.6 175 169.667ZM141.667 155L148.333 163.027L157.667 151L169.667 167H132.333L141.667 155Z" fill="#BEBEBE"/>
  </svg>
  `;
  return toBase64(skeletonImgData);
};

export const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);
