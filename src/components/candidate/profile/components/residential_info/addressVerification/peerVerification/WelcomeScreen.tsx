import React from 'react';
import { Box, Title, Text, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';

type WelcomeScreenProps = {
  firstName: string;
  getPeerData: () => Promise<void>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  firstName,
  getPeerData,
  setCurrentStep,
}): JSX.Element => {
  const handleProceed = async () => {
    await getPeerData();
    setCurrentStep(0);
  };

  return (
    <>
      <Box className="container" style={{ marginTop: '8rem' }}>
        <Box className="address-verification-container">
          <Title className="address-verification-details-main-title">Welcome to</Title>
          <Box className="logo-box">
            <Text className="logo-text">Greenie</Text>
            <span className="logo-icon">
              <MdVerified />
            </span>
          </Box>
          <Text className="address-verification-dark-text">
            You have been chosen as a peer to verify address of <span>{firstName}</span>. Kindly be a valuable reference
            and help elevate their profile.
          </Text>
          <Button className="green-outline-btn" onClick={handleProceed}>
            Proceed
          </Button>
        </Box>
      </Box>
    </>
  );
};
