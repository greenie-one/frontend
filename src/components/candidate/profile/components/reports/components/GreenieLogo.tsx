import React from 'react';
import { MdVerified } from 'react-icons/md';

export const GreenieLogo: React.FC = (): JSX.Element => {
  return (
    <div className="greenie-logo">
      <span className="greenie">Greenie</span>
      <span className="verified-icon">
        <MdVerified />
      </span>
    </div>
  );
};
