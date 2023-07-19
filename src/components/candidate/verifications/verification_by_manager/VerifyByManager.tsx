import { Text, Box, Title } from '@mantine/core';

import { VBMStepOne, VBMStepTwo, VBMStepThree, VBMStepFour, VBMStepFive, VerifyPeer, VBMLastStep } from './components';
import { useVBMContext } from './context/VBMContext';
import './styles/global.scss';
import '../verification_by_hr/styles/global.scss';
import { Navbar } from '../../../common/Navbar';

export const VerifyByManager = () => {
  const { activeStep } = useVBMContext();

  return (
    <>
      <Navbar />
      {activeStep === 0 && <VerifyPeer />}
      {activeStep === 6 && <VBMLastStep />}

      {activeStep < 6 && activeStep > 0 && (
        <main className="profile">
          <section className="container">
            <Title className="verification-title">Background verification request</Title>
            <Box className="verification-progress-bar-wrapper-manager">
              <Box className="progress-bar" bg={'#9fe870'}></Box>
              <Box className="progress-bar" bg={activeStep > 1 ? '#9fe870' : '#F3F3F3'}></Box>
              <Box className="progress-bar" bg={activeStep > 2 ? '#9fe870' : '#F3F3F3'}></Box>
              <Box className="progress-bar" bg={activeStep > 3 ? '#9fe870' : '#F3F3F3'}></Box>
              <Box className="progress-bar" bg={activeStep > 4 ? '#9fe870' : '#F3F3F3'}></Box>
            </Box>
            <Text className="steps">Step {activeStep}/5</Text>
            {activeStep === 1 && <VBMStepOne />}
            {activeStep === 2 && <VBMStepTwo />}
            {activeStep === 3 && <VBMStepThree />}
            {activeStep === 4 && <VBMStepFour />}
            {activeStep === 5 && <VBMStepFive />}
          </section>
        </main>
      )}
    </>
  );
};
