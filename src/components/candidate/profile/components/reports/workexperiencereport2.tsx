import React from 'react';
import { MdVerified } from 'react-icons/md';
import { Text, Box, Button } from '@mantine/core';
import { ReportTop } from './ReportTop';
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
                  <p>Greenie Verified on 20/04/2023</p>
                  <Button leftIcon={<MdVerified color="#17A672" size={'16px'} />} className="verified report-verifybtn">
                    Verified
                  </Button>
                </div>
                <a href={experience.linkedInUrl} target="_blank" rel="noopener noreferrer">
                  <div className="residential-address-right">View Company profile</div>
                </a>
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
                          <Text className="peer-name">Test</Text>
                          <Text className="peer-name text-verified">Approved</Text>
                          <Text className="peer-name">Test</Text>
                        </Box>
                        <Box className="added-peers added-exp-peers">
                          <Text className="peer-name title">Department</Text>
                          <Text className="peer-name">{experience.department}</Text>
                          <Text className="peer-name">Test</Text>
                          <Text className="peer-name text-verified">Approved</Text>
                          <Text className="peer-name">Test</Text>
                        </Box>
                        <Box className="added-peers added-exp-peers">
                          <Text className="peer-name title">Designation at work</Text>
                          <Text className="peer-name">{experience.designation}</Text>
                          <Text className="peer-name">Test</Text>
                          <Text className="peer-name text-verified">Approved</Text>
                          <Text className="peer-name">Test</Text>
                        </Box>
                        <Box className="added-peers added-exp-peers">
                          <Text className="peer-name title">Date of Joining</Text>
                          <Text className="peer-name">{experience.dateOfJoining?.substring(4, 15)}</Text>
                          <Text className="peer-name">Test</Text>
                          <Text className="peer-name text-verified">Approved</Text>
                          <Text className="peer-name">Test</Text>
                        </Box>
                        <Box className="added-peers added-exp-peers">
                          <Text className="peer-name title">Date of Leaving</Text>
                          <Text className="peer-name">{experience.dateOfLeaving?.substring(0, 10)}</Text>
                          <Text className="peer-name">Test</Text>
                          <Text className="peer-name text-verified">Approved</Text>
                          <Text className="peer-name">Test</Text>
                        </Box>
                      </Box>
                    </div>
                  )
              )}
            </>
          ))}
        </div>
      </main>
    </>
  );
};
