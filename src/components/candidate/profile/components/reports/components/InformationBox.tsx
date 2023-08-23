import React from 'react';

type ComponentProps = {
  label: string;
  children: React.ReactNode;
};

export const InformationBox: React.FC<ComponentProps> = ({ label, children }): JSX.Element => {
  return (
    <div className="information-box">
      <span className="information-label">{label}</span>
      <div className="information-value">{children}</div>
    </div>
  );
};
