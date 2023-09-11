import React from 'react';
import { MdVerified } from 'react-icons/md';
import './_report.scss';
export const Report: React.FC = (): JSX.Element => {
  return (
    <main className="report-container report-container-main">
      <div className="report-background ">
        <div className="report-container-head">
          <div className="report-header">
            <span className="greenie">Greenie</span>
            <span className="verified report-verifybtn">
              <MdVerified />
            </span>
          </div>
        </div>

        <p className="greenie-text">www.greenie.one</p>
        <div className="disclaimer-box">
          <span style={{ borderBottom: '0' }} className="disclaimer-text">
            Disclaimer
          </span>
          <p className="disclaimer-details">
            This report is based on the information gathered from various sources that were made available to Greenie
            team during the verification process and should not be considered as a definitive pronouncement on the
            individual/s whose background was sought to be verified. The Greenie team has no responsibility to update
            its findings for events or circumstances occurring after the date of this report unless specifically
            requested for.
          </p>
          <p className="disclaimer-details">
            The report is based on our understanding of the information and the facts provided in the Case Initiation
            Form pertaining to your candidates/employees. In case of any change in the fact pattern, our comments may
            need to be revisited.
          </p>{' '}
          <p className="disclaimer-details">
            {' '}
            All draft findings, interim advice and preliminary reports in this regard issued before this final report
            stand withdrawn. This report is primarily for the information and use of the Premium Customer but may be
            disclosed to its legal advisors or external auditors after the final report is issued by Greenie. We make no
            representation or warranty on the contents of the report other than those mentioned in the agreement for
            services with the Client.
          </p>
          <p className="disclaimer-details">
            The report may not be used for any other purpose, or transmitted, or distributed to any other party, by the
            Client without our prior written consent.
          </p>
        </div>
      </div>
    </main>
  );
};
