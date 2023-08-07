import React from 'react';
import { MdVerified } from 'react-icons/md';
import { Text, Box, Button } from '@mantine/core';
import './_report.scss';
export const WorkExperienceReport2: React.FC = (): JSX.Element => {
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
          <div className="residential-address">
            <div className="residential-address-left ">
              <p>Infotech Solutions Private Limited</p>
              <p>Greenie Verified on 20/04/2023</p>
              <Button leftIcon={<MdVerified color="#17A672" size={'16px'} />} className="verified report-verifybtn">
                Verified
              </Button>
            </div>
            <div className="residential-address-right">View Company profile</div>
          </div>
        </div>

        <div className="peer-exp-name">
          <p>Nitin Prabhakar</p>
          <span>Reporting Manager</span>
        </div>

        <Box className="add-peer-header add-peer-exp-header">
          <Text className="add-peer-header-text">Attitude</Text>
          <Text className="add-peer-header-text">Verified as</Text>
          <Text className="add-peer-header-text">Verified on</Text>
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text">Remarks/Comments</Text>
        </Box>

        <Box className="added-peer-box">
          <Box className="added-peers added-exp-peers">
            <Text className="peer-name title">Candidate Company ID</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name text-verified">Approved</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers added-exp-peers">
            <Text className="peer-name title">Department</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name text-verified">Approved</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers added-exp-peers">
            <Text className="peer-name title">Designation at work</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name text-verified">Approved</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers added-exp-peers">
            <Text className="peer-name title">Date of Joining</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name text-verified">Approved</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers added-exp-peers">
            <Text className="peer-name title">Date of Leaving</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name text-verified">Approved</Text>
            <Text className="peer-name">Test</Text>
          </Box>
        </Box>

        <div className="peer-exp-name">
          <p>Manoj Shinde</p>
          <span>HR</span>
        </div>

        <Box className="add-peer-header add-peer-exp-header">
          <Text className="add-peer-header-text">Attitude</Text>
          <Text className="add-peer-header-text">Verified as</Text>
          <Text className="add-peer-header-text">Verified on</Text>
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text">Remarks/Comments</Text>
        </Box>

        <Box className="added-peer-box">
          <Box className="added-peers added-exp-peers">
            <Text className="peer-name title">Candidate Company ID</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name text-dispute">Disputed</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers added-exp-peers">
            <Text className="peer-name title">Department</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name text-dispute">Disputed</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers added-exp-peers">
            <Text className="peer-name title">Designation at work</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name text-verified">Approved</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers added-exp-peers">
            <Text className="peer-name title">Date of Joining</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name text-verified">Approved</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers added-exp-peers">
            <Text className="peer-name title">Date of Leaving</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name text-verified">Approved</Text>
            <Text className="peer-name">Test</Text>
          </Box>
        </Box>
      </main>
    </>
  );
};
