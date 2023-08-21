import React from 'react';
import { MdVerified } from 'react-icons/md';
import { BsLinkedin } from 'react-icons/bs';
import { CgSandClock } from 'react-icons/cg';
import { Text, Box, Button } from '@mantine/core';
import pdfIcon from '../../assets/pdfIcon.png';
import { ReportTop } from './ReportTop';
import './_report.scss';

interface ChildComponentProps {
  workExperienceDetails: WorkExperience[];
  peerDetails: WorkPeerReportResponse[];
  document: DocumentResponse[];
}

export const WorkExperienceReport3: React.FC<ChildComponentProps> = ({
  document,
  peerDetails,
  workExperienceDetails,
}) => {
  return (
    <>
      <main className="report-container">
        <ReportTop />

        <div className="disclaimer-box">
          <span className="disclaimer-text">Work Experience</span>
        </div>

        {workExperienceDetails.map((experience, index) => (
          <div key={index}>
            <div className="disclaimer-box">
              <div className="residential-address residential-top ">
                <div className="residential-address-left ">
                  <p>{experience.companyName}</p>
                  {experience.noOfVerifications >= 2 ? (
                    <Button
                      leftIcon={<MdVerified color="#17A672" size={'16px'} />}
                      className="verified report-verifybtn"
                    >
                      Verified
                    </Button>
                  ) : (
                    <Button leftIcon={<CgSandClock size={'16px'} />} className="pending report-verifybtn">
                      Pending
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="location">
              <p>About Company</p>
              <div className="location-date">
                <p>Last updated</p>
                <p>{experience.updatedAt.substring(0, 10).split('-').reverse().join('/')}</p>
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
                <a href={experience?.linkedInUrl} target="_blank" rel="noopener noreferrer">
                  <Text className="experience-details-box-text">View Profile</Text>
                </a>
              </Box>
            </Box>
            <div className="location">
              <p>Basic Information</p>
            </div>
            <Box className="basic-info-box-wrapper work-wrapper">
              <Box className="info-box">
                <Text className="experience-details-box-heading">Company ID</Text>
                <Text className="experience-details-box-text">{experience.companyId ? experience.companyId : '-'}</Text>
              </Box>
              <Box className="info-box">
                <Text className="experience-details-box-heading">LinkedIn</Text>
                <Text className="experience-details-box-text">
                  {experience.linkedInUrl ? experience.linkedInUrl : '-'}
                </Text>
              </Box>
              <Box className="info-box">
                <Text className="experience-details-box-heading">Tenure</Text>
                <Text className="experience-details-box-text">
                  {experience.dateOfJoining.substring(4, 15)} -{' '}
                  {experience.dateOfLeaving ? experience.dateOfLeaving.substring(0, 4) : 'Present'}
                </Text>
              </Box>
              <Box className="info-box">
                <Text className="experience-details-box-heading">Work Type</Text>
                <Text className="experience-details-box-text">{experience.workType}</Text>
              </Box>
            </Box>
            {peerDetails.map(
              (peer, i) =>
                peer.ref == experience.id && (
                  <div key={i}>
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
                      {peerDetails.map((peer, i) => (
                        <Box key={i} className="added-peers added-peers-exp ">
                          <Text className="peer-name title">{peer.name}</Text>
                          <Text className="peer-name">{peer.verificationBy}</Text>
                          <Text
                            className={`peer-name ${peer.isVerificationCompleted ? 'text-verified' : 'text-dispute'}`}
                          >
                            {peer.isVerificationCompleted ? 'Approved' : 'Not Approved'}
                          </Text>
                          <Text className="peer-name name-wrap">{peer.allQuestions.review}</Text>
                        </Box>
                      ))}
                    </Box>
                  </div>
                )
            )}
            <hr className="breakLine"></hr>
          </div>
        ))}

        <div className="peer-exp-name">
          <p>Documents</p>
        </div>
        <Box className="folder-wrapper report-folder-wrapper">
          {document.map((doc, i) => (
            <div key={i} className="folder">
              <div className="folder-flex">
                <img src={pdfIcon} alt="PDF Icon" />
                <Text className="doc-name">{doc.name}</Text>
              </div>
              <a href={doc.privateUrl} className="download-btn">
                Download
              </a>
              {/* <p>Download</p> */}
            </div>
          ))}
        </Box>
      </main>
    </>
  );
};
