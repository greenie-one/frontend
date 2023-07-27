import React from 'react';
import { Text, Box, Button } from '@mantine/core';
import { CgSandClock } from 'react-icons/cg';
import { useVerificationContext } from '../context/VerificationContext';
import dummyProfilePic from '../../profile/assets/emptyProfile.png';

export const ProfileDetailsBox: React.FC = (): JSX.Element => {
  const { verificationData } = useVerificationContext();
  const { data } = verificationData;

  if (!data) {
    return <></>;
  }

  return (
    <Box className="profile-details-top">
      <Box className="candidate-profile">
        <img src={data.profilePic ? data.profilePic : dummyProfilePic} alt={data.name} />
      </Box>
      <Box className="profile-details-text-box">
        <Text className="name">{data.name}</Text>
        <Button leftIcon={<CgSandClock size={'16px'} />} className="pending">
          Pending
        </Button>
      </Box>
    </Box>
  );
};
