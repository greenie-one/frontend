import React from 'react';
import { MdVerified } from 'react-icons/md';
import { BsLinkedin } from 'react-icons/bs';
import { Text, Box, Button } from '@mantine/core';
import pdfIcon from '../../assets/pdfIcon.png';
import { Link } from 'react-router-dom';
import './_report.scss';
export const WorkExperienceReport4: React.FC = (): JSX.Element => {
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
          <span className="disclaimer-text id-report">Work Experience</span>
          <div className="residential-address">
            <div className="residential-address-left ">
              <p>Infotech Solutions Private Limited</p>
              <p>Greenie Verified on 20/04/2023</p>
            </div>
            <div className="residential-address-right">Click to see Greenie profile</div>
          </div>
        </div>

        <div className="disclaimer-box">
          <div className="residential-address residential-top">
            <div className="residential-address-left ">
              <p>Software Engineer</p>
              <p>Greenie Verified on 20/04/2023</p>
              <Button leftIcon={<MdVerified color="#17A672" size={'16px'} />} className="verified report-verifybtn">
                Verified
              </Button>
            </div>
          </div>
        </div>

        <div className="location">
          <p>About Company</p>
        </div>
        <Box className="basic-info-box-wrapper">
          <Box className="info-box">
            <Text className="experience-details-box-heading">Company Type</Text>
            <Text className="experience-details-box-text">Permanent</Text>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">
              <BsLinkedin color="#0077b5" />
              LinkedIn
            </Text>
            <Text className="experience-details-box-text">View Profile</Text>
          </Box>
        </Box>

        <div className="location">
          <p>Basic Information</p>
        </div>

        <Box className="basic-info-box-wrapper">
          <Box className="info-box">
            <Text className="experience-details-box-heading">Company ID</Text>
            <Text className="experience-details-box-text">GRN6543A</Text>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">LinkedIn</Text>
            <Text className="experience-details-box-text">abhishek@infotech.com</Text>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">Tenure</Text>
            <Text className="experience-details-box-text">2021 - Present (2y 4m)</Text>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">Work Type</Text>
            <Text className="experience-details-box-text">Full time - Work from home</Text>
          </Box>
        </Box>

        <div className="location">
          <p>Verified By</p>
        </div>
        <Box className="basic-info-box-wrapper executive-wrapper">
          <Box className="info-box info-box-address">
            <Text className="experience-details-box-heading">Nitin Prabhakar (Manager)</Text>
            <Text className="experience-details-box-text">13/06/2023</Text>
          </Box>
          <Box className="info-box info-box-address">
            <Text className="experience-details-box-heading">Manoj Shinde (HR)</Text>
            <Text className="experience-details-box-text">13/06/2023</Text>
          </Box>
        </Box>

        <div className="peer-exp-name">
          <p>Documents</p>
        </div>
        <Box className="folder-wrapper report-folder-wrapper">
          <Link to="" className="folder" target="_blank">
            <img src={pdfIcon} alt="PDF Icon" />
            <Text className="doc-name">TestTestTestTestTestTestTestTestTestTest</Text>
          </Link>
          <Link to="" className="folder" target="_blank">
            <img src={pdfIcon} alt="PDF Icon" />
            <Text className="doc-name">Test</Text>
          </Link>
          <Link to="" className="folder" target="_blank">
            <img src={pdfIcon} alt="PDF Icon" />
            <Text className="doc-name">Test</Text>
          </Link>
          <Link to="" className="folder" target="_blank">
            <img src={pdfIcon} alt="PDF Icon" />
            <Text className="doc-name">Test</Text>
          </Link>
          <Link to="" className="folder" target="_blank">
            <img src={pdfIcon} alt="PDF Icon" />
            <Text className="doc-name">Test</Text>
          </Link>
        </Box>
      </main>
    </>
  );
};
