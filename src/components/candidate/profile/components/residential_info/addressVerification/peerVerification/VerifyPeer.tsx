import React, { useEffect, useState } from 'react';
import { Box, Title, Text, Button, PinInput, createStyles, em } from '@mantine/core';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../../../utils/functions/showNotification';
import { HttpClient } from '../../../../../../../utils/generic/httpClient';
import { addressVerificationAPIList } from '../../../../../../../assets/api/ApiList';

type VerifyPeerProps = {
  type: 'EMAIL' | 'MOBILE';
  peerName: string;
  verificationBy: string;
  uuid: string;
  getPeerData: () => Promise<void>;
};

export const VerifyPeer: React.FC<VerifyPeerProps> = ({
  type,
  peerName,
  verificationBy,
  uuid,
  getPeerData,
}): JSX.Element => {
  const { classes: inputClasses } = OtpInputStyles();

  const [showOtpScreen, setShowOtpScreen] = useState<boolean>(false);
  const [countdown, setCountDown] = useState<number>(60);
  const [otp, setOtp] = useState<string>();

  const sendOtp = async () => {
    showLoadingNotification({
      title: 'Sending OTP...',
      message: 'Please wait while we send OTP to your phone number.',
    });

    const res = await HttpClient.callApi({
      url: `${addressVerificationAPIList.sendVerificationOtp}/${uuid}/send-otp`,
      method: 'GET',
    });

    if (res.ok) {
      if (!showOtpScreen) {
        setShowOtpScreen(true);
      }

      setCountDown(60);

      showSuccessNotification({ title: 'Success !', message: 'OTP Sent to your phone number' });
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      showErrorNotification('OTP is required!');
    }

    showLoadingNotification({
      title: 'Verifying OTP...',
      message: 'Please wait while we verify OTP.',
    });

    const requestBody: Record<string, string> = {
      otpType: type,
      otp: String(otp),
    };

    const res = await HttpClient.callApi({
      url: `${addressVerificationAPIList.sendVerificationOtp}/${uuid}/verify-otp`,
      method: 'POST',
      body: requestBody,
    });

    if (res.ok) {
      await getPeerData();
    } else {
      showErrorNotification(res.error.code);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) clearInterval(timer);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <>
      {!showOtpScreen ? (
        <Box className="container" style={{ marginTop: '7rem' }}>
          <Box className="address-verification-container">
            <Title className="address-verification-details-main-title">Please confirm the peer identity</Title>
            <Box className="address-verification-details">
              <Title className="address-verification-details-title">{peerName}</Title>
              <Text className="address-verification-details-address">{verificationBy}</Text>
            </Box>

            <Button className="green-outline-btn" onClick={sendOtp}>
              Click to send OTP
            </Button>
            <Text className="address-verification-details-link">Not me</Text>
          </Box>
        </Box>
      ) : (
        <Box className="container" style={{ marginTop: '8rem' }}>
          <Box className="address-verification-container">
            <Title className="address-verification-details-main-title">Please confirm the peer identity</Title>
            <Box className="address-verification-details">
              <Title className="address-verification-details-title"> {peerName}</Title>
              <Text className="address-verification-details-address">{verificationBy}</Text>
            </Box>
            <Text className="address-verification-bold-title">Enter the one-time password sent to your {type}.</Text>
            <Box className="input-section">
              <PinInput
                length={6}
                oneTimeCode
                aria-label="One time code"
                onChange={(value) => setOtp(value)}
                classNames={inputClasses}
              />
            </Box>
            {countdown === 0 ? (
              <Button compact color="gray" variant="subtle" className="resendLink" onClick={sendOtp}>
                Resend
              </Button>
            ) : (
              <Text fw={'light'} fz={'xs'} my={'md'}>
                Resend{' '}
                <Text fw={'600'} span>
                  after {countdown} seconds
                </Text>
              </Text>
            )}
            <Button className="primaryBtn" onClick={verifyOtp}>
              Verify
            </Button>
          </Box>
        </Box>
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
    fontSize: '16px',
    fontWeight: 500,
    border: '1px solid #D1D4DB',
    color: '#697082',

    '&:focus': {
      borderColor: 'green',
    },

    [`@media screen and (max-width: ${em(1024)})`]: {
      fontSize: '14px',
      margin: '0 auto',
    },
  },
}));
