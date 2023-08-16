import React from 'react';
import { MdVerified } from 'react-icons/md';
import { BsLinkedin } from 'react-icons/bs';
import { Text, Box, Button } from '@mantine/core';
import pdfIcon from '../../assets/pdfIcon.png';
import { Link } from 'react-router-dom';
import './_report.scss';

interface ChildComponentProps {
  workExperienceDetails: WorkExperience[];
}

export const WorkExperienceReport3: React.FC<ChildComponentProps> = ({ workExperienceDetails }) => {
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
          <span className="disclaimer-text">Work Experience</span>
        </div>

        {workExperienceDetails.map((experience, index) => (
          <>
            <div className="disclaimer-box">
              <div className="residential-address residential-top ">
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
            </div>
            <div className="location">
              <p>About Company</p>
              <div className="location-date">
                <p>Last updated</p>
                <p>02/03/2023</p>
              </div>
            </div>
            <Box className="basic-info-box-wrapper work-wrapper">
              <Box className="info-box">
                <Text className="experience-details-box-heading">Company Type</Text>
                <Text className="experience-details-box-text">{experience.companyType}</Text>
              </Box>
              <Box className="info-box">
                <Text className="experience-details-box-heading">
                  <BsLinkedin color="#0077b5" />
                  LinkedIn
                </Text>
                <a href={experience.linkedInUrl} target="_blank" rel="noopener noreferrer">
                  <Text className="experience-details-box-text">View Profile</Text>
                </a>
              </Box>
            </Box>
            <div className="location">
              <p>Basic Information</p>
              <div className="location-date">
                <p>Last updated</p>
                <p>02/03/2023</p>
              </div>
            </div>
            <Box className="basic-info-box-wrapper work-wrapper">
              <Box className="info-box">
                <Text className="experience-details-box-heading">Company ID</Text>
                <Text className="experience-details-box-text">{experience.companyId}</Text>
              </Box>
              <Box className="info-box">
                <Text className="experience-details-box-heading">LinkedIn</Text>
                <Text className="experience-details-box-text">{experience.linkedInUrl}</Text>
              </Box>
              <Box className="info-box">
                <Text className="experience-details-box-heading">Tenure</Text>
                <Text className="experience-details-box-text">
                  {experience.dateOfJoining.substring(0, 4)} -{' '}
                  {experience.dateOfLeaving ? experience.dateOfLeaving.substring(0, 4) : 'Present'}
                </Text>
              </Box>
              <Box className="info-box">
                <Text className="experience-details-box-heading">Work Type</Text>
                <Text className="experience-details-box-text">{experience.worktype}</Text>
              </Box>
            </Box>
          </>
        ))}

        <div className="peer-exp-name">
          <p>Referees</p>
        </div>

        <Box className="add-peer-header work-header">
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text">Particular</Text>
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text">Remarks</Text>
        </Box>

        <Box className="added-peer-box">
          <Box className="added-peers added-peers-exp ">
            <Text className="peer-name title">Manoj Shinde</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name text-verified ">Approved</Text>
            <Text className="peer-name name-wrap">Abhishek is a very nice guy</Text>
          </Box>
          <Box className="added-peers added-peers-exp">
            <Text className="peer-name title">Nitin Prabhakar</Text>
            <Text className="peer-name">Test</Text>
            <Text className="peer-name text-verified ">Approved</Text>
            <Text className="peer-name name-wrap">
              Abhishek is a very nice guy and very hard working, but sometimes makes inappropriate jokes in office
            </Text>
          </Box>
        </Box>
        <div className="peer-exp-name">
          <p>Documents</p>
        </div>
        <Box className="folder-wrapper report-folder-wrapper">
          <Link to="" className="folder" target="_blank">
            <img src={pdfIcon} alt="PDF Icon" />
            <Text className="doc-name">TestTestTestTestTestTestTestTestTestTest</Text>
            {/* <p>Download</p> */}
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
