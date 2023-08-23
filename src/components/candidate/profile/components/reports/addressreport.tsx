import React from 'react';
import { MdVerified } from 'react-icons/md';
import { Text, Box } from '@mantine/core';
import AadharImg from '../../assets/Aadhar.png';
import './_report.scss';
export const AddressReport: React.FC = (): JSX.Element => {
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
        </div>
        <div className="disclaimer-box">
          <span className="disclaimer-text id-report">Address</span>
        </div>
        <Box className="basic-info-box-wrapper idreport-container">
          <Box className="info-box idreport-box">
            <Text className="experience-details-box-heading id-heading">Address 1 (Permanent)</Text>
            <Text className="experience-details-box-text">Verified on 20/04/2023</Text>
          </Box>
          <Box className="info-box idreport-box">
            <Text className="experience-details-box-heading id-heading">
              1901 Thornridge Circle, Baner, Pune - 411006
            </Text>
            <Text className="experience-details-box-text">Verified by Resident</Text>
          </Box>
          <Box className="info-box idreport-box">
            <img src={AadharImg} />
          </Box>
        </Box>
        <div className="location">
          <p>Other information</p>
        </div>

        <Box className="basic-info-box-wrapper">
          <Box className="info-box info-box-address">
            <Text className="experience-details-box-heading">Address type</Text>
            <Text className="experience-details-box-text">Permanent</Text>
          </Box>
          <Box className="info-box info-box-address">
            <Text className="experience-details-box-heading">Tenure</Text>
            <Text className="experience-details-box-text">2016 - Present (7y 4m)</Text>
          </Box>
        </Box>

        <div className="location">
          <p>About Residence</p>
        </div>

        <Box className="basic-info-box-wrapper executive-wrapper">
          <Box className="info-box info-box-address">
            <Text className="experience-details-box-heading">Address line 1</Text>
            <Text className="experience-details-box-text">App. 1901, Thornridge Circle</Text>
          </Box>
          <Box className="info-box info-box-address">
            <Text className="experience-details-box-heading">Address line 2</Text>
            <Text className="experience-details-box-text">Baner, Pune - 411006</Text>
          </Box>
        </Box>

        <div className="location">
          <p>Geographic Information</p>
        </div>

        <Box className="basic-info-box-wrapper box-address">
          <Box className="info-box info-box-address">
            <Text className="experience-details-box-heading">Landmark</Text>
            <Text className="experience-details-box-text">Near JP Mall</Text>
          </Box>
          <Box className="info-box info-box-address">
            <Text className="experience-details-box-heading">Pincode</Text>
            <Text className="experience-details-box-text">4110021</Text>
          </Box>
          <Box className="info-box info-box-address">
            <Text className="experience-details-box-heading">City</Text>
            <Text className="experience-details-box-text">Pune</Text>
          </Box>
          <Box className="info-box info-box-address">
            <Text className="experience-details-box-heading">State</Text>
            <Text className="experience-details-box-text">Maharashtra</Text>
          </Box>
          <Box className="info-box info-box-address">
            <Text className="experience-details-box-heading">Country</Text>
            <Text className="experience-details-box-text">India</Text>
          </Box>
          <Box className="info-box info-box-address">
            <Text className="experience-details-box-heading">Google maps</Text>
            <Text className="experience-details-box-text">Click to locate</Text>
          </Box>
        </Box>

        <div className="location">
          <p>Verified By</p>
        </div>
        <Box className="basic-info-box-wrapper executive-wrapper">
          <Box className="info-box info-box-address">
            <Text className="experience-details-box-heading">Ashok Deshmukh (Father)</Text>
            <Text className="experience-details-box-text">13/06/2023</Text>
          </Box>
        </Box>
      </main>
    </>
  );
};
