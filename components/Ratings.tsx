import dynamic from 'next/dynamic';
import { FC } from 'react';
import { theme } from 'twin.macro';
import { useRouter } from 'next/router';

const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false,
});

type RatingsProps = {
  color?: string;
  onChange?: (rating: number) => void;
  size?: number;
  spacing?: number;
  value?: number;
};

const Ratings: FC<RatingsProps> = ({
  color,
  onChange,
  size,
  spacing,
  value,
}) => {
  const { query } = useRouter();
  return (
    <StarRatings
      changeRating={onChange}
      rating={value}
      starDimension={size ? `${size}px` : undefined}
      starRatedColor={
        color ?? query.brand === 'bullstrap'
          ? theme`colors.primary.200`
          : theme`colors.black`
      }
      starSpacing={spacing ? `${spacing / 2}px` : undefined}
    />
  );
};

export default Ratings;
