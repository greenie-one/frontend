import React from 'react';
import { MdVerified } from 'react-icons/md';
import { Text, Box } from '@mantine/core';
import './_report.scss';
export const PersonalIdentification: React.FC = (): JSX.Element => {
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
            <p>Personal Identification</p>
          </div>
        </div>

        <div className="location">
          <p>Aadhaar Card</p>
          <div className="location-date">
            <p>Last updated</p>
            <p>02/03/2023</p>
          </div>
        </div>

        <Box className="add-peer-header">
          <Text className="add-peer-header-text">Particular</Text>
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text">Remarks</Text>
        </Box>

        <Box className="added-peer-box">
          <Box className="added-peers ">
            <Text className="peer-name title">Full Name</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
        </Box>

        <div className="location">
          <p>PAN Card</p>
          <div className="location-date">
            <p>Last updated</p>
            <p>02/03/2023</p>
          </div>
          <div className="location-date">
            <p>Aadhaar Linked</p>
            <p>Yes</p>
          </div>
          <div className="location-date">
            <p>Validity</p>
            <p>02/03/2023</p>
          </div>
        </div>

        <Box className="add-peer-header">
          <Text className="add-peer-header-text">Particular</Text>
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text">Remarks</Text>
        </Box>

        <Box className="added-peer-box">
          <Box className="added-peers ">
            <Text className="peer-name title">Full Name</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">PAN Number</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">DOB</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">PAN type</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">Phone Number</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
        </Box>

        <div className="location">
          <p>Driving License</p>
          <div className="location-date">
            <p>Last updated</p>
            <p>02/03/2023</p>
          </div>
          <div className="location-date">
            <p>Date of Issue</p>
            <p>Yes</p>
          </div>
          <div className="location-date">
            <p>Date of Expiry</p>
            <p>02/03/2023</p>
          </div>
        </div>

        <Box className="add-peer-header">
          <Text className="add-peer-header-text">Particular</Text>
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text">Remarks</Text>
        </Box>

        <Box className="added-peer-box">
          <Box className="added-peers ">
            <Text className="peer-name title">Full Name</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">Father’s Name</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">DL Number</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">DOB</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">Vehicle type</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">Phone Number</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">Blood Group</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
        </Box>
      </main>
    </>
  );
};
