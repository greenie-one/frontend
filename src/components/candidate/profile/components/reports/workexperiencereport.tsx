import React from 'react';
import { MdVerified } from 'react-icons/md';
import { Button, Text, Box } from '@mantine/core';
import './_report.scss';
interface ChildComponentProps {
  workExperienceDetails: WorkExperience[];
}

export const WorkExperienceReport: React.FC<ChildComponentProps> = ({ workExperienceDetails }) => {
  console.log(workExperienceDetails);

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
          <span className="disclaimer-text">Work Experience (Verification parameters)</span>
          {workExperienceDetails.map((experience, index) => (
            <div key={index} className="residential-address">
              <div className="residential-address-left ">
                <p>{experience.companyName}</p>
                <p>Greenie Verified on 20/04/2023</p>
                <Button leftIcon={<MdVerified color="#17A672" size={'16px'} />} className="verified report-verifybtn">
                  Verified
                </Button>
              </div>
              <a href={experience.linkedInUrl} target="_blank" rel="noopener noreferrer">
                <div className="residential-address-right">View Company profile</div>
              </a>
            </div>
          ))}
        </div>

        <div className="location">
          <p>Conduct report</p>
          <div className="location-date">
            <p>Last updated</p>
            <p>02/03/2023</p>
          </div>
        </div>

        <Box className="add-peer-header">
          <Text className="add-peer-header-text">Particular</Text>
          <Text className="add-peer-header-text">Verified as</Text>
          <Text className="add-peer-header-text">Verified on</Text>
          <Text className="add-peer-header-text">Remarks</Text>
        </Box>

        <Box className="added-peer-box">
          <Box className="add-peers">
            <Box className="added-peers">
              <Text className="peer-name title">Attitude</Text>
              <Text className="peer-name">Moderately Collaborated</Text>
              <Text className="peer-name">20/04/2023</Text>
              <Text className="peer-name">Test</Text>
            </Box>
            <Box className="added-peers">
              <Text className="peer-name title">Rehire eligibility</Text>
              <Text className="peer-name">No</Text>
              <Text className="peer-name">20/04/2023</Text>
              <Text className="peer-name">Test</Text>
            </Box>
            <Box className="added-peers">
              <Text className="peer-name title">Exit procedure</Text>
              <Text className="peer-name">Completed</Text>
              <Text className="peer-name">20/04/2023</Text>
              <Text className="peer-name">Test</Text>
            </Box>
          </Box>
        </Box>
      </main>
    </>
  );
};
