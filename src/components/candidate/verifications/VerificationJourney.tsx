import React from 'react';
import './styles/global.scss';
import { Text, Box, Title } from '@mantine/core';
import { useVerificationContext } from './context/VerificationContext';
import { HiMiniArrowLongLeft } from 'react-icons/hi2';
import { VerifyPeer } from './components/VerifyPeer';
import { ProfileDetailsBox } from './components/ProfileDetailsBox';
import { VerifyAttributes } from './components/VerifyAttributes';
import { AttitudeVerification } from './components/AttitudeVerification';
import { CommonVerifications } from './components/CommonVerification';
import { Review } from './components/Review';
import { CompleteVerification } from './components/CompleteVerification';
import { OthersSpecificQuestions } from './components/OthersSpecificQuestions';

export const VerificationJourney: React.FC = (): JSX.Element => {
  const { activeStep, totalSteps, setActiveStep, unverifiedLink, verificationData, verificationBy } =
    useVerificationContext();
  const stepper = Array.from({ length: totalSteps - 1 }, (_, index) => index + 1);

  return (
    <>
      {activeStep === totalSteps ? (
        <CompleteVerification />
      ) : (
        <>
          {unverifiedLink !== 'NONE' && activeStep < 1 ? <VerifyPeer /> : <></>}
          {unverifiedLink === 'NONE' && verificationData ? (
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
                {activeStep === 1 ? <VerifyAttributes /> : <></>}
                {verificationBy === 'HR' ? (
                  <>
                    {activeStep === 2 ? <AttitudeVerification /> : <></>}
                    {activeStep === 3 || activeStep === 4 ? <CommonVerifications /> : <></>}
                    {activeStep === 5 ? <Review /> : <></>}
                  </>
                ) : (
                  <>
                    {activeStep === 2 || activeStep === 3 ? <OthersSpecificQuestions /> : <></>}
                    {activeStep === 4 || activeStep === 5 ? <CommonVerifications /> : <></>}
                    {activeStep === 6 ? <Review /> : <></>}
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
