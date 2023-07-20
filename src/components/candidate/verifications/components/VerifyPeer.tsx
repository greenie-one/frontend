import { useEffect, useState } from 'react';
import { Box, Text, Title, Button, PinInput, createStyles, em } from '@mantine/core';
import { useVerificationContext } from '../verification_by_hr/context/VerificationContext';
import { HttpClient } from '../../../../utils/generic/httpClient';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { showErrorNotification } from '../../../../utils/functions/showNotification';
import { peerVerificationAPIList } from '../../../../assets/api/ApiList';

type OtpVerificationBody = {
  otpType: string;
  otp: string;
};

const VerificationHeading = () => {
  const { unverifiedLink, verificationBy } = useVerificationContext();

  return (
    <>
      <Title className="address-verification-details-main-title">
        Please verify your {unverifiedLink} to confirm your identity
      </Title>
      <Box className="address-verification-details">
        <Title className="address-verification-details-title">Peer name</Title>
        <Text className="address-verification-details-address">{verificationBy}</Text>
      </Box>
    </>
  );
};

export const VerifyPeer = () => {
  const { unverifiedLink, setActiveStep, peerId } = useVerificationContext();
  const { authClient } = useGlobalContext();

  const [countdown, setCountDown] = useState<number>(60);
  const [otpProcess, setOtpProcess] = useState<number>(0);
  const [otp, setOtp] = useState<string>();

  const sendOtp = async () => {
    const requestBody: Record<'otpType', string> = {
      otpType: unverifiedLink,
    };

    const res = await HttpClient.callApiAuth(
      {
        url: `${peerVerificationAPIList.verifyPeer}/${peerId}/send-otp`,
        method: 'POST',
        body: requestBody,
      },
      authClient
    );

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
    const res = await HttpClient.callApiAuth(
      {
        url: `${peerVerificationAPIList.verifyPeer}/${peerId}/verify-otp`,
        method: 'POST',
        body: requestBody,
      },
      authClient
    );

    if (res.ok) {
      setActiveStep((prev) => prev + 1);
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
      <Box className="container">
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
                <PinInput length={6} oneTimeCode aria-label="One time code" onChange={(value) => setOtp(value)} />
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
