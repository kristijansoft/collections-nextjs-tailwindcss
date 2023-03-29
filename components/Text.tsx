import 'twin.macro';

import { FC } from 'react';

type TextProps = {
  color?: string;
  level?: number;
  weight?: number;
};

const Text: FC<TextProps> = ({ children, color, level, weight }) => {
  const style: React.CSSProperties = {
    color,
    fontWeight: weight,
  };

  switch (level) {
    case 1:
      return <h1 style={style}>{children}</h1>;
    case 2:
      return (
        <h2 style={style} tw="text-xl font-bold">
          {children}
        </h2>
      );
    case 3:
      return <h3 style={style}>{children}</h3>;
    case 4:
      return <h4 style={style}>{children}</h4>;
    case 5:
      return (
        <h5 style={style} tw="text-sm font-normal">
          {children}
        </h5>
      );
    case 6:
      return (
        <h6 style={style} tw="text-xs font-normal">
          {children}
        </h6>
      );
    default:
      return <span style={style}>{children}</span>;
  }
};

export default Text;
