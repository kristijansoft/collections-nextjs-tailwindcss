import { CarouselImageComponent } from '@components/carousel-image-component';
import { useCart } from 'context/CartProvider';
import { useProduct } from 'context/ProductProvider';
import React, { useEffect, useMemo, useState } from 'react';
import tw, { styled, theme } from 'twin.macro';
import { currencyFormatter, setCapitalForWords } from '../../utils/general';
import Accordion from '../Accordion';
import AddonSelector from '../AddonSelector';
import { PrimaryButton, SecondaryButton } from '../buttons';
import Dropdown from '../Dropdown';
import QuantitySelector from '../QuantitySelector';
import Text from '../Text';
import ProductCarousel from './ProductCarousel';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Ratings from '@components/Ratings';
import Image from 'next/image';
import { getSkeletonImage } from '@components/Skeleton';
import FloatingCATDesktop from './FloatingCATDesktop';
import { useScroll } from '@hooks/useScroll';

const options = {
  renderText: (text) =>
    text.split('\n').flatMap((text, i) => [i > 0 && <br />, text]),
};

const ProductOverview = ({
  data,
  sections,
}: {
  data: any;
  sections: Array<{ id: string; title: string }>;
}) => {
  const [selectedScent, setSelectedScent] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedProduct, setSelectedProduct] = React.useState<any>({
    images: [
      { src: '/assets/images/skeleton.jpg' },
      { src: '/assets/images/skeleton.jpg' },
    ],
  });

  const [quantity, setQuantity] = useState(1);
  const { setProductData } = useProduct();
  const { productContentData, productShopifyData, upsellShopifyData } =
    useProduct();
  const { directon, offset } = useScroll();

  React.useEffect(() => {
    const { productContentData, productShopifyData, upsellShopifyData } = data;
    setProductData({
      logoUrl: null,
      productContentData,
      productShopifyData,
      upsellShopifyData,
    });
  }, []);

  const {
    addToCart,
    checkout,
    currentCartItem,
    onSetCurrentCurtItem,
    openCartSidebar,
  } = useCart();

  const { descriptionHtml, scentOptions, sizeOptions, title, variants } =
    useMemo(() => productShopifyData, [productShopifyData]);

  const upsellProducts = useMemo(
    () => productContentData?.upsellCollection?.items,
    [productContentData]
  );

  const totalPrice = useMemo(() => {
    return currencyFormatter(
      Math.floor(parseInt(currentCartItem?.price?.amount) * quantity),
      'USD'
    );
  }, [currentCartItem, quantity]);

  useEffect(() => {
    if (!selectedScent && scentOptions) {
      setSelectedScent(scentOptions[0]);
    }
  }, [scentOptions, selectedScent]);

  const onAddToCart = () => {
    addToCart(currentCartItem);
    openCartSidebar(true);
  };

  const onBuyNow = () => {
    checkout(currentCartItem);
  };

  useEffect(() => {
    if (!selectedSize && sizeOptions) {
      setSelectedSize(sizeOptions[0]);
    }
  }, [sizeOptions, selectedSize]);

  useEffect(() => {
    if (variants?.length) {
      let sortedVariant = variants.filter(
        (item) =>
          item.selectedOptions[
            item?.selectedOptions?.findIndex((item) =>
              ['Color', 'Scent'].includes(item.name)
            )
          ]?.value === selectedScent
      );

      if (sizeOptions) {
        sortedVariant = sortedVariant.filter(
          (item) =>
            item.selectedOptions[
              item?.selectedOptions?.findIndex((item) => item.name === 'Size')
            ]?.value === selectedSize.toLowerCase()
        );
      }

      if (sortedVariant?.length > 0) {
        const { available, id, image, priceV2, sku } = sortedVariant[0];
        const productIndex =
          productContentData?.colorVariantsCollection?.items?.findIndex(
            (item) => item.shopifyVariant === id
          );

        let productSelected = null;
        let images = [];

        if (productIndex >= 0) {
          productSelected =
            productContentData?.colorVariantsCollection?.items[productIndex];
          images =
            productSelected?.imageCollection?.variantImagesCollection?.items.map(
              (img) => ({
                src:
                  img.url + (img.url.includes('?') ? '&fm=webp' : '?fm=webp'),
              })
            );
        }

        if (!images.length) {
          if (image?.src) {
            images.push(image);
          }
          if (productShopifyData?.images?.length) {
            images = [...images, ...productShopifyData?.images];
          }
        }

        if (!images.length) {
          images.push({ src: '/assets/images/skeleton.jpg' });
        }

        const additionalInfo =
          productContentData?.informationalDropdownsCollection?.items;

        setSelectedProduct({
          additionalInfo: additionalInfo?.length
            ? additionalInfo
            : productSelected?.additionalDetailsCollection?.items,
          description:
            productSelected?.variantDescription?.json ?? descriptionHtml,
          faq: productSelected?.additionalDetailsCollection?.items[1]
            ?.dropdownBody.json.content[0].content[0].value,
          images,
          info: productSelected?.additionalDetailsCollection?.items[0]
            ?.dropdownBody.json.content[0].content[0].value,
        });

        onSetCurrentCurtItem({
          available,
          imageSrc: images.length && images[0].src,
          price: priceV2,
          productName: title,
          quantity,
          scentVariant: selectedScent,
          sizeVariant: selectedSize,
          sku,
          variantId: id,
        });
      }
    }
  }, [selectedScent, selectedSize, productShopifyData]);

  useEffect(() => {
    onSetCurrentCurtItem({ ...currentCartItem, quantity });
  }, [quantity]);

  useEffect(() => {
    if ((window as any).dataLayer && currentCartItem?.variantId) {
      (window as any).dataLayer.push(currentCartItem);
    }
  }, [currentCartItem?.variantId]);

  const IS_CAROUSEL_MODE =
    productContentData?.productImageDisplay === 'carousel';

  return (
    <>
      <section
        id={data.__typename}
        tw="md:(pl-0 py-16 mx-16) flex flex-col md:flex-row"
      >
        <div tw="mb-9 mt-9 md:hidden">
          <ProductCarousel images={selectedProduct?.images} />
        </div>
        {!IS_CAROUSEL_MODE ? (
          <ProductImgContainer>
            {selectedProduct.images.map((img, index) => (
              <div
                key={index}
                css={[{ paddingBottom: '100%' }]}
                tw="border border-gray-200 border-solid relative w-full h-0"
              >
                <Image
                  alt={index}
                  blurDataURL={`data:image/svg+xml;base64,${getSkeletonImage(
                    358,
                    358
                  )}`}
                  layout="fill"
                  objectFit="contain"
                  placeholder="blur"
                  priority={index < 2}
                  src={img.src}
                />
              </div>
            ))}
          </ProductImgContainer>
        ) : (
          <CarouselImageComponent images={selectedProduct?.images} />
        )}

        <DetailContainer
          css={[selectedProduct === undefined && tw`md:(w-2/3)`]}
        >
          <div tw="mb-2.5">
            {title && (
              <Text
                color={
                  selectedScent ? theme`colors.gray.600` : theme`colors.black`
                }
                level={selectedScent ? 6 : 2}
              >
                {title}
              </Text>
            )}
            <h2
              color={theme`colors.black`}
              css={[{ lineHeight: '43px' }]}
              tw="text-xl font-bold"
            >
              {setCapitalForWords(selectedScent)}
            </h2>
          </div>

          <div tw="flex items-center mb-4">
            <Ratings size={16} spacing={5} value={4.3} />
            <div tw="ml-2.5">
              <Text level={5}>22 Reviews</Text>
            </div>
          </div>

          <div tw="mb-7">
            <Description>
              {typeof selectedProduct?.description === 'string' ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedProduct?.description,
                  }}
                />
              ) : (
                documentToReactComponents(selectedProduct?.description, options)
              )}
            </Description>
          </div>

          <div tw="mb-7 flex flex-col">
            {scentOptions && (
              <div tw="mb-5">
                <div tw="mb-3">
                  <Text level={6} weight={600}>
                    Color
                  </Text>
                </div>
                <Dropdown
                  options={scentOptions}
                  selectedOption={selectedScent}
                  onChange={(value) => setSelectedScent(`${value}`)}
                />
              </div>
            )}

            <div tw="flex flex-row justify-between">
              {!!sizeOptions && (
                <div tw="w-1/2 mb-5 mr-6">
                  <Dropdown
                    options={sizeOptions}
                    selectedOption={selectedSize}
                    onChange={(value) => setSelectedSize(`${value}`)}
                  />
                </div>
              )}
              <div css={[sizeOptions ? tw`w-1/2` : tw`w-full`]}>
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
              </div>
            </div>

            {!!upsellProducts?.length && !!upsellShopifyData && (
              <div tw="mt-5">
                <AddonSelector
                  contentData={upsellProducts[0]}
                  shopifyData={upsellShopifyData}
                />
              </div>
            )}
          </div>

          {/* <div tw="mb-7">
          <div tw="flex justify-start items-center mb-2">
            <span tw="text-xxs mr-2">
              Pay in full or in 4 interest-free installments of $6,25 with
            </span>
            <img
              alt="Afterpay"
              src="/assets/images/shop_pay_logotype.png"
              tw="h-3"
            />
          </div>

          <div tw="text-center">
            <ExternalLink to="/">Learn More</ExternalLink>
          </div>
        </div> */}
          <div tw="mb-7 flex flex-col md:flex-row">
            {currentCartItem?.available && (
              <PrimaryButton onClick={onAddToCart}>
                {`ADD TO CART • ${totalPrice}`}
              </PrimaryButton>
            )}

            <div
              tw="w-full mt-3 md:mt-0 ml-0 md:ml-6"
              css={[!currentCartItem?.available && tw`md:ml-0`]}
            >
              <SecondaryButton width="100%" onClick={onBuyNow}>
                BUY NOW
              </SecondaryButton>
            </div>
          </div>

          <div tw="flex justify-center mb-9">
            <img alt="Ship" src="/assets/images/ship.svg" tw="mr-3" />
            <span tw="text-xs leading-4">Free 2-3 Day Shipping</span>
          </div>

          <div tw="flex flex-col gap-1">
            {selectedProduct?.additionalInfo?.map((item, index) => (
              <Accordion
                key={index}
                heading={item?.dropdownTitle}
                panel={item?.dropdownBody?.json?.content[0]?.content[0].value}
              />
            ))}
          </div>
        </DetailContainer>
      </section>
      <FloatingCATDesktop
        isShow={!(offset > 1104 && directon === 'Up')}
        // isShow
        sections={sections || []}
      />
    </>
  );
};

export default ProductOverview;

const ProductImgContainer = styled.div`
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 824px;
  ${tw`hidden md:(grid w-2/3) grid-cols-2 overflow-y-scroll`}

  @media screen and (min-width: 768px) {
    width: 63%;
    gap: 23px;
  }
`;

const DetailContainer = styled.div`
  ${tw`px-5 md:(pl-14 pr-0)`}
  @media screen and (min-width: 768px) {
    width: 46.9%;
  }
`;

const Description = styled.h5`
  font-size: 16px;
  line-height: 24px;
  a {
    ${tw`text-blue`}
  }
`;
