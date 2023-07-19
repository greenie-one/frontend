import { Box, Text, Title, Button, TextInput, createStyles, em } from '@mantine/core';
import { useVBMContext } from '../context/VBMContext';
import { useState, useEffect } from 'react';

export const VerifyPeer = () => {
  const { NextActiveStep } = useVBMContext();
  const { classes: inputClasses } = OtpInputStyles();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
    }, 1000);

    if (secondsRemaining === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [secondsRemaining]);
  return (
    <main className="profile">
      <Box className="container">
        {activeStep === 1 && (
          <Box className="address-verification-container">
            <Title className="address-verification-details-main-title">Please confirm the peer identity</Title>
            <Box className="address-verification-details">
              <Title className="address-verification-details-title">Peer name</Title>
              <Text className="address-verification-details-address">Peer Type</Text>
            </Box>

            <Button className="green-outline-btn" onClick={() => setActiveStep(activeStep + 1)}>
              Click to send OTP
            </Button>
            <Text className="address-verification-details-link">Not me</Text>
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <Box className="address-verification-container">
              <Title className="address-verification-details-main-title">Please confirm the peer identity</Title>
              <Box className="address-verification-details">
                <Title className="address-verification-details-title">Peer Name</Title>
                <Text className="address-verification-details-address">Peer type</Text>
              </Box>
              <Text className="address-verification-bold-title">Enter the one-time password sent to your Email.</Text>
              <Box className="input-section">
                <TextInput maxLength={6} classNames={inputClasses} />
              </Box>
              {secondsRemaining === 0 ? (
                <Button compact color="gray" variant="subtle" className="resendLink">
                  Resend
                </Button>
              ) : (
                <Text fw={'light'} fz={'xs'} my={'md'}>
                  Resend{' '}
                  <Text fw={'600'} span>
                    after {secondsRemaining}s
                  </Text>
                </Text>
              )}
              <Button className="primaryBtn" onClick={NextActiveStep}>
                Verify
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </main>
  );
};

const OtpInputStyles: OtpInputStylesType = createStyles(() => ({
  root: {
    position: 'relative',
    marginBlock: '12px',
  },

  input: {
    width: '458px',
    height: '68px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid #D1D4DB',
    lineHeight: '19px',
    letterSpacing: '24px',
    color: '#697082',

    '&:focus': {
      borderColor: 'green',
    },

    [`@media screen and (max-width: ${em(1024)})`]: {
      width: '350px',
      height: '46px',
      borderRadius: '6px',
      fontSize: '14px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },
}));
