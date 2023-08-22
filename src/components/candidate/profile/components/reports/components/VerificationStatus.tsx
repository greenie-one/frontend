import React from 'react';
import { CgSandClock } from 'react-icons/cg';
import { MdVerified } from 'react-icons/md';

type ComponentProps = {
  withIcon?: boolean;
};

export const Verified: React.FC<ComponentProps> = ({ withIcon = false }): JSX.Element => {
  return (
    <span className="verification-status status-verified">
      {withIcon ? <MdVerified size={17} /> : <></>}
      Verified
    </span>
  );
};

export const Pending: React.FC<ComponentProps> = ({ withIcon = false }): JSX.Element => {
  return (
    <span className="verification-status status-pending">
      {withIcon ? <CgSandClock size={17} /> : <></>}
      Pending
    </span>
  );
};

export const Matched = (): JSX.Element => {
  return <span className="verification-status status-verified">Matched</span>;
};

export const NotMatched: React.FC = (): JSX.Element => {
  return <span className="verification-status status-pending">Not Matched</span>;
};
