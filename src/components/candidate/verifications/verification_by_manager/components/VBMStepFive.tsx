import { useState } from 'react';
import { Text, Box, Button, Textarea } from '@mantine/core';
import { ProfileDetailsBox } from '../../verification_by_hr/components';
import { DisclaimerText } from './DisclaimerText';
import { useVBMContext } from '../context/VBMContext';
import { PolicyText } from './PolicyText';

export const VBMStepFive = () => {
  const [review, setReview] = useState<string>('');
  const { NextActiveStep } = useVBMContext();

  const handleSubmit = () => {
    NextActiveStep();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const wordCount = inputValue.trim().split(' ').length;
    if (wordCount <= 150) {
      setReview(inputValue);
    }
  };
  return (
    <section className="verification-step">
      <ProfileDetailsBox />
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

      <Button className="green-outline-btn" onClick={handleSubmit}>
        End Verification
      </Button>
      <DisclaimerText />
      <PolicyText />
    </section>
  );
};
