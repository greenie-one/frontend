import React from 'react';
// import { MdVerified } from 'react-icons/md';
import { Text, Box } from '@mantine/core';
// import { CgSandClock } from 'react-icons/cg';
import './_report.scss';
import { optionalAttrDict, skillExpertiseDict } from '../../../constants/dictionaries';

type ChildComponentProps = {
  workExperienceDetails: WorkExperience[];
  peerDetails: WorkPeerReportResponse[];
  skills: CandidateSkillType[];
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

export const WorkExperienceReport2: React.FC<ChildComponentProps> = ({
  skills,
  peerDetails,
  workExperienceDetails,
}) => {
  console.log(workExperienceDetails);

  return (
    <>
      <div className="">
        <>
          {workExperienceDetails.map((experience, index) => {
            if (peerDetails.filter((peer) => peer.ref === experience.id).length > 0) {
              return (
                <React.Fragment key={index}>
                  <>
                    {peerDetails
                      .filter((peer) => peer.ref === experience.id)
                      .map((peer, i) => {
                        return (
                          <React.Fragment key={i}>
                            <div>
                              <div className="peer-exp-name">
                                <p>{peer.name}</p>
                                <span>
                                  {WorkPeerType[peer.verificationBy]} (Peer {i + 1})
                                </span>
                              </div>

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
                                        style={{
                                          color:
                                            peer.isReal.state === 'REJECTED'
                                              ? '#ff7272'
                                              : peer.isReal.state === 'ACCEPTED'
                                              ? '#17A672'
                                              : '#FAB005',
                                        }}
                                        className={`peer-name ${
                                          peer.selectedFields[field].state === 'ACCEPTED'
                                            ? 'text-verified'
                                            : 'text-dispute'
                                        }`}
                                      >
                                        {peer.isReal.state === 'ACCEPTED'
                                          ? `${
                                              peer.selectedFields[field].state === 'ACCEPTED' ? 'Approved' : 'Disputed'
                                            }`
                                          : peer.isReal.state === 'REJECTED'
                                          ? 'Rejected'
                                          : 'Pending'}
                                      </Text>
                                      <Text className="peer-name">
                                        {peer.isReal.state === 'REJECTED'
                                          ? 'Verification Rejected By Peer'
                                          : peer.isReal.state === 'PENDING'
                                          ? 'Verification Pending'
                                          : peer.selectedFields[field].state === 'REJECTED'
                                          ? `${peer.selectedFields[field].dispute_type} - ${peer.selectedFields[field].dispute_reason}`
                                          : 'No Remarks'}
                                      </Text>
                                    </Box>
                                  );
                                })}
                              </Box>
                            </div>

                            <div>
                              <div className="location">
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
                                          <Text className="peer-name title">{allQuestionsParticulars[question]}</Text>
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
                                          <Text className="peer-name title">{allQuestionsParticulars[question]}</Text>
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
                                            {peer.isReal.state === 'REJECTED'
                                              ? 'Verification Rejected By Peer'
                                              : peer.isReal.state === 'PENDING'
                                              ? 'Verification Pending'
                                              : peer.allQuestions[question].state === 'DISPUTED'
                                              ? `${peer.allQuestions[question].dispute_type} - ${peer.allQuestions[question].dispute_reason}`
                                              : 'No Remarks'}
                                          </Text>
                                        </Box>
                                      );
                                    }
                                  })}
                                </Box>
                              </Box>
                              <div>
                                <div className="peer-exp-name">
                                  <p>Skills</p>
                                </div>

                                {peer.skills.length > 0 ? (
                                  <>
                                    <Box className="add-peer-header add-peer-exp-header">
                                      <Text className="add-peer-header-text">Skill</Text>
                                      <Text className="add-peer-header-text">Expertise</Text>
                                      <Text className="add-peer-header-text">Verified On</Text>
                                      <Text className="add-peer-header-text">Status</Text>
                                      <Text className="add-peer-header-text">Remarks</Text>
                                    </Box>
                                    <Box className="added-peer-box">
                                      {peer.skills.map((skill, idx) => {
                                        const currentSkill =
                                          skills.find((_skill) => _skill._id === skill.id) ||
                                          ({} as CandidateSkillType);
                                        return (
                                          <Box key={idx} className="added-peers added-exp-peers">
                                            <Text className="peer-name title">{currentSkill.skillName}</Text>
                                            <Text className="peer-name">
                                              {skillExpertiseDict[currentSkill.expertise]}
                                            </Text>
                                            <Text className="peer-name">
                                              {peer.isVerificationCompleted
                                                ? peer.updatedAt?.substring(0, 10).split('-').reverse().join('-')
                                                : '-'}
                                            </Text>
                                            <Text
                                              style={{
                                                color:
                                                  peer.isReal.state === 'REJECTED'
                                                    ? '#ff7272'
                                                    : peer.isReal.state === 'ACCEPTED'
                                                    ? '#17A672'
                                                    : '#FAB005',
                                              }}
                                              className={`peer-name ${
                                                skill.status.state === 'ACCEPTED' ? 'text-verified' : 'text-dispute'
                                              }`}
                                            >
                                              {peer.isReal.state === 'ACCEPTED'
                                                ? `${skill.status.state === 'ACCEPTED' ? 'Approved' : 'Disputed'}`
                                                : peer.isReal.state === 'REJECTED'
                                                ? 'Rejected'
                                                : 'Pending'}
                                            </Text>
                                            <Text className="peer-name">
                                              {peer.isReal.state === 'REJECTED'
                                                ? 'Verification Rejected By Peer'
                                                : peer.isReal.state === 'PENDING'
                                                ? 'Verification Pending'
                                                : skill.status.state === 'REJECTED'
                                                ? `${skill.status.dispute_type} - ${skill.status.dispute_reason}`
                                                : 'No Remarks'}
                                            </Text>
                                          </Box>
                                        );
                                      })}
                                    </Box>
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
                                        No Skill Added
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </div>
                              <hr className="breakLine"></hr>
                            </div>
                          </React.Fragment>
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
      </div>
    </>
  );
};
