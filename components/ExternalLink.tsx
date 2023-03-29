import 'twin.macro';

import { FC } from 'react';

type ExternalLinkProps = {
  to: string;
};

const ExternalLink: FC<ExternalLinkProps> = ({ children, to }) => {
  return (
    <a
      href={to}
      rel="noreferrer"
      target="_blank"
      tw="underline text-xs leading-4 font-semibold"
    >
      {children}
    </a>
  );
};

export default ExternalLink;
