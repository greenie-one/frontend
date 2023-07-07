import { Navbar } from '../../Profile/sections/Navbar';
import { Text, Box, Title } from '@mantine/core';
import { VBMStepOne, VBMStepTwo, VBMStepThree, VBMStepFour, VBMStepFive } from './components';
import { useVBMContext } from './context/VBMContext';
import './styles/global.scss';
import '../VerificationByHR/styles/global.scss';

export const VerifyByManager = () => {
  const { activeStep } = useVBMContext();
  return (
    <>
      <Navbar />

      <main className="profile">
        <section className="container" style={{ marginTop: '7rem' }}>
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
    </>
  );
};
