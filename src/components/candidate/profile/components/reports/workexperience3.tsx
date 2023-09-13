import React from 'react';
import { MdVerified } from 'react-icons/md';
import { BsLinkedin } from 'react-icons/bs';
import { CgSandClock } from 'react-icons/cg';
import { Text, Box, Button } from '@mantine/core';
import pdfIcon from '../../assets/pdfIcon.png';
import { ReportTop } from './ReportTop';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../utils/functions/showNotification';
import './_report.scss';
import { skillExpertiseDict } from '../../../constants/dictionaries';
import { WorkExperienceReport2 } from './workexperiencereport2';

type ChildComponentProps = {
  workExperienceDetails: WorkExperience[];
  peerDetails: WorkPeerReportResponse[];
  document: DocumentResponse[];
  skills: CandidateSkillType[];
};

const WorkPeerType: Record<string, string> = {
  LINE_MANAGER: 'Line Manager',
  REPORTING_MANAGER: 'Reporting Manager',
  HR: 'HR',
  COLLEAGUE: 'Colleague',
  CXO: 'CXO',
};

export const WorkExperienceReport3: React.FC<ChildComponentProps> = ({
  document,
  peerDetails,
  workExperienceDetails,
  skills,
}) => {
  const viewPDFDocument = async (requestURL: string): Promise<void> => {
    showLoadingNotification({ title: 'Please wait', message: '' });
    try {
      const res = await fetch(requestURL, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!res.ok) {
        const error = await res.json();
        showErrorNotification('SOMETHING_WENT_WRONG');
        throw new Error(JSON.stringify(error));
      }
      const file = await res.blob();
      const localFileURL = URL.createObjectURL(file);
      showSuccessNotification({ title: 'Success', message: '' });
      window.open(localFileURL, '_blank');
    } catch (err: unknown) {
      console.error('~ workexperience3.tsx ~ viewPDFDocument() ~ line 45 :', err);
    }
  };

  return (
    <>
      <main className="report-container">
        <ReportTop />

        <div className="disclaimer-box">
          <span className="disclaimer-text">Work Experience</span>
        </div>
        {workExperienceDetails.length > 0 ? (
          <>
            {workExperienceDetails.map((experience, index) => (
              <div key={index}>
                <div className="disclaimer-box">
                  <div className="residential-address residential-top ">
                    <div
                      style={{
                        border: '1px solid #e1e1e1',
                        minWidth: '16rem',
                        width: 'max-content',
                        padding: '1.5rem',
                        borderRadius: '15px',
                      }}
                      className="residential-address-left "
                    >
                      <p style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '5px' }} className="">
                        {experience.designation}
                      </p>
                      <p style={{ fontSize: '1rem', color: '#a3a3a3', fontWeight: 500, marginBottom: '10px' }}>
                        {experience.companyName}
                      </p>
                      {experience.noOfVerifications >= 2 ? (
                        <Button
                          style={{ border: '1px solid', borderRadius: '34px', padding: '2px 8px' }}
                          leftIcon={<MdVerified color="#17A672" size={'16px'} />}
                          className="verified report-verifybtn"
                        >
                          Verified
                        </Button>
                      ) : peerDetails.filter((peer) => peer.ref === experience.id).length > 0 ? (
                        <Button
                          style={{ border: '1px solid', borderRadius: '34px', padding: '2px 8px' }}
                          leftIcon={<CgSandClock size={'16px'} />}
                          className="pending report-verifybtn"
                        >
                          Pending
                        </Button>
                      ) : (
                        <Button
                          style={{ color: '#ff7272', border: '1px solid', borderRadius: '34px', padding: '2px 8px' }}
                          className="pending report-verifybtn"
                        >
                          Not Verified
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="location">
                  <p>About Company</p>
                  <div className="location-date">
                    <p>Last updated</p>
                    <p>{experience.updatedAt.substring(0, 10).split('-').reverse().join('-')}</p>
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
                    <Text className="experience-details-box-text">
                      {experience.companyId ? experience.companyId : '-'}
                    </Text>
                  </Box>
                  <Box className="info-box">
                    <Text className="experience-details-box-heading">LinkedIn</Text>
                    <Text className="experience-details-box-text">
                      {experience.linkedInUrl ? (
                        <a
                          style={{ textDecoration: 'underline' }}
                          href={experience.linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {experience.companyName}
                        </a>
                      ) : (
                        '-'
                      )}
                    </Text>
                  </Box>
                  <Box className="info-box">
                    <Text className="experience-details-box-heading">Tenure</Text>
                    <Text className="experience-details-box-text">
                      {experience.dateOfJoining.substring(0, 10).split('-').reverse().join('-')} -{' '}
                      {experience.dateOfLeaving
                        ? experience.dateOfLeaving.substring(0, 10).split('-').reverse().join('-')
                        : 'Present'}
                    </Text>
                  </Box>
                  <Box className="info-box">
                    <Text className="experience-details-box-heading">Work Type</Text>
                    <Text className="experience-details-box-text">{experience.workType}</Text>
                  </Box>
                </Box>
                <>
                  <div className="peer-exp-name">
                    <p>Documents</p>
                  </div>
                  {document.filter((doc) => doc.type === 'work' && doc.workExperience === experience.id).length > 0 ? (
                    <Box className="folder-wrapper report-folder-wrapper">
                      {document
                        .filter((doc) => doc.type === 'work' && doc.workExperience === experience.id)
                        .map((doc, i) => (
                          <div key={i} className="folder">
                            <img src={pdfIcon} alt="PDF Icon" />
                            <Text className="doc-name">
                              {doc.name.substring(0, 25)}
                              {doc.name.length > 25 && '...'}
                            </Text>
                            <button
                              style={{ textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9325rem' }}
                              onClick={() => viewPDFDocument(doc.privateUrl)}
                            >
                              View Document
                            </button>
                          </div>
                        ))}
                    </Box>
                  ) : (
                    <Box className="added-peer-box">
                      <Box style={{ borderRadius: '1rem', marginTop: '1rem' }} className="added-peers added-peers-exp ">
                        No Documents
                      </Box>
                    </Box>
                  )}
                </>
                <>
                  <div className="peer-exp-name">
                    <p>Skills</p>
                  </div>
                  {skills.filter((skill) => skill.workExperience === experience.id).length > 0 ? (
                    <Box className="folder-wrapper report-folder-wrapper">
                      {skills
                        .filter((skill) => skill.workExperience === experience.id)
                        .map((skill, i) => (
                          <div key={i} className="folder">
                            <Text className="experience-details-box-heading">{skill.skillName}</Text>
                            <Text
                              style={{
                                color: '#697082',
                                background: '#f4f4f4',
                                borderRadius: '34px',
                                padding: '4px 12px',
                                fontSize: '13px',
                                fontWeight: 500,
                                width: 'max-content',
                              }}
                              className="doc-name"
                            >
                              {skillExpertiseDict[skill.expertise]}
                            </Text>
                          </div>
                        ))}
                    </Box>
                  ) : (
                    <Box className="added-peer-box">
                      <Box style={{ borderRadius: '1rem', marginTop: '1rem' }} className="added-peers added-peers-exp ">
                        No Skill Added.
                      </Box>
                    </Box>
                  )}
                </>
                <div>
                  <div className="peer-exp-name">
                    <p>Referees</p>
                  </div>

                  {peerDetails.filter((peer) => peer.ref === experience.id).length > 0 ? (
                    <>
                      <Box
                        style={{ gridTemplateColumns: '1.5fr 0.75fr 1.5fr 0.75fr 1fr' }}
                        className="add-peer-header work-header"
                      >
                        <Text className="add-peer-header-text">Referee Name</Text>
                        <Text className="add-peer-header-text">Referee Type</Text>
                        <Text className="add-peer-header-text">Referee Details</Text>
                        <Text className="add-peer-header-text">Status</Text>
                        <Text className="add-peer-header-text">Remarks</Text>
                      </Box>
                      <Box className="added-peer-box">
                        {peerDetails
                          .filter((peer) => peer.ref === experience.id)
                          .map((peer, i) => (
                            <Box
                              style={{ gridTemplateColumns: '1.5fr 0.75fr 1.5fr 0.75fr 1fr' }}
                              key={i}
                              className="added-peers added-peers-exp "
                            >
                              <Text className="peer-name title">{peer.name}</Text>
                              <Text className="peer-name">{WorkPeerType[peer.verificationBy]}</Text>
                              <Text
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-start',
                                  gap: '10px',
                                }}
                                className="peer-name"
                              >
                                <span>
                                  Email:
                                  <br />
                                  <a href={`mailto:${peer.email}`}>{peer.email}</a>
                                </span>

                                <span>
                                  Phone:
                                  <br />
                                  <a href={`tel:+${peer.phone}`}>{peer.phone}</a>
                                </span>
                              </Text>
                              <Text
                                className={`peer-name ${peer.isVerificationCompleted ? 'text-verified' : 'pending'}`}
                                style={
                                  peer.isReal
                                    ? {
                                        color:
                                          peer.isReal.state === 'REJECTED'
                                            ? '#ff7272'
                                            : peer.isReal.state === 'ACCEPTED'
                                            ? '#17A672'
                                            : '#FAB005',
                                        border: '0',
                                        fontSize: '14px',
                                      }
                                    : { border: '0', fontSize: '14px' }
                                }
                              >
                                {peer.isReal
                                  ? peer.isReal.state === 'ACCEPTED'
                                    ? 'Approved'
                                    : peer.isReal.state === 'REJECTED'
                                    ? 'Rejected'
                                    : 'Pending'
                                  : peer.isVerificationCompleted
                                  ? 'Approved'
                                  : 'Pending'}
                              </Text>
                              <Text className="peer-name name-wrap">
                                {peer.isReal
                                  ? peer.isReal.state === 'REJECTED'
                                    ? `${peer.isReal.dispute_type}${
                                        peer.isReal.dispute_reason ? ` - ${peer.isReal.dispute_reason}` : ''
                                      }`
                                    : peer.allQuestions.review
                                  : peer.allQuestions.review}
                              </Text>
                            </Box>
                          ))}
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box className="add-peer-header work-header">
                        <Text className="add-peer-header-text">Referee Name</Text>
                        <Text className="add-peer-header-text">Referee Type</Text>
                        <Text className="add-peer-header-text">Status</Text>
                        <Text className="add-peer-header-text">Remarks</Text>
                      </Box>
                      <Box className="added-peer-box">
                        <Box className="added-peers added-peers-exp ">
                          <Text className="peer-name title">No Referee</Text>
                          <Text className="peer-name">-</Text>
                          <Text className={`peer-name`}>-</Text>
                          <Text className="peer-name name-wrap">-</Text>
                        </Box>
                      </Box>
                    </>
                  )}
                </div>
                <WorkExperienceReport2
                  documents={document}
                  workExperienceDetails={workExperienceDetails.filter((workEx) => workEx.id === experience.id)}
                  peerDetails={peerDetails}
                  skills={skills}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <Box className="added-peer-box">
              <Box
                style={{
                  height: '5rem',
                  borderRadius: '1rem',
                  fontWeight: '500',
                  marginTop: '1rem',
                  gridTemplateColumns: '1fr',
                  fontSize: '1rem',
                }}
                className="added-peers added-peers-exp "
              >
                No Work Experience Added
              </Box>
            </Box>
          </>
        )}
      </main>
    </>
  );
};
