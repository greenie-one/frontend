import React from 'react';
import { GreenieLogo } from '../components/GreenieLogo';

type PageProps = {
  candidateFirstName: string;
  candidateLastName: string;
};

export const FrontPage: React.FC<PageProps> = ({ candidateFirstName, candidateLastName }): JSX.Element => {
  return (
    <section className="front-page">
      <GreenieLogo />
      <p className="candidate-name">
        {candidateFirstName} {candidateLastName}
      </p>
      <p className="report-title">Background verification report</p>
    </section>
  );
};
