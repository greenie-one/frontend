import React from 'react';
import { Button, Flex, Text } from '@mantine/core';
import GoogleLogo from '../assets/g-logo.png';
import '../styles/global.scss';

const GoogleButton = () => {
  return (
    <Button className="secondaryBtn">
      <span>
        <img src={GoogleLogo} alt="Google" />
      </span>
      Contiue with Google
    </Button>
  );
};

export default GoogleButton;
