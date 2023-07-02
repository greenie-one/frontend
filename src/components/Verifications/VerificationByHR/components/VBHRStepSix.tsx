import { Text, Box, Button, em } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import ProfilePic from '../../../Profile/assets/johnMarston.png';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useVBHRContext } from '../context/VBHRContext';

export const VBHRStepSix = () => {
  const [exitPocedure, setExitProcedure] = useState('');
  const { NextActiveStep, PrevActiveStep } = useVBHRContext();

  const handleButtonClick = (feedback: string) => {
    setExitProcedure(feedback);
  };

  const handleNextStep = () => {
    if (exitPocedure !== '') {
      NextActiveStep();
    } else {
      notifications.show({
        id: 'load-data',
        title: 'Please select your answer !',
        message: 'Please give us your valuable feedback.',
        autoClose: 2200,
        withCloseButton: false,
        color: 'teal',
        sx: { borderRadius: em(8) },
      });
    }
  };
  return (
    <section className="verification-step">
      <Box className="profile-details-top">
        <Box className="candidate-profile">
          <img src={ProfilePic} alt="" />
        </Box>
        <Box className="profile-details-text-box">
          <Text className="name">Abhishek Deshmukh</Text>
          <Text className="designation">Software Engieer</Text>
          <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
            Verified
          </Button>
        </Box>
      </Box>
      <Text className="question-text">Has the candidate completed the exit procedure?</Text>
      <Box className="verification-attitude-wrapper">
        <Box
          className={exitPocedure === 'yes' ? 'attitude-box active' : 'attitude-box'}
          onClick={() => handleButtonClick('yes')}
        >
          <FiThumbsUp className="eligibility-icon" />
          <Text className="attitude-text">Yes</Text>
        </Box>
        <Box
          className={exitPocedure === 'no' ? 'attitude-box active' : 'attitude-box'}
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
