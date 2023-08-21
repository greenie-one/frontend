import React from 'react';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { Button } from '@mantine/core';
import { ReportTop } from './ReportTop';
import './_report.scss';

interface ChildComponentProps {
  ResidentialInfo: ResidentialType[];
}
const data = [
  ['1', '2', '3', '4'],
  ['1', '2', '3', '4'],
];

export const ResidentialReport: React.FC<ChildComponentProps> = ({ ResidentialInfo }) => {
  return (
    <>
      <main className="report-container">
        <ReportTop />

        <div className="disclaimer-box">
          <span className="disclaimer-text">Residential Information</span>
          {ResidentialInfo.map((resident, index) => (
            <>
              <div key={index} className="residential-address">
                <div className="residential-address-left left-residential">
                  <p>{resident.addressType} Address</p>
                  <p>
                    {resident.address_line_1} {resident.address_line_2} {resident.city} - {resident.pincode}
                  </p>
                  {resident.isVerified ? (
                    <Button
                      leftIcon={<MdVerified color="#17A672" size={'16px'} />}
                      className="verified report-verifybtn"
                    >
                      Verified
                    </Button>
                  ) : (
                    <Button leftIcon={<CgSandClock size={'16px'} />} className="pending report-verifybtn">
                      Pending
                    </Button>
                  )}
                </div>
              </div>
              <div className="location">
                <p>Location Accuracy</p>
                <div className="location-date">
                  <p>Last updated</p>
                  {/* <p>{resident.updatedAt}</p> */}
                </div>
              </div>
              <div className="table">
                <div className="row">
                  <div className="cell">Description</div>
                  <div className="cell">Source</div>
                  <div className="cell">Location Resolution Logic</div>
                  <div className="cell">Legend</div>
                </div>
                {data.map((rowData, i) => (
                  <div key={i} className="row">
                    {rowData.map((cellData, ind) => (
                      <div key={ind} className="cell">
                        {cellData}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          ))}
        </div>
      </main>
    </>
  );
};
