import React from 'react';
import { GreenieLogo } from './GreenieLogo';

type ComponentProps = {
  withReportTitle?: boolean;
};

export const PageHeader: React.FC<ComponentProps> = ({ withReportTitle = true }): JSX.Element => {
  return (
    <div className="page-header">
      <div className="greenie-logo-container">
        <GreenieLogo />
        <a href="https://greenie.one/" target="_blank" rel="noopener noreferrer" className="greenie-url">
          www.greenie.one
        </a>
      </div>
      {withReportTitle ? <div className="report-title-container">Background Verification Report</div> : <></>}
    </div>
  );
};
