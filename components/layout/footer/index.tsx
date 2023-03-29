import React from 'react';
import PFooter from './Footer-paddywax';
import BFooter from './Footer-bullstrap';

export const Footer = ({ brand }) => {
  switch (brand) {
    case 'paddywax':
      return <PFooter />;
    case 'bullstrap':
      return <BFooter />;
    default:
      return null;
  }
};
