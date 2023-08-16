import React from 'react';
import { MdVerified } from 'react-icons/md';
import { Text, Box, Button } from '@mantine/core';
import './_report.scss';

interface ChildComponentProps {
  ResidentialInfo: ResidentialType[];
}

export const ResidentialReport2: React.FC<ChildComponentProps> = ({ ResidentialInfo }) => {
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
          {ResidentialInfo.map((resident, index) => (
            <div key={index} className="residential-address">
              <div className="residential-address-left left-residential">
                <p>{resident.addressType} Address</p>
                <p>
                  {' '}
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
          <p>About Residence</p>
          <div className="location-date">
            <p>Last updated</p>
            <p>02/03/2023</p>
          </div>
        </div>
        {ResidentialInfo.map((resident, index) => (
          <Box key={index} className="basic-info-box-wrapper residence-wrapper">
            <Box className="info-box">
              <Text className="experience-details-box-heading">Address type</Text>
              <Text className="experience-details-box-text">{resident.addressType} </Text>
            </Box>
            <Box className="info-box">
              <Text className="experience-details-box-heading">Tenure</Text>
              <Text className="experience-details-box-text">
                {resident.startDate.substring(0, 4)} - {resident.endDate ? resident.endDate.substring(0, 4) : 'Present'}
              </Text>
            </Box>
            <Box className="info-box">
              <Text className="experience-details-box-heading">Address Line 1</Text>
              <Text className="experience-details-box-text">{resident.address_line_1} </Text>
            </Box>
            <Box className="info-box">
              <Text className="experience-details-box-heading">Address Line 2</Text>
              <Text className="experience-details-box-text">{resident.address_line_2}</Text>
            </Box>
          </Box>
        ))}

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
        <Box className="basic-info-box-wrapper executive-wrapper">
          <Box className="info-box">
            <Text className="experience-details-box-heading">Ashok Deshmukh</Text>
            <Text className="experience-details-box-text">Father</Text>
          </Box>
        </Box>
      </main>
    </>
  );
};
