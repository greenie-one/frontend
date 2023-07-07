import { Text, Box, Button } from '@mantine/core';
import { useVBHRContext } from '../context/VBHRContext';
import { useState } from 'react';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { ProfileDetailsBox } from './ProfileDetailsBox';

export const VBHRStepFive = () => {
  const [rehire, setRehire] = useState('');
  const { NextActiveStep, PrevActiveStep } = useVBHRContext();

  const handleButtonClick = (feedback: string) => {
    setRehire(feedback);
  };

  const handleNextStep = () => {
    if (rehire !== '') {
      NextActiveStep();
    }
  };
  return (
    <section className="verification-step">
      <ProfileDetailsBox />
      <Text className="question-text">Is the candidate eligible for rehire</Text>
      <Box className="verification-attitude-wrapper">
        <Box
          className={rehire === 'yes' ? 'attitude-box active' : 'attitude-box'}
          onClick={() => handleButtonClick('yes')}
        >
          <FiThumbsUp className="eligibility-icon" />
          <Text className="attitude-text">Yes</Text>
        </Box>
        <Box
          className={rehire === 'no' ? 'attitude-box active' : 'attitude-box'}
          onClick={() => handleButtonClick('no')}
        >
          <FiThumbsDown className="eligibility-icon" />
          <Text className="attitude-text">No</Text>
        </Box>
      </Box>
      <Box className="profile-details-actions" my={'1rem'}>
        <Button className="dispute-btn" onClick={PrevActiveStep}>
          Back
        </Button>
        <Button className="green-outline-btn" onClick={handleNextStep}>
          Next
        </Button>
      </Box>
      <Text className="verification-disclaimer">
        I understand that during the sign-up process and while using this website, I may be required to provide certain
        personal information, including but not limited to my name, email address, contact details, and any other
        information deemed necessary for registration and website usage.
      </Text>
      <Text className="policy">Click to view Data and Privacy Policy</Text>
    </section>
  );
};
