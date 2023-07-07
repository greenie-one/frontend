import { Navbar } from '../../Profile/sections/Navbar';
import { Text, Box, Title } from '@mantine/core';
import {
  VBHRStepOne,
  VBHRStepTwo,
  VBHRStepThree,
  VBHRStepFour,
  VBHRStepFive,
  VBHRStepSix,
  VBHRStepSeven,
} from './components';
import './styles/global.scss';
import { useVBHRContext } from './context/VBHRContext';

export const VerifyByHR = () => {
  const { activeStep } = useVBHRContext();
  return (
    <>
      <Navbar />

      <main className="profile">
        <section className="container" style={{ marginTop: '7rem' }}>
          <Title className="verification-title">Background verification request</Title>
          <Box className="verification-progress-bar-wrapper">
            <Box className="progress-bar" bg={'#9fe870'}></Box>
            <Box className="progress-bar" bg={activeStep > 1 ? '#9fe870' : '#F3F3F3'}></Box>
            <Box className="progress-bar" bg={activeStep > 2 ? '#9fe870' : '#F3F3F3'}></Box>
            <Box className="progress-bar" bg={activeStep > 3 ? '#9fe870' : '#F3F3F3'}></Box>
            <Box className="progress-bar" bg={activeStep > 4 ? '#9fe870' : '#F3F3F3'}></Box>
            <Box className="progress-bar" bg={activeStep > 5 ? '#9fe870' : '#F3F3F3'}></Box>
            <Box className="progress-bar" bg={activeStep > 6 ? '#9fe870' : '#F3F3F3'}></Box>
          </Box>
          <Text className="steps">Step {activeStep}/7</Text>
          {activeStep === 1 && <VBHRStepOne />}
          {activeStep === 2 && <VBHRStepTwo />}
          {activeStep === 3 && <VBHRStepThree />}
          {activeStep === 4 && <VBHRStepFour />}
          {activeStep === 5 && <VBHRStepFive />}
          {activeStep === 6 && <VBHRStepSix />}
          {activeStep === 7 && <VBHRStepSeven />}
        </section>
      </main>
    </>
  );
};
