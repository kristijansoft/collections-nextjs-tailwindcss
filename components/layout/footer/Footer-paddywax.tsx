import { styled } from 'twin.macro';

import React from 'react';
import tw from 'twin.macro';
const Link = styled.a`
  ${tw`text-gray-600 no-underline transition duration-300 ease-in-out hover:(underline text-black)`}
  text-underline-offset: 0.1rem;
`;

const SocialImg = styled.img`
  filter: brightness(0%);
  ${tw`transition duration-300 ease-in-out`}
  &:hover {
    filter: brightness(100%);
  }
`;

const Footer = () => {
  return (
    <div tw="flex flex-col w-full bg-ecruWhite">
      <div tw="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-1 px-6 md:px-16 py-10">
        <div>
          <div tw="mb-4 text-lg font-bold">Help</div>
          <ul tw="flex flex-col gap-4">
            <li>
              <Link
                href="https://paddywax.com/pages/faq"
                rel="noreferrer"
                target="_blank"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="https://www.pepperjamnetwork.com/affiliate/registration.php?refid=176793"
                rel="noreferrer"
                target="_blank"
              >
                Affiliates
              </Link>
            </li>
            <li>
              <Link
                href="https://id.discount/offers/website/paddywax.com"
                rel="noreferrer"
                target="_blank"
              >
                Student Discount
              </Link>
            </li>
            <li>
              <Link
                href="https://paddywax.com/pages/stores"
                rel="noreferrer"
                target="_blank"
              >
                Store Locator
              </Link>
            </li>
            <li>
              <Link
                href="https://paddywax.com/pages/about-us"
                rel="noreferrer"
                target="_blank"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="contact">
          <div tw="mb-4 text-lg font-bold">Learn More</div>
          <ul tw="flex flex-col gap-4">
            <li>
              <Link
                href="https://paddywax.com/pages/careers"
                rel="noreferrer"
                target="_blank"
              >
                Our Story
              </Link>
            </li>
            <li>
              <Link
                href="https://paddywax.com/pages/careers"
                rel="noreferrer"
                target="_blank"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="https://paddywax.com/pages/wholesale"
                rel="noreferrer"
                target="_blank"
              >
                Press
              </Link>
            </li>
            <li>
              <Link
                href="https://paddywax.com/pages/faq"
                rel="noreferrer"
                target="_blank"
              >
                Wholesale
              </Link>
            </li>
            <li>
              <Link
                href="https://paddywax.com/pages/about-us"
                rel="noreferrer"
                target="_blank"
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div className="contact">
          <div tw="mb-4 text-lg font-bold">Show us your Paddywax!</div>
          <ul>
            <li tw="mb-8 text-gray-600">
              Tag us @paddywaxcandles! We love to see you how you use, style &
              repurpose our products, and we might feature you!
            </li>
            <li tw="text-gray-600">
              *Free Shipping is based on cost before taxes and after discounts
              and only applies to contiguous United States
            </li>
          </ul>
        </div>
        <div tw="mt-3 flex justify-center md:justify-end">
          <a
            href="https://dw-collective.com/"
            rel="noreferrer"
            target="_blank"
            tw="no-underline"
          >
            <img
              alt="facebook-icon"
              src="/assets/images/footer-icons/DWC_Logo3.png"
              tw="mr-2"
            />
          </a>
        </div>
      </div>
      <div tw="flex mt-6 mb-14 w-full justify-center items-center">
        <a
          href="https://www.facebook.com/PaddywaxCandles"
          rel="noreferrer"
          target="_blank"
          tw="no-underline mr-6"
        >
          <SocialImg
            alt="facebook-icon"
            height={16}
            src="/assets/images/footer-icons/icon-facebook.svg"
            width={16}
          />
        </a>
        <a
          href="https://www.pinterest.com/paddywax/"
          rel="noreferrer"
          target="_blank"
          tw="no-underline mr-6"
        >
          <SocialImg
            alt="pinterest-icon"
            height={16}
            src="/assets/images/footer-icons/icon-pinterest.svg"
            width={16}
          />
        </a>
        <a
          href="https://www.instagram.com/paddywaxcandles/"
          rel="noreferrer"
          target="_blank"
          tw="no-underline"
        >
          <SocialImg
            alt="instagram-icon"
            height={16}
            src="/assets/images/footer-icons/icon-instagram.svg"
            width={16}
          />
        </a>
      </div>
      <div tw="text-sm py-10 w-full text-center border-t-2 border-t-gray-300">
        @2021 Paddywax. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
