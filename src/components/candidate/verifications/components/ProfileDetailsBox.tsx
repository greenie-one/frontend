import React from 'react';
import { Text, Box, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { useVerificationContext } from '../context/VerificationContext';

export const ProfileDetailsBox: React.FC = (): JSX.Element => {
  const { verificationData } = useVerificationContext();
  const { data } = verificationData;

  return (
    <Box className="profile-details-top">
      <Box className="candidate-profile">
        <img src={data.profilePic} alt={data.name} />
      </Box>
      <Box className="profile-details-text-box">
        <Text className="name">{data.name}</Text>
        <Text className="designation">Software Engieer</Text>
        <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
          Verified
        </Button>
      </Box>
    </Box>
  );
};
