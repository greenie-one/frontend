import { useState } from 'react';
import { Text, Box, Button, Textarea } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import ProfilePic from '../../../Profile/assets/johnMarston.png';

export const VBMStepFive = () => {
  const [review, setReview] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const wordCount = inputValue.trim().split(' ').length;
    if (wordCount <= 150) {
      setReview(inputValue);
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
      <Text className="question-text" w={'70%'}>
        Thank you, could you please provide your best regards by crafting an exceptional review for your esteemed peer
      </Text>
      <Box className="text-area-box">
        <Textarea
          value={review}
          onChange={handleInputChange}
          placeholder="Write a review to help your peer get his dream job"
          className="text-area"
        />
        <Text className="word-limit">{review.trim().split(' ').length} / 150 words</Text>
      </Box>

      <Button className="green-outline-btn">End Verification</Button>
      <Text className="verification-disclaimer">
        I understand that during the sign-up process and while using this website, I may be required to provide certain
        personal information, including but not limited to my name, email address, contact details, and any other
        information deemed necessary for registration and website usage.
      </Text>
      <Text className="policy">Click to view Data and Privacy Policy</Text>
    </section>
  );
};
