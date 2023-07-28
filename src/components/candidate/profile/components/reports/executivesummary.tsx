import React from 'react';
import { MdVerified } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { Text, Box, Button } from '@mantine/core';
import dummyThumbnail from '../../assets/johnMarston.png';
import level from '../../assets/levelFilled.png';
import './_report.scss';
export const ExecutiveSummary: React.FC = (): JSX.Element => {
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
          <span className="disclaimer-text">Executive Summmary</span>
          <div className="residential-address">
            <div className="residential-address-left workexperience">
              <span className="profile-thumbnail">
                <img src={dummyThumbnail} className="profile-img" />
              </span>
              <div>
                <p>Abhishek Deshmukh</p>
                <p>Software Engineer</p>
                <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified report-verifybtn">
                  Verified
                </Button>
              </div>
            </div>
            <div className="residential-address-right">
              <CgProfile size={'20px'} />
              View profile
            </div>
            <div className="residential-address-right">Total Completeness</div>
          </div>
        </div>
        <Box className="basic-info-box-wrapper wrapper-executive">
          <Box className="info-box">
            <Text className="experience-details-box-heading">Greenie ID</Text>
            <Text className="experience-details-box-text">GRN6543A</Text>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">Greenie rating</Text>
            <Text className="experience-details-box-text">
              <span>
                <img className="star-img" src={level} alt="level" />
              </span>
              4.5 rating
            </Text>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">Greenie verified</Text>
            <Text className="experience-details-box-text">14/02/2023</Text>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">Did you know?</Text>
            <Text className="experience-details-box-text">Abhishek is among the top 2% on Greenie</Text>
          </Box>
        </Box>
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
            <Text className="peer-name title">Personal Identification</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">Residential Information</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
          <Box className="added-peers ">
            <Text className="peer-name title">Work Experience</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name">Test</Text>
          </Box>
        </Box>

        <div className="location">
          <p>Work Experience (2)</p>
          <div className="location-date">
            <p>Verified on</p>
            <p>02/03/2023</p>
          </div>
        </div>

        <Box className="basic-info-box-wrapper executive-wrapper">
          <Box className="info-box">
            <Text className="experience-details-box-heading">Software Engineer Intern</Text>
            <Text className="experience-details-box-text">Infotech Solutions Pvt Ltd</Text>
            <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified report-verifybtn">
              Verified
            </Button>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">Software Engineer</Text>
            <Text className="experience-details-box-text">App. 1901, Thornridge Circle</Text>
            <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified report-verifybtn">
              Verified
            </Button>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">Senior Software Engineer</Text>
            <Text className="experience-details-box-text">Infosys Private Limited</Text>
            <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified report-verifybtn">
              Verified
            </Button>
          </Box>
        </Box>

        <div className="location">
          <p>Residential Addresses (2)</p>
          <div className="location-date">
            <p>Verified on</p>
            <p>02/03/2023</p>
          </div>
        </div>

        <Box className="basic-info-box-wrapper executive-wrapper">
          <Box className="info-box">
            <Text className="experience-details-box-heading">Permanent Address</Text>
            <Text className="experience-details-box-text">1901 Thornridge Circle, Baner, Pune - 411006</Text>
            <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified report-verifybtn">
              Verified
            </Button>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">Temporary Address</Text>
            <Text className="experience-details-box-text">1901 Thornridge Circle, Baner, Pune - 411006</Text>
            <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified report-verifybtn">
              Verified
            </Button>
          </Box>
        </Box>
      </main>
    </>
  );
};
