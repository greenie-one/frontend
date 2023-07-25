import React, { useState } from 'react';
import { Box, Button, Text } from '@mantine/core';
import { BsEmojiFrown, BsEmojiNeutral, BsEmojiSmile, BsEmojiLaughing } from 'react-icons/bs';
import { useVerificationContext } from '../context/VerificationContext';
import { IconType } from 'react-icons/lib';

const ratingValuesUpper: Array<{ value: string; label: string; emoji: IconType }> = [
  { value: 'highly-collaborative', label: 'Highly Collaborative', emoji: BsEmojiLaughing },
  { value: 'moderately-collaborative', label: 'Moderately Collaborative', emoji: BsEmojiSmile },
  { value: 'occasionally-collaborative', label: 'Occasionally Collaborative', emoji: BsEmojiSmile },
];
const ratingValuesLower: Array<{ value: string; label: string; emoji: IconType }> = [
  { value: 'rarely-collaborative', label: 'Rarely Collaborative', emoji: BsEmojiNeutral },
  { value: 'non-collaborative', label: 'Non-Collaborative', emoji: BsEmojiFrown },
];

export const AttitudeVerification: React.FC = (): JSX.Element => {
  const { setActiveStep, verificationResponse, setVerificationResponse } = useVerificationContext();
  const [attitude, setAttitude] = useState<string>('');

  const verificationHandler = () => {
    if (!attitude) return;

    const responseData: { attitudeRating: string } = {
      attitudeRating: attitude,
    };

    setVerificationResponse({
      ...verificationResponse,
      allQuestions: { ...verificationResponse.allQuestions, ...responseData },
    });

    setActiveStep((current) => current + 1);
  };

  return (
    <section className="verification-step">
      <Text className="question-text">
        Rate attitude of Candidate (0 - least Collaborative, 5 - Highly Collaborative)
      </Text>
      <Box className="verification-attitude-wrapper">
        {ratingValuesUpper.map((rating, idx) => {
          const Emoji = rating.emoji;
          return (
            <Box
              key={idx}
              className={attitude === rating.value ? 'attitude-box active' : 'attitude-box'}
              onClick={() => setAttitude(rating.value)}
            >
              <Emoji />
              <Text className="attitude-text">{rating.label}</Text>
            </Box>
          );
        })}
      </Box>
      <Box className="verification-attitude-wrapper">
        {ratingValuesLower.map((rating, idx) => {
          const Emoji = rating.emoji;
          return (
            <Box
              key={idx}
              className={attitude === rating.value ? 'attitude-box active' : 'attitude-box'}
              onClick={() => setAttitude(rating.value)}
            >
              <Emoji />
              <Text className="attitude-text">{rating.label}</Text>
            </Box>
          );
        })}
      </Box>
      <Box className="verification-btns-wrapper">
        <Button className="green-btn" onClick={verificationHandler}>
          Continue
        </Button>
      </Box>
    </section>
  );
};
