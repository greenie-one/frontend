import React from 'react';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { Button, Text, Box } from '@mantine/core';
import { ReportTop } from './ReportTop';
import './_report.scss';
interface ChildComponentProps {
  workExperienceDetails: WorkExperience[];
  peerDetails: WorkPeerReportResponse[];
}

export const WorkExperienceReport1: React.FC<ChildComponentProps> = ({ peerDetails, workExperienceDetails }) => {
  return (
    <>
      <main className="report-container">
        <ReportTop />

        <div className="disclaimer-box">
          <span className="disclaimer-text">Work Experience (Verification parameters)</span>
          {workExperienceDetails.map((experience, index) => (
            <div key={index}>
              {peerDetails.map(
                (peer, i) =>
                  peer.ref == experience.id && (
                    <div key={i}>
                      <div className="residential-address">
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
                      <div className="location">
                        <p>Conduct report</p>
                        <div className="location-date">
                          <p>Last updated</p>
                          <p>{peer.updatedAt?.substring(0, 10).split('-').reverse().join('/')}</p>
                        </div>
                      </div>

                      <Box className="added-peer-box">
                        <Box className="add-peers">
                          <Box className="added-peers">
                            <Text className="peer-name title">Attitude</Text>
                            <Text className="peer-name">Moderately Collaborated</Text>
                            <Text className="peer-name">20/04/2023</Text>
                            <Text className="peer-name">Test</Text>
                          </Box>
                          <Box className="added-peers">
                            <Text className="peer-name title">Rehire eligibility</Text>
                            <Text className="peer-name">No</Text>
                            <Text className="peer-name">20/04/2023</Text>
                            <Text className="peer-name">Test</Text>
                          </Box>
                          <Box className="added-peers">
                            <Text className="peer-name title">Exit procedure</Text>
                            <Text className="peer-name">Completed</Text>
                            <Text className="peer-name">20/04/2023</Text>
                            <Text className="peer-name">Test</Text>
                          </Box>
                        </Box>
                      </Box>
                      <hr className="breakLine"></hr>
                    </div>
                  )
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
