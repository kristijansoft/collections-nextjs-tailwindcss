import { useCart } from 'context/CartProvider';
import React, { useEffect, useMemo } from 'react';
import 'twin.macro';
import ProgressBar from '../ProgressBar';

const AnnounceBar = ({ data }) => {
  const { announcement, cartItems, onSetAnnouncement } = useCart();

  useEffect(() => {
    if (!data) return;
    const totalPrice = cartItems.reduce(
      (prev, cur) => prev + parseInt(cur?.price?.amount) * cur.quantity,
      0
    );
    const thresHold = data?.freeShippingThreshold;
    onSetAnnouncement({
      progress: totalPrice > thresHold ? 100 : (totalPrice / thresHold) * 100,
      title:
        !totalPrice || !thresHold
          ? data.defaultMessage
          : totalPrice < thresHold
          ? `Add $${thresHold - totalPrice} more for free shipping!`
          : data.successMessage,
    });
  }, [cartItems, data]);

  if (!data || !announcement) return null;

  return (
    <div tw="w-full bg-primary-200 py-3 font-bold uppercase flex justify-center flex-col md:flex-row">
      <span
        css={[{ fontSize: 13 }]}
        tw="text-center font-bold uppercase mr-6 tracking-widest text-white"
      >
        {announcement.title}
      </span>
      {!!announcement.progress && announcement.progress !== 100 && (
        <div tw="w-full md:w-1/3 px-4 mt-2 md:mt-0 md:mb-0">
          <ProgressBar progress={announcement.progress} />
        </div>
      )}
    </div>
  );
};

export default AnnounceBar;
