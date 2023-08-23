import React from 'react';

type ComponentProps = {
  children: React.ReactNode;
};

export const PageHeading: React.FC<ComponentProps> = ({ children }) => {
  return <h1 className="page-heading">{children}</h1>;
};
