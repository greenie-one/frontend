import { useState, useEffect } from 'react';
import { Navbar } from '../../profile/components/Navbar';
import {
  Text,
  Box,
  Title,
  Button,
  TextInput,
  createStyles,
  em,
  UseStylesOptions,
  MantineTheme,
  Modal,
} from '@mantine/core';
import './styles/global.scss';
import johnMarston from '../../../candidate/profile/assets/johnMarston.png';
import { MdVerified } from 'react-icons/md';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import checkGif from '../../profile/assets/94109-confirmation 1.gif';
import location from '../../profile/assets/location.png';

type OtpInputStyles = {
  root: string;
  input: string;
};

type OtpInputStylesType = (
  params: void,
  options?: UseStylesOptions<string>
) => {
  classes: OtpInputStyles;
  cx: (...args: string[]) => string;
  theme: MantineTheme;
};

export const AddressVerification = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const { classes: inputClasses } = OtpInputStyles();
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);
  const address = '1901 Thornridge Circle, Baner, Pune - 411006';
  const addressType = 'Permanent';
  const residenceSince = 'August 2006';

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);

  const NextActiveStep = () => {
    if (activeStep !== 7) {
      setActiveStep(activeStep + 1);
    }
  };

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
    <>
      <Modal className="modal" size={'60%'} fullScreen={isMobile} opened={opened} onClose={close} centered>
        <Box className="address-verification-modal">
          <img src={checkGif} alt="Check Gif" />
          <Title className="address-verification-modal-title">Resident address verified</Title>
          <Text className="address-verification-modal-text">Thanks for your co-operation in verify.</Text>
          <Box className="residential-details">
            <Box className="location">
              <img src={location} alt="location icon" />
            </Box>

            <Box className="residential-details-text-box">
              <Text className="address">{address}</Text>

              <Button leftIcon={<MdVerified size={'16px'} />} className="verified">
                Verified
              </Button>
            </Box>
          </Box>
          <Button className="green-btn" onClick={close}>
            Continue
          </Button>
        </Box>
      </Modal>
      <Navbar />

      {activeStep === 1 && (
        <main className="profile">
          <Box className="container" style={{ marginTop: '7rem' }}>
            <Box className="address-verification-container">
              <Title className="address-verification-details-main-title">Please confirm the peer identity</Title>
              <Box className="address-verification-details">
                <Title className="address-verification-details-title">Ashok Deshmukh</Title>
                <Text className="address-verification-details-address">{address}</Text>
              </Box>

              <Button className="green-outline-btn" onClick={NextActiveStep}>
                Click to send OTP
              </Button>
              <Text className="address-verification-details-link">Not me</Text>
            </Box>
          </Box>
        </main>
      )}
      {activeStep === 2 && (
        <main className="profile">
          <Box className="container" style={{ marginTop: '7rem' }}>
            <Box className="address-verification-container">
              <Title className="address-verification-details-main-title">Please confirm the peer identity</Title>
              <Box className="address-verification-details">
                <Title className="address-verification-details-title">Ashok Deshmukh</Title>
                <Text className="address-verification-details-address">{address}</Text>
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
        </main>
      )}
      {activeStep === 3 && (
        <main className="profile">
          <Box className="container" style={{ marginTop: '7rem' }}>
            <Box className="address-verification-container">
              <Box className="address-verification-details">
                <Title className="address-verification-details-title">Ashok Deshmukh</Title>
                <Text className="address-verification-details-address">{address}</Text>
              </Box>
              <Title className="address-verification-bold-title">We are trying to verify residential address of</Title>
              <Box className="profile-details">
                <Box className="profile-details-image">
                  <img src={johnMarston} alt="Profile picture" />
                  <Box className="verified-icon">
                    <MdVerified />
                  </Box>
                </Box>
                <Title className="address-verification-details-name">Ashok Deshmukh</Title>
              </Box>
              <Box className="address-verification-details-box-header">
                <Text>Sr. No.</Text>
                <Text>Address</Text>
                <Text>Address Type</Text>
                <Text>Residential since</Text>
              </Box>
              <Box className="address-verification-details-added-peers">
                <Text>1</Text>
                <Text className="peer-email">{address}</Text>
                <Text>{addressType}</Text>
                <Text>{residenceSince}</Text>
              </Box>
              <Title className="address-verification-details-main-title">
                Please allow permission to capture location to confirm the verificationh
              </Title>
              <Button className="green-outline-btn" onClick={open}>
                Capture Location
              </Button>
            </Box>
          </Box>
        </main>
      )}
    </>
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
