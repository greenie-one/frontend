import React from 'react';
import { Button, Flex, Text } from '@mantine/core';
import GoogleLogo from '../assets/g-logo.png';

const GoogleButton = () => {
  return (
    <Button radius="xl" variant="default" fullWidth>
      <span style={{ width: '16px', marginInline: '0.25rem' }}>
        <img src={GoogleLogo} alt="Google" />
      </span>
      Contiue with Google
    </Button>
  );
};

export default GoogleButton;
