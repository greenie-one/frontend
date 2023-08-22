import React from 'react';
import { MdVerified } from 'react-icons/md';
import { Text, Box } from '@mantine/core';
import AadharImg from '../../assets/Aadhar.png';
import PanImg from '../../assets/Pan.png';
import './_report.scss';
export const IDReport: React.FC = (): JSX.Element => {
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
          <span className="disclaimer-text id-report">IDs</span>
        </div>
        <Box className="basic-info-box-wrapper idreport-container">
          <Box className="info-box idreport-box">
            <Text className="experience-details-box-heading id-heading">Aadhaar Card</Text>
            <Text className="experience-details-box-text">Verified on 20/04/2023</Text>
            <Text className="experience-details-box-text request-text">Request access to get Aadhaar information</Text>
          </Box>
          <Box className="info-box idreport-box">
            <Text className="experience-details-box-heading id-heading">XXXX XXXX 8971</Text>
            <Text className="experience-details-box-text">Verified by UIDAI API</Text>
          </Box>
          <Box className="info-box idreport-box">
            <img src={AadharImg} />
          </Box>
        </Box>
        <Box className="basic-info-box-wrapper idreport-container">
          <Box className="info-box idreport-box">
            <Text className="experience-details-box-heading id-heading">PAN</Text>
            <Text className="experience-details-box-text">Verified on 20/04/2023</Text>
            <Text className="experience-details-box-text request-text">Request access to get Aadhaar information</Text>
          </Box>
          <Box className="info-box idreport-box">
            <Text className="experience-details-box-heading id-heading">VGFC7865M</Text>
            <Text className="experience-details-box-text">Verified by API</Text>
          </Box>
          <Box className="info-box idreport-box">
            <img src={PanImg} />
          </Box>
        </Box>

        <Box className="basic-info-box-wrapper idreport-container">
          <Box className="info-box idreport-box">
            <Text className="experience-details-box-heading id-heading">Driver License</Text>
            <Text className="experience-details-box-text">Verified on 20/04/2023</Text>
            <Text className="experience-details-box-text request-text">Request access to get Aadhaar information</Text>
          </Box>
          <Box className="info-box idreport-box">
            <Text className="experience-details-box-heading id-heading">200056789875</Text>
            <Text className="experience-details-box-text">Verified by API</Text>
          </Box>
          <Box className="info-box idreport-box">
            <img src={AadharImg} />
          </Box>
        </Box>
      </main>
    </>
  );
};
