import React from 'react';
import { Box, Title, Text, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';

type WelcomeScreenProps = {
  firstName: string;
  getPeerData: () => Promise<void>;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ firstName, getPeerData }): JSX.Element => {
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
            <span>{firstName}</span> wants you to verify his address
          </Text>
          <Button className="green-outline-btn" onClick={getPeerData}>
            Proceed
          </Button>
        </Box>
      </Box>
    </>
  );
};
