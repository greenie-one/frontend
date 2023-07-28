import React from 'react';
import { MdVerified } from 'react-icons/md';
import { Text, Box } from '@mantine/core';
import './_report.scss';
export const ResidentialReport2: React.FC = (): JSX.Element => {
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
          <p>About Residence</p>
          <div className="location-date">
            <p>Last updated</p>
            <p>02/03/2023</p>
          </div>
        </div>
        <Box className="basic-info-box-wrapper">
          <Box className="info-box">
            <Text className="experience-details-box-heading">Address type</Text>
            <Text className="experience-details-box-text">Permanent</Text>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">Tenure</Text>
            <Text className="experience-details-box-text">2021 - Present (2y 4m)</Text>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">Address Line 1</Text>
            <Text className="experience-details-box-text">App. 1901, Thornridge Circle</Text>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">Address Line 2</Text>
            <Text className="experience-details-box-text">Baner, Pune - 411006</Text>
          </Box>
        </Box>

        <div className="location">
          <p>Geographic Information</p>
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
              <Text className="peer-name title">Landmark</Text>
              <Text className="peer-name">Test</Text>
              <Text className="peer-name">Test</Text>
              <Text className="peer-name">Test</Text>
            </Box>
            <Box className="added-peers">
              <Text className="peer-name title">Landmark</Text>
              <Text className="peer-name">Test</Text>
              <Text className="peer-name">Test</Text>
              <Text className="peer-name">Test</Text>
            </Box>
            <Box className="added-peers">
              <Text className="peer-name title">Landmark</Text>
              <Text className="peer-name">Test</Text>
              <Text className="peer-name">Test</Text>
              <Text className="peer-name">Test</Text>
            </Box>
            <Box className="added-peers">
              <Text className="peer-name title">Landmark</Text>
              <Text className="peer-name">Test</Text>
              <Text className="peer-name">Test</Text>
              <Text className="peer-name">Test</Text>
            </Box>
          </Box>
        </Box>

        <div className="location">
          <p>Verified By</p>
          <div className="location-date">
            <p>Last updated</p>
            <p>02/03/2023</p>
          </div>
        </div>
        <Box className="basic-info-box-wrapper">
          <Box className="info-box">
            <Text className="experience-details-box-heading">Ashok Deshmukh</Text>
            <Text className="experience-details-box-text">Father</Text>
          </Box>
        </Box>
      </main>
    </>
  );
};
