import React from 'react';
import { MdVerified } from 'react-icons/md';
import { Text, Box, Button } from '@mantine/core';
import { ReportTop } from './ReportTop';
import { CgSandClock } from 'react-icons/cg';
import './_report.scss';
import { optionalAttrDict } from '../../../constants/dictionaries';

type ChildComponentProps = {
  workExperienceDetails: WorkExperience[];
  peerDetails: WorkPeerReportResponse[];
};

const WorkPeerType: Record<string, string> = {
  LINE_MANAGER: 'Line Manager',
  REPORTING_MANAGER: 'Reporting Manager',
  HR: 'HR',
  COLLEAGUE: 'Colleague',
  CXO: 'CXO',
};

const allQuestionsParticulars: Record<string, string> = {
  attitudeRating: 'Attitude Rating',
  designation: 'Designation',
  peerPost: 'Referee Post',
  review: 'Review',
};

export const WorkExperienceReport2: React.FC<ChildComponentProps> = ({ peerDetails, workExperienceDetails }) => {
  return (
    <>
      <main className="report-container">
        <ReportTop />

        <div className="disclaimer-box">
          <span className="disclaimer-text">Work Experience (Verification Parameters)</span>
          {workExperienceDetails.length > 0 ? (
            <>
              {' '}
              {workExperienceDetails.map((experience, index) => {
                if (peerDetails.filter((peer) => peer.ref === experience.id).length > 0) {
                  return (
                    <React.Fragment key={index}>
                      <>
                        <div key={index} className="residential-address">
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

                        {peerDetails.map((peer, i) => {
                          return (
                            peer.ref == experience.id && (
                              <React.Fragment key={i}>
                                <div>
                                  <div className="peer-exp-name">
                                    <p>{peer.name}</p>
                                    <span>
                                      {WorkPeerType[peer.verificationBy]} (Peer{i + 1})
                                    </span>
                                  </div>
                                  {peer.selectedFields ? (
                                    <React.Fragment>
                                      <Box className="add-peer-header add-peer-exp-header">
                                        <Text className="add-peer-header-text">Particular</Text>
                                        <Text className="add-peer-header-text">Verified As</Text>
                                        <Text className="add-peer-header-text">Verified On</Text>
                                        <Text className="add-peer-header-text">Status</Text>
                                        <Text className="add-peer-header-text">Remarks</Text>
                                      </Box>
                                      <Box className="added-peer-box">
                                        {Object.keys(peer.selectedFields).map((field, idx) => {
                                          return (
                                            <Box key={idx} className="added-peers added-exp-peers">
                                              <Text className="peer-name title">{optionalAttrDict[field]}</Text>
                                              <Text className="peer-name">
                                                {field === 'dateOfJoining' || field === 'dateOfLeaving'
                                                  ? String(experience[field as keyof WorkExperience])
                                                      .substring(0, 10)
                                                      .split('-')
                                                      .reverse()
                                                      .join('-')
                                                  : experience[field as keyof WorkExperience]}
                                              </Text>
                                              <Text className="peer-name">
                                                {peer.isVerificationCompleted
                                                  ? peer.updatedAt?.substring(0, 10).split('-').reverse().join('-')
                                                  : '-'}
                                              </Text>
                                              <Text
                                                className={`peer-name ${
                                                  peer.selectedFields[field].state === 'ACCEPTED'
                                                    ? 'text-verified'
                                                    : 'text-dispute'
                                                }`}
                                              >
                                                {peer.selectedFields[field].state === 'ACCEPTED'
                                                  ? 'Approved'
                                                  : peer.selectedFields[field].state === 'REJECTED'
                                                  ? 'Disputed'
                                                  : 'Pending'}
                                              </Text>
                                              <Text className="peer-name">
                                                {peer.selectedFields[field].state === 'REJECTED'
                                                  ? `${peer.selectedFields[field].dispute_type} - ${peer.selectedFields[field].dispute_reason}`
                                                  : 'No Remarks'}
                                              </Text>
                                            </Box>
                                          );
                                        })}
                                      </Box>
                                    </React.Fragment>
                                  ) : (
                                    <React.Fragment></React.Fragment>
                                  )}
                                </div>
                                <div>
                                  <div
                                    style={{ marginTop: peer.selectedFields ? '4rem' : '2rem' }}
                                    className="location"
                                  >
                                    <p>Conduct report</p>
                                    <div className="location-date">
                                      <p>Last updated</p>
                                      <p>{peer.updatedAt?.substring(0, 10).split('-').reverse().join('-')}</p>
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
                                      {Object.keys(peer.allQuestions).map((question, idx) => {
                                        if (question === 'attitudeRating' || question === 'review') {
                                          return (
                                            <Box key={idx} className="added-peers">
                                              <Text className="peer-name title">
                                                {allQuestionsParticulars[question]}
                                              </Text>
                                              <Text style={{ textTransform: 'capitalize' }} className="peer-name">
                                                {peer.allQuestions[question] === 'not-given'
                                                  ? 'Not Given'
                                                  : peer.allQuestions[question].split('-').join(' ')}
                                              </Text>
                                              <Text className="peer-name">
                                                {peer.isVerificationCompleted
                                                  ? peer.updatedAt?.substring(0, 10).split('-').reverse().join('-')
                                                  : '-'}
                                              </Text>
                                              <Text className="peer-name">No Remarks</Text>
                                            </Box>
                                          );
                                        } else {
                                          return (
                                            <Box key={idx} className="added-peers">
                                              <Text className="peer-name title">
                                                {allQuestionsParticulars[question]}
                                              </Text>
                                              <Text className="peer-name">
                                                {question === 'peerPost'
                                                  ? WorkPeerType[peer.verificationBy]
                                                  : experience[question as keyof WorkExperience]}
                                              </Text>
                                              <Text className="peer-name">
                                                {peer.isVerificationCompleted
                                                  ? peer.updatedAt?.substring(0, 10).split('-').reverse().join('-')
                                                  : '-'}
                                              </Text>
                                              <Text className="peer-name">
                                                {peer.allQuestions[question].state === 'DISPUTED'
                                                  ? `${peer.allQuestions[question].dispute_type} - ${peer.allQuestions[question].dispute_reason}`
                                                  : 'No Remarks'}
                                              </Text>
                                            </Box>
                                          );
                                        }
                                      })}
                                    </Box>
                                  </Box>
                                  <hr className="breakLine"></hr>
                                </div>
                              </React.Fragment>
                            )
                          );
                        })}
                      </>
                    </React.Fragment>
                  );
                } else {
                  return <React.Fragment key={index}></React.Fragment>;
                }
              })}
            </>
          ) : (
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
          )}
        </div>
      </main>
    </>
  );
};
