import React from 'react';
import { MdVerified } from 'react-icons/md';
import { Text, Box, Button } from '@mantine/core';
import { ReportTop } from './ReportTop';
import { CgSandClock } from 'react-icons/cg';
import './_report.scss';

interface ChildComponentProps {
  workExperienceDetails: WorkExperience[];
  peerDetails: WorkPeerReportResponse[];
}

export const WorkExperienceReport2: React.FC<ChildComponentProps> = ({ peerDetails, workExperienceDetails }) => {
  return (
    <>
      <main className="report-container">
        <ReportTop />

        <div className="disclaimer-box">
          <span className="disclaimer-text">Work Experience (Verification parameters)</span>
          {workExperienceDetails.map((experience, index) => (
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

              {peerDetails.map(
                (peer, i) =>
                  peer.ref == experience.id && (
                    <div key={i}>
                      <div className="peer-exp-name">
                        <p>{peer.name}</p>
                        <span>{peer.verificationBy}</span>
                      </div>

                      <Box className="add-peer-header add-peer-exp-header">
                        <Text className="add-peer-header-text">Attitude</Text>
                        <Text className="add-peer-header-text">Verified as</Text>
                        <Text className="add-peer-header-text">Verified on</Text>
                        <Text className="add-peer-header-text">Status</Text>
                        <Text className="add-peer-header-text">Remarks/Comments</Text>
                      </Box>
                      <Box className="added-peer-box">
                        <Box className="added-peers added-exp-peers">
                          <Text className="peer-name title">Candidate Company ID</Text>
                          <Text className="peer-name">{experience.companyId}</Text>
                          <Text className="peer-name">
                            {peer.updatedAt?.substring(0, 10).split('-').reverse().join('/')}
                          </Text>
                          <Text
                            className={`peer-name ${peer.isVerificationCompleted ? 'text-verified' : 'text-dispute'}`}
                          >
                            {peer.isVerificationCompleted ? 'Approved' : 'Pending'}
                          </Text>
                          <Text className="peer-name">
                            {peer.isVerificationCompleted ? 'Mobile,Phone No. and Email' : 'No Remarks'}
                          </Text>
                        </Box>
                        <Box className="added-peers added-exp-peers">
                          <Text className="peer-name title">Department</Text>
                          <Text className="peer-name">{experience.department}</Text>
                          <Text className="peer-name">
                            {peer.updatedAt?.substring(0, 10).split('-').reverse().join('/')}
                          </Text>
                          <Text
                            className={`peer-name ${peer.isVerificationCompleted ? 'text-verified' : 'text-dispute'}`}
                          >
                            {peer.isVerificationCompleted ? 'Approved' : 'Pending'}
                          </Text>
                          <Text className="peer-name">
                            {peer.isVerificationCompleted ? 'Mobile,Phone No. and Email' : 'No Remarks'}
                          </Text>
                        </Box>
                        <Box className="added-peers added-exp-peers">
                          <Text className="peer-name title">Designation at work</Text>
                          <Text className="peer-name">{experience.designation}</Text>
                          <Text className="peer-name">
                            {peer.updatedAt?.substring(0, 10).split('-').reverse().join('/')}
                          </Text>
                          <Text
                            className={`peer-name ${peer.isVerificationCompleted ? 'text-verified' : 'text-dispute'}`}
                          >
                            {peer.isVerificationCompleted ? 'Approved' : 'Pending'}
                          </Text>
                          <Text className="peer-name">
                            {peer.isVerificationCompleted ? 'Mobile,Phone No. and Email' : 'No Remarks'}
                          </Text>
                        </Box>
                        <Box className="added-peers added-exp-peers">
                          <Text className="peer-name title">Date of Joining</Text>
                          <Text className="peer-name">{experience.dateOfJoining?.substring(4, 15)}</Text>
                          <Text className="peer-name">
                            {peer.updatedAt?.substring(0, 10).split('-').reverse().join('/')}
                          </Text>
                          <Text
                            className={`peer-name ${peer.isVerificationCompleted ? 'text-verified' : 'text-dispute'}`}
                          >
                            {peer.isVerificationCompleted ? 'Approved' : 'Pending'}
                          </Text>
                          <Text className="peer-name">
                            {peer.isVerificationCompleted ? 'Mobile,Phone No. and Email' : 'No Remarks'}
                          </Text>
                        </Box>
                        <Box className="added-peers added-exp-peers">
                          <Text className="peer-name title">Date of Leaving</Text>
                          <Text className="peer-name">
                            {experience.dateOfLeaving?.substring(0, 10)
                              ? experience.dateOfLeaving?.substring(0, 10)
                              : 'Currently Working'}
                          </Text>
                          <Text className="peer-name">
                            {peer.updatedAt?.substring(0, 10).split('-').reverse().join('/')}
                          </Text>
                          <Text className="peer-name text-verified text-dispute">
                            {peer.isVerificationCompleted ? 'Approved' : 'Pending'}
                          </Text>
                          <Text className="peer-name">
                            {peer.isVerificationCompleted ? 'Mobile,Phone No. and Email' : 'No Remarks'}
                          </Text>
                        </Box>
                      </Box>
                    </div>
                  )
              )}
              <hr className="breakLine"></hr>
            </>
          ))}
        </div>
      </main>
    </>
  );
};
