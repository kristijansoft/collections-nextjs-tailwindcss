import { styled } from 'twin.macro';

import React from 'react';

const Footer = () => {
  return (
    <div tw="bg-black flex flex-col md:(flex-row px-16 justify-between) gap-4 px-5 py-10">
      <div tw="md:(col-span-3 w-4/12)">
        <div tw="mb-4 text-lg text-white">FOLLOW</div>
        <div tw="flex mb-6 gap-x-6">
          <a
            href="https://www.facebook.com/bullstrap/"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="facebook-icon"
              src="/assets/images/footer-icons/facebook.svg"
              tw="mr-2"
            />
          </a>
          <a
            href="https://www.youtube.com/channel/UCMnKPh3lOeeYHoobf3_kzUg"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="facebook-icon"
              src="/assets/images/footer-icons/youtube.svg"
              tw="mr-2"
            />
          </a>
          <a
            href="https://www.instagram.com/bullstrap/"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="pinterest-icon"
              src="/assets/images/footer-icons/instagram.svg"
              tw="mr-2"
            />
          </a>
          <a
            href="mailto:contact@bullstraps.com"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="instagram-icon"
              src="/assets/images/footer-icons/mail.svg"
              tw="mr-2"
            />
          </a>
        </div>
        <div css={[{ fontSize: 16 }]} tw="mb-4 text-white font-light">
          Sign up to get the latest on sales, new releases and more...
        </div>
        <FormWrapper tw="mb-4 md:w-full">
          <input
            required
            placeholder="Enter Your Email"
            tw="text-center focus:outline-none focus:ring-1 block p-2 md:(mr-5 text-left pl-6 w-3/4) mb-2 text-sm"
            type="text"
          />
          <button
            tw="bg-primary-200 hover:bg-gray-700 focus:outline-none text-white text-sm p-2 mb-2 md:w-1/4"
            type="submit"
          >
            Sign Up
          </button>
        </FormWrapper>
      </div>
      <div tw="md:(w-7/12 mt-3)">
        <ul tw="flex flex-col gap-y-3 md:(grid grid-cols-3)">
          <li tw="md:w-1/3">
            <a
              css={[{ fontSize: 16 }]}
              href="https://bullstrap.co/pages/support"
              rel="noreferrer"
              target="_blank"
              tw="no-underline text-white font-light whitespace-nowrap"
            >
              Customer Support
            </a>
          </li>
          <li tw="md:w-1/3">
            <a
              css={[{ fontSize: 16 }]}
              href="https://paddywax.com/pages/wholesale"
              rel="noreferrer"
              target="_blank"
              tw="no-underline text-white font-light whitespace-nowrap"
            >
              Terms & Conditions
            </a>
          </li>
          <li tw="md:w-1/3">
            <a
              css={[{ fontSize: 16 }]}
              href="https://id.discount/offers/website/paddywax.com"
              rel="noreferrer"
              target="_blank"
              tw="no-underline text-white font-light whitespace-nowrap"
            >
              Shipping & Returns
            </a>
          </li>
          <li tw="md:w-1/3">
            <a
              css={[{ fontSize: 16 }]}
              href="https://bullstrap.co/apps/help-center"
              rel="noreferrer"
              target="_blank"
              tw="no-underline text-white font-light whitespace-nowrap"
            >
              FAQ
            </a>
          </li>
          <li tw="md:w-1/3">
            <a
              css={[{ fontSize: 16 }]}
              href="https://bullstrap.co/pages/reviews"
              rel="noreferrer"
              target="_blank"
              tw="no-underline text-white font-light"
            >
              REVIEWS
            </a>
          </li>

          <li tw="md:w-1/3">
            <a
              css={[{ fontSize: 16 }]}
              href="https://paddywax.com/pages/faq"
              rel="noreferrer"
              target="_blank"
              tw="no-underline text-white font-light whitespace-nowrap"
            >
              Privacy Policy
            </a>
          </li>
          <li tw="md:w-1/3">
            <a
              css={[{ fontSize: 16 }]}
              href="https://www.pepperjamnetwork.com/affiliate/registration.php?refid=176793"
              rel="noreferrer"
              target="_blank"
              tw="no-underline text-white font-light whitespace-nowrap"
            >
              Lifetime Warranty
            </a>
          </li>

          <li tw="md:w-1/3">
            <a
              css={[{ fontSize: 16 }]}
              href="https://paddywax.com/pages/ca-cleaning-product-data"
              rel="noreferrer"
              target="_blank"
              tw="no-underline text-white font-light whitespace-nowrap"
            >
              Wholesale Policy
            </a>
          </li>
          <li tw="md:w-1/3">
            <a
              css={[{ fontSize: 16 }]}
              href="https://paddywax.com/pages/ca-cleaning-product-data"
              rel="noreferrer"
              target="_blank"
              tw="no-underline text-white font-light whitespace-nowrap"
            >
              Become an Ambassador
            </a>
          </li>
        </ul>
        <div tw="hidden md:(flex mt-9 gap-x-2)">
          <a
            href="https://www.facebook.com/bullstrap/"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="facebook-icon"
              src="/assets/images/footer-icons/payments/amazon.svg"
              tw="w-10 h-8"
            />
          </a>
          <a
            href="https://www.facebook.com/bullstrap/"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="facebook-icon"
              src="/assets/images/footer-icons/payments/amex.svg"
              tw="w-10 h-8"
            />
          </a>
          <a
            href="https://www.facebook.com/bullstrap/"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="facebook-icon"
              src="/assets/images/footer-icons/payments/apple-pay.svg"
              tw="w-10 h-8"
            />
          </a>
          <a
            href="https://www.facebook.com/bullstrap/"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="facebook-icon"
              src="/assets/images/footer-icons/payments/diners-club.svg"
              tw="w-10 h-8"
            />
          </a>
          <a
            href="https://www.facebook.com/bullstrap/"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="facebook-icon"
              src="/assets/images/footer-icons/payments/google-pay.svg"
              tw="w-10 h-8"
            />
          </a>
          <a
            href="https://www.facebook.com/bullstrap/"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="facebook-icon"
              src="/assets/images/footer-icons/payments/jcb.svg"
              tw="w-10 h-8"
            />
          </a>
          <a
            href="https://www.facebook.com/bullstrap/"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="facebook-icon"
              src="/assets/images/footer-icons/payments/mastercard.svg"
              tw="w-10 h-8"
            />
          </a>
          <a
            href="https://www.facebook.com/bullstrap/"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="facebook-icon"
              src="/assets/images/footer-icons/payments/paypal.svg"
              tw="w-10 h-8"
            />
          </a>
          <a
            href="https://www.facebook.com/bullstrap/"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="facebook-icon"
              src="/assets/images/footer-icons/payments/venmo.svg"
              tw="w-10 h-8"
            />
          </a>
          <a
            href="https://www.facebook.com/bullstrap/"
            rel="noreferrer"
            target="_blank"
            tw="no-underline text-white capitalize"
          >
            <img
              alt="facebook-icon"
              src="/assets/images/footer-icons/payments/visa.svg"
              tw="w-10 h-8"
            />
          </a>
        </div>
        <div tw="text-xs mt-11 text-white md:text-right">
          © 2021 Bullstrap. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;

const FormWrapper = styled.form`
  display: flex;

  @media (max-width: 425px) {
    flex-direction: column;
  }
`;
