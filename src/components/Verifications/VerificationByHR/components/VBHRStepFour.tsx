import { useState } from 'react';
import { Text, Box, Button, em } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import ProfilePic from '../../../Profile/assets/johnMarston.png';
import { BsEmojiFrown, BsEmojiNeutral, BsEmojiSmile, BsEmojiLaughing } from 'react-icons/bs';
import { useVBHRContext } from '../context/VBHRContext';
import { notifications } from '@mantine/notifications';

export const VBHRStepFour = () => {
  const [attitude, setAttitude] = useState('');
  const { NextActiveStep, PrevActiveStep } = useVBHRContext();

  const handleButtonClick = (feedback: string) => {
    setAttitude(feedback);
  };

  const handleNextStep = () => {
    if (attitude !== '') {
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
      <Text className="question-text">
        Rate attitude of Candidate 0 least Collaborative, 5 Highly Collaborative
      </Text>
      <Box className="verification-attitude-wrapper">
        <Box
          className={attitude === 'Non-Collaborative' ? 'attitude-box active' : 'attitude-box'}
          onClick={() => handleButtonClick('Non-Collaborative')}
        >
          <BsEmojiFrown />
          <Text className="attitude-text">Non-Collaborative</Text>
        </Box>
        <Box
          className={attitude === 'Rarely Collaborative' ? 'attitude-box active' : 'attitude-box'}
          onClick={() => handleButtonClick('Rarely Collaborative')}
        >
          <BsEmojiNeutral />
          <Text className="attitude-text">Rarely Collaborative</Text>
        </Box>
        <Box
          className={
            attitude === 'Occasionally Collaborative' ? 'attitude-box active' : 'attitude-box'
          }
          onClick={() => handleButtonClick('Occasionally Collaborative')}
        >
          <BsEmojiSmile />
          <Text className="attitude-text">Occasionally Collaborative</Text>
        </Box>
      </Box>
      <Box className="verification-attitude-wrapper">
        <Box
          className={
            attitude === 'Moderately Collaborative' ? 'attitude-box active' : 'attitude-box'
          }
          onClick={() => handleButtonClick('Moderately Collaborative')}
        >
          <BsEmojiSmile />
          <Text className="attitude-text">Moderately Collaborative</Text>
        </Box>
        <Box
          className={attitude === 'Highly Collaborative' ? 'attitude-box active' : 'attitude-box'}
          onClick={() => handleButtonClick('Highly Collaborative')}
        >
          <BsEmojiLaughing />
          <Text className="attitude-text">Highly Collaborative</Text>
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
        I understand that during the sign-up process and while using this website, I may be required
        to provide certain personal information, including but not limited to my name, email
        address, contact details, and any other information deemed necessary for registration and
        website usage.
      </Text>
      <Text className="policy">Click to view Data and Privacy Policy</Text>
    </section>
  );
};
