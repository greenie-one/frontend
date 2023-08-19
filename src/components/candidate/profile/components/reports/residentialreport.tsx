import React from 'react';
import { MdVerified } from 'react-icons/md';
import { Button } from '@mantine/core';
import { ReportTop } from './ReportTop';
import './_report.scss';

interface ChildComponentProps {
  ResidentialInfo: ResidentialType[];
}

export const ResidentialReport: React.FC<ChildComponentProps> = ({ ResidentialInfo }) => {
  return (
    <>
      <main className="report-container">
        <ReportTop />

        <div className="disclaimer-box">
          <span className="disclaimer-text">Residential Information</span>
          {ResidentialInfo.map((resident, index) => (
            <div key={index} className="residential-address">
              <div className="residential-address-left left-residential">
                <p>{resident.addressType} Address</p>
                <p>
                  {resident.address_line_1} {resident.address_line_2} {resident.city} - {resident.pincode}
                </p>
                <Button leftIcon={<MdVerified color="#17A672" size={'16px'} />} className="verified report-verifybtn">
                  Verified
                </Button>
              </div>
              <div className="residential-address-right">Locate on Google maps</div>
            </div>
          ))}
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
