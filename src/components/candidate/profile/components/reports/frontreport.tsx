import React from 'react';
import { MdVerified } from 'react-icons/md';
import './_report.scss';

type FrontReportProps = {
  userName: string;
};

export const FrontReport: React.FC<FrontReportProps> = ({ userName }): JSX.Element => {
  return (
    <>
      <main className="report-container front-report">
        <div style={{ marginTop: '-10rem' }}>
          <div style={{ justifyContent: 'center' }} className="report-container-head ">
            <span className="greenie">Greenie</span>
            <span style={{ padding: '3px', height: '44px' }} className="verified report-verifybtn">
              <MdVerified size={22} />
            </span>
          </div>
          <p style={{ textAlign: 'center' }} className="report-name">
            {userName}
          </p>
          <p style={{ textAlign: 'center' }} className="report-verify">
            Background verification report
          </p>
        </div>
      </main>
    </>
  );
};
