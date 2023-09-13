import { useEffect, useState } from 'react';
import { Box, Text, Title, Button, PinInput, createStyles, Select, Textarea, Modal } from '@mantine/core';
import { useVerificationContext } from '../context/VerificationContext';
import { HttpClient } from '../../../../utils/generic/httpClient';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';
import { peerVerificationAPIList } from '../../../../assets/api/ApiList';
import { peerPost } from '../../constants/dictionaries';
import { MdVerified } from 'react-icons/md';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../../context/GlobalContext';

const disputesReasons = [
  'Wrong Name',
  'Wrong Designation',
  'Wrong Mobile Number',
  'Wrong Email ID',
  'Multiple Wrong Information',
];

type OtpVerificationBody = {
  otpType: string;
  otp: string;
};

const VerificationHeading = () => {
  const { unverifiedLink, peerPhone, peerEmail, verificationBy, personBeingVerified, candidateName } =
    useVerificationContext();

  return (
    <>
      <Title className="address-verification-details-main-title">Welcome to</Title>
      <Box className="logo-box">
        <Text className="logo-text">Greenie</Text>
        <span className="logo-icon">
          <MdVerified />
        </span>
      </Box>
      <Text className="address-verification-dark-text">
        You have been chosen as a peer to verify work experience of <span>{candidateName}</span>. Kindly be a valuable
        reference and help elevate their profile.
      </Text>
      <Title className="address-verification-details-main-title" style={{ textAlign: 'center' }}>
        Please confirm your identity
      </Title>
      <Box className="address-verification-details peerVerificationDetails">
        <Box className="peerIdentityBox">
          <span className="peerIdentityLabel">Your Name</span>
          <Title className="peerIdentityValue">{personBeingVerified}</Title>
        </Box>
        <Box className="peerIdentityBox">
          <span className="peerIdentityLabel">Your Designation</span>
          <Title className="peerIdentityValue">{peerPost[verificationBy]}</Title>
        </Box>
        <Box className="peerIdentityBox">
          <span className="peerIdentityLabel">Your Mobile Number</span>
          <Title className="peerIdentityValue">{peerPhone}</Title>
        </Box>
        <Box className="peerIdentityBox">
          <span className="peerIdentityLabel">Your Email ID</span>
          <Title className="peerIdentityValue">{peerEmail}</Title>
        </Box>
      </Box>
    </>
  );
};

export const VerifyPeer = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);

  const params = useParams();

  const peerUUID = String(params.uuid);

  const { classes: inputClasses } = OtpInputStyles();
  const { scrollToTop } = useGlobalContext();
  const { unverifiedLink, disputeForm, getVerificationData, totalSteps, setActiveStep, otpTarget } =
    useVerificationContext();

  const [countdown, setCountDown] = useState<number>(30);
  const [otpProcess, setOtpProcess] = useState<number>(0);
  const [otp, setOtp] = useState<string>();

  const sendOtp = async () => {
    showLoadingNotification({
      title: 'Sending OTP...',
      message: 'Please wait while we send OTP to your phone number.',
    });

    const res = await HttpClient.callApi({
      url: `${peerVerificationAPIList.verifyPeer}/${peerUUID}/send-otp`,
      method: 'GET',
    });

    if (res.ok) {
      if (!(otpProcess === 1)) {
        setOtpProcess((prev) => prev + 1);
      }

      setCountDown(30);

      showSuccessNotification({ title: 'Success !', message: 'OTP Sent to your phone number' });
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

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const wordCount = inputValue.length;

    if (wordCount <= 250) {
      disputeForm.setFieldValue('disputeReason', inputValue);
    }
  };

  const handleNotMe = async () => {
    if (disputeForm.validate().hasErrors) {
      return;
    }

    showLoadingNotification({ title: 'Please wait', message: 'We are processing your request' });

    const res = await HttpClient.callApi({
      url: `${peerVerificationAPIList.getVerificationData}/${peerUUID}`,
      method: 'PATCH',
      body: {
        isReal: {
          state: 'REJECTED',
          dispute_type: disputeForm.values.disputeType,
          dispute_reason: disputeForm.values.disputeReason || 'NA',
        },
      },
    });

    if (res.ok) {
      showSuccessNotification({ title: 'Success', message: 'We recieved your response.' });
      disputeForm.reset();
      close();
      scrollToTop();
      setActiveStep(totalSteps);
    } else {
      disputeForm.reset();
      close();
      showErrorNotification(res.error.code || 'SOMETHING_WENT_WRONG');
    }
  };

  const handleClose = () => {
    disputeForm.reset();
    close();
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
              Yes, It&apos;s Me
            </Button>
            <button className="address-verification-details-link" onClick={open}>
              No, It&apos;s Not Me
            </button>
          </Box>
        )}
        {otpProcess === 1 && (
          <Box>
            <Box className="address-verification-container">
              <VerificationHeading />
              <Text className="address-verification-bold-title">
                Enter the One-Time Password sent to your {unverifiedLink} ({otpTarget}).
              </Text>
              <Box className="input-section">
                <PinInput
                  type="number"
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
                  Resend <strong>after {countdown}</strong>
                </Text>
              )}
              <Button className="primaryBtn" onClick={verifyOtp}>
                Verify
              </Button>
              <button style={{ marginTop: '-0.5rem' }} className="address-verification-details-link" onClick={open}>
                No, It&apos;s Not Me
              </button>
            </Box>
          </Box>
        )}
      </Box>
      <Modal
        radius={'lg'}
        centered
        size={'60%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={handleClose}
        title="Add a dispute to the information"
        styles={{
          title: {
            fontFamily: 'Inter',
            fontSize: '1.25rem',
            fontWeight: 600,
          },
        }}
      >
        <Box className="verification-modal">
          <Select
            clearable
            searchable
            withAsterisk
            nothingFound="No options"
            className="inputClass"
            placeholder="Select reason for dispute"
            data={disputesReasons}
            label="Dispute type"
            styles={() => ({
              item: {
                '&[data-selected]': {
                  '&, &:hover': {
                    backgroundColor: '#17a672',
                    color: 'white',
                  },
                },
              },
            })}
            {...disputeForm.getInputProps('disputeType')}
          />
          <Box className="text-area-box">
            <Textarea
              value={disputeForm.values.disputeReason}
              onChange={handleInputChange}
              placeholder="Provide more information about dispute"
              className="text-area"
            />
            <Text className="word-limit">{disputeForm.values.disputeReason.length} / 250 </Text>
          </Box>
          <Button className="green-btn" onClick={handleNotMe}>
            Raise dispute
          </Button>
          <Text className="fact">
            This information will not be shared with the candidate, it will be only used to maintain records
          </Text>
        </Box>
      </Modal>
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
