import React from 'react';
import { Text, Box, Title } from '@mantine/core';
import { useVerificationContext } from './context/VerificationContext';

import { OthersSpecificQuestions } from './components/OthersSpecificQuestions';
import { VerificationDisclaimer } from './components/VerificationDisclaimer';
import { VerificationQuestions } from './components/VerificationQuestions';
import { AttitudeVerification } from './components/AttitudeVerification';
import { CompleteVerification } from './components/CompleteVerification';
import { ProfileDetailsBox } from './components/ProfileDetailsBox';
import { VerifyAttributes } from './components/VerifyAttributes';
import { VerifyDocuments } from './components/VerifyDocuments';
import { VerifySkills } from './components/VerifySkills';
import { VerifyPeer } from './components/VerifyPeer';
import { Review } from './components/Review';
import { Navbar } from './components/Navbar';

import { HiMiniArrowLongLeft } from 'react-icons/hi2';
import './styles/global.scss';
import { useNavigate } from 'react-router-dom';

export const VerificationJourney: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { activeStep, peerVerified, totalSteps, setActiveStep, unverifiedLink, verificationData, verificationBy } =
    useVerificationContext();

  if (peerVerified) {
    navigate('/');
    return <></>;
  }

  const stepper = Array.from({ length: totalSteps - 1 }, (_, index) => index + 1);

  return (
    <>
      <Navbar />
      {activeStep === totalSteps ? (
        <CompleteVerification />
      ) : (
        <>
          {unverifiedLink !== 'NONE' && activeStep < 1 ? <VerifyPeer /> : <></>}
          {unverifiedLink === 'NONE' && verificationData.data ? (
            <main className="profile">
              <section className="container" style={{ marginTop: '7rem' }}>
                <Title className="verification-title">Background verification request</Title>
                <Box className="stepper-data-container">
                  <button
                    disabled={activeStep === 1}
                    className="stepper-back-btn"
                    onClick={() => setActiveStep((current) => current - 1)}
                  >
                    <HiMiniArrowLongLeft />
                  </button>
                  <Text className="steps">
                    Step {activeStep} of {totalSteps - 1}
                  </Text>
                </Box>
                <Box className="verification-progress-bar-wrapper">
                  {stepper.map((step, idx) => (
                    <Box key={idx} className="progress-bar" bg={step <= activeStep ? '#9fe870' : '#F3F3F3'}></Box>
                  ))}
                </Box>
                <ProfileDetailsBox />
                {activeStep === 1 ? <VerificationDisclaimer /> : <></>}
                {verificationBy === 'HR' ? (
                  <>
                    {activeStep === 2 || activeStep === 3 ? <OthersSpecificQuestions /> : <></>}
                    {activeStep === 4 ? <VerifyAttributes /> : <></>}
                    {activeStep === 5 ? (
                      <VerificationQuestions
                        question={
                          <>
                            Was the candidate's salary ₹{' '}
                            {Number(verificationData.data.selectedFields.salary).toLocaleString()} ?
                          </>
                        }
                        _id="salary"
                        parentKey="selectedFields"
                      />
                    ) : (
                      <></>
                    )}
                    {totalSteps === 10 ? (
                      <>
                        {activeStep === 6 ? (
                          <VerificationQuestions
                            question={<>Has the candidate completed the exit procedure?</>}
                            _id="exitProcedure"
                            parentKey="otherQuestions"
                          />
                        ) : (
                          <></>
                        )}
                        {activeStep === 7 ? (
                          <VerificationQuestions
                            question={<>Is the candidate eligible for rehire?</>}
                            _id="eligibleForRehire"
                            parentKey="otherQuestions"
                          />
                        ) : (
                          <></>
                        )}
                        {activeStep === 8 ? <AttitudeVerification /> : <></>}
                        {activeStep === 9 ? <Review /> : <></>}
                      </>
                    ) : totalSteps === 11 ? (
                      <>
                        {activeStep === 6 ? <VerifySkills /> : <></>}
                        {activeStep === 7 ? (
                          <VerificationQuestions
                            question={<>Has the candidate completed the exit procedure?</>}
                            _id="exitProcedure"
                            parentKey="otherQuestions"
                          />
                        ) : (
                          <></>
                        )}
                        {activeStep === 8 ? (
                          <VerificationQuestions
                            question={<>Is the candidate eligible for rehire?</>}
                            _id="eligibleForRehire"
                            parentKey="otherQuestions"
                          />
                        ) : (
                          <></>
                        )}
                        {activeStep === 9 ? <AttitudeVerification /> : <></>}
                        {activeStep === 10 ? <Review /> : <></>}
                      </>
                    ) : (
                      <>
                        {activeStep === 6 ? <VerifyDocuments /> : <></>}
                        {activeStep === 7 ? <VerifySkills /> : <></>}
                        {activeStep === 8 ? (
                          <VerificationQuestions
                            question={<>Has the candidate completed the exit procedure?</>}
                            _id="exitProcedure"
                            parentKey="otherQuestions"
                          />
                        ) : (
                          <></>
                        )}
                        {activeStep === 9 ? (
                          <VerificationQuestions
                            question={<>Is the candidate eligible for rehire?</>}
                            _id="eligibleForRehire"
                            parentKey="otherQuestions"
                          />
                        ) : (
                          <></>
                        )}
                        {activeStep === 10 ? <AttitudeVerification /> : <></>}
                        {activeStep === 11 ? <Review /> : <></>}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {activeStep === 2 || activeStep === 3 ? <OthersSpecificQuestions /> : <></>}
                    {activeStep === 4 ? <VerifyAttributes /> : <></>}
                    {verificationData.data.selectedFields.salary ? (
                      <>
                        {totalSteps === 8 ? (
                          <>
                            {activeStep === 5 ? (
                              <VerificationQuestions
                                question={
                                  <>
                                    Was the candidate's salary ₹{' '}
                                    {Number(verificationData.data.selectedFields.salary).toLocaleString()} ?
                                  </>
                                }
                                _id="salary"
                                parentKey="selectedFields"
                              />
                            ) : (
                              <></>
                            )}
                            {activeStep === 6 ? <AttitudeVerification /> : <></>}
                            {activeStep === 7 ? <Review /> : <></>}
                          </>
                        ) : totalSteps === 9 ? (
                          <>
                            {activeStep === 5 ? (
                              <VerificationQuestions
                                question={
                                  <>
                                    Was the candidate's salary ₹
                                    {Number(verificationData.data.selectedFields.salary).toLocaleString()} ?
                                  </>
                                }
                                _id="salary"
                                parentKey="selectedFields"
                              />
                            ) : (
                              <></>
                            )}
                            {activeStep === 6 ? <VerifySkills /> : <></>}
                            {activeStep === 7 ? <AttitudeVerification /> : <></>}
                            {activeStep === 8 ? <Review /> : <></>}
                          </>
                        ) : (
                          <>
                            {activeStep === 5 ? (
                              <VerificationQuestions
                                question={
                                  <>
                                    Was the candidate's salary ₹{' '}
                                    {Number(verificationData.data.selectedFields.salary).toLocaleString()} ?
                                  </>
                                }
                                _id="salary"
                                parentKey="selectedFields"
                              />
                            ) : (
                              <></>
                            )}
                            {activeStep === 6 ? <VerifyDocuments /> : <></>}
                            {activeStep === 7 ? <VerifySkills /> : <></>}
                            {activeStep === 8 ? <AttitudeVerification /> : <></>}
                            {activeStep === 9 ? <Review /> : <></>}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {totalSteps === 7 ? (
                          <>
                            {activeStep === 5 ? <AttitudeVerification /> : <></>}
                            {activeStep === 6 ? <Review /> : <></>}
                          </>
                        ) : totalSteps === 8 ? (
                          <>
                            {activeStep === 5 ? <VerifySkills /> : <></>}
                            {activeStep === 6 ? <AttitudeVerification /> : <></>}
                            {activeStep === 7 ? <Review /> : <></>}
                          </>
                        ) : (
                          <>
                            {activeStep === 5 ? <VerifyDocuments /> : <></>}
                            {activeStep === 6 ? <VerifySkills /> : <></>}
                            {activeStep === 7 ? <AttitudeVerification /> : <></>}
                            {activeStep === 8 ? <Review /> : <></>}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </section>
            </main>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};
