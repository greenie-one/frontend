import React from 'react';
import { MdVerified } from 'react-icons/md';
import './_report.scss';
export const ResidentialReport: React.FC = (): JSX.Element => {
  return (
    <>
      <main className="report-container">
        <div className="report-container-head report-res">
          <div>
            <div className="report-header">
              <span className="greenie">Greenie</span>
              <span className="verified report-verifybtn">
                <MdVerified />
              </span>
            </div>
            <p className="greenie-text">www.greenie.one</p>
          </div>
          <div>
            <p>Background Verification Report</p>
          </div>
        </div>

        <div className="disclaimer-box">
          <span className="disclaimer-text">Residential Information</span>
          <div className="residential-address">
            <div className="residential-address-left">
              <p>Permanent Address</p>
              <p>1901 Thornridge Circle, Baner, Pune - 411006</p>
            </div>
            <div className="residential-address-right">Locate on Google maps</div>
          </div>
        </div>
        <div className="location">
          <p>Location Accuracy</p>
          <div className="location-date">
            <p>Last updated</p>
            <p>02/03/2023</p>
          </div>
        </div>
      </main>
    </>
  );
};
