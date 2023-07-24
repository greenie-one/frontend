import { useEffect, useState } from 'react';
import { Box, Text, Title, Button, PinInput, createStyles } from '@mantine/core';
import { useVerificationContext } from '../context/VerificationContext';
import { HttpClient } from '../../../../utils/generic/httpClient';
import { showErrorNotification } from '../../../../utils/functions/showNotification';
import { peerVerificationAPIList } from '../../../../assets/api/ApiList';

type OtpVerificationBody = {
  otpType: string;
  otp: string;
};

const VerificationHeading = () => {
  const { unverifiedLink, verificationBy, personBeingVerified } = useVerificationContext();

  return (
    <>
      <Title className="address-verification-details-main-title" style={{ textAlign: 'center' }}>
        Please verify your {unverifiedLink} to confirm your identity
      </Title>
      <Box className="address-verification-details">
        <Title className="address-verification-details-title">{personBeingVerified ?? 'Peer name'}</Title>
        <Text className="address-verification-details-address">{verificationBy}</Text>
      </Box>
    </>
  );
};

export const VerifyPeer = () => {
  const { classes: inputClasses } = OtpInputStyles();
  const { unverifiedLink, peerUUID, getVerificationData, setActiveStep } = useVerificationContext();

  const [countdown, setCountDown] = useState<number>(60);
  const [otpProcess, setOtpProcess] = useState<number>(0);
  const [otp, setOtp] = useState<string>();

  const sendOtp = async () => {
    const requestBody: Record<'otpType', string> = {
      otpType: unverifiedLink,
    };

    const res = await HttpClient.callApi({
      url: `${peerVerificationAPIList.verifyPeer}/${peerUUID}/send-otp`,
      method: 'POST',
      body: requestBody,
    });

    if (res.ok) {
      setOtpProcess((prev) => prev + 1);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      showErrorNotification('OTP is required!');
    }
    const requestBody: OtpVerificationBody = {
      otpType: unverifiedLink,
      otp: String(otp),
    };
    const res = await HttpClient.callApi({
      url: `${peerVerificationAPIList.verifyPeer}/${peerUUID}/verify-otp`,
      method: 'POST',
      body: requestBody,
    });

    if (res.ok) {
      setActiveStep((current) => current + 1);
      await getVerificationData();
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
    <main className="profile">
      <Box className="container verification-container">
        {otpProcess === 0 && (
          <Box className="address-verification-container">
            <VerificationHeading />
            <Button className="green-outline-btn" onClick={sendOtp}>
              Click to send OTP
            </Button>
            <button className="address-verification-details-link">Not me</button>
          </Box>
        )}
        {otpProcess === 1 && (
          <Box>
            <Box className="address-verification-container">
              <VerificationHeading />
              <Text className="address-verification-bold-title">
                Enter the One-Time Password sent to your {unverifiedLink}.
              </Text>
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
                <Button compact color="gray" variant="subtle" className="resendLink">
                  Resend
                </Button>
              ) : (
                <Text fw={'light'} fz={'xs'} my={'md'}>
                  Resend <strong>after {countdown}</strong>
                </Text>
              )}
              <Button className="primaryBtn" onClick={verifyOtp}>
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
  root: {},

  input: {
    '&:focus': {
      borderColor: 'green',
    },
  },
}));
