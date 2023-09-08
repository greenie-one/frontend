import React, { useEffect, useState } from 'react';
import { Box, Title, Select, Textarea, Text, Modal, Button, PinInput, createStyles, em } from '@mantine/core';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../../../utils/functions/showNotification';
import { HttpClient } from '../../../../../../../utils/generic/httpClient';
import { addressVerificationAPIList } from '../../../../../../../assets/api/ApiList';
import { useNavigate } from 'react-router-dom';
import { isNotEmpty, useForm } from '@mantine/form';
import { DisputeFormType } from '../../../../../verifications/types/VerificationContext';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

const disputesReasons = [
  'Wrong Name',
  'Wrong Relation',
  'Wrong Mobile Number',
  'Wrong Email ID',
  'Multiple Wrong Information',
];

type VerifyPeerProps = {
  type: 'EMAIL' | 'MOBILE';
  peerName: string;
  verificationBy: string;
  phone: string;
  email: string;
  uuid: string;
  getPeerData: () => Promise<void>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

export const VerifyPeer: React.FC<VerifyPeerProps> = ({
  type,
  peerName,
  verificationBy,
  phone,
  email,
  uuid,
  getPeerData,
  currentStep,
  setCurrentStep,
}): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { classes: inputClasses } = OtpInputStyles();

  const [showOtpScreen, setShowOtpScreen] = useState<boolean>(false);
  const [countdown, setCountDown] = useState<number>(30);
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

      setCountDown(30);

      showSuccessNotification({ title: 'Success !', message: `OTP Sent to your ${type}` });
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
      setCurrentStep(1);
      showSuccessNotification({ title: 'Success !', message: 'OTP verified successfully!' });
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const disputeForm = useForm<DisputeFormType>({
    initialValues: {
      disputeType: '',
      disputeReason: '',
    },
    validate: {
      disputeType: isNotEmpty('Please select dispute reason'),
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const wordCount = inputValue.length;

    if (wordCount <= 250) {
      disputeForm.setFieldValue('disputeReason', inputValue);
    }
  };

  const handleNotMe = async () => {
    showLoadingNotification({ title: 'Please wait', message: 'We are processing your request' });

    const res = await HttpClient.callApi({
      url: `${addressVerificationAPIList.getVerificationData}/isReal/${uuid}`,
      method: 'POST',
      body: {
        isReal: {
          state: 'REJECTED',
          dispute_type: disputeForm.values.disputeType,
          dispute_reason: disputeForm.values.disputeReason || 'NA',
        },
      },
    });

    if (res.ok) {
      showSuccessNotification({ title: 'Success', message: 'We received your response.' });
      disputeForm.reset();
      close();
      navigate('.?verified=true');
    } else {
      disputeForm.reset();
      close();
      showErrorNotification(res.error.code);
    }
  };

  const handleClose = () => {
    disputeForm.reset();
    close();
  };

  useEffect(() => {
    if (currentStep === 1) {
      sendOtp();
    }
  }, [currentStep]);

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
            <Box className="address-verification-details peerVerificationDetails">
              <Box className="peerIdentityBox">
                <span className="peerIdentityLabel">Your Name</span>
                <Title className="peerIdentityValue">{peerName}</Title>
              </Box>
              <Box className="peerIdentityBox">
                <span className="peerIdentityLabel">Your Relation With Candidate</span>
                <Title className="peerIdentityValue">{verificationBy}</Title>
              </Box>
              <Box className="peerIdentityBox">
                <span className="peerIdentityLabel">Your Mobile Number</span>
                <Title className="peerIdentityValue">{phone}</Title>
              </Box>
              <Box className="peerIdentityBox">
                <span className="peerIdentityLabel">Your Email ID</span>
                <Title className="peerIdentityValue">{email}</Title>
              </Box>
            </Box>

            <Button className="green-outline-btn" onClick={sendOtp}>
              Yes, Let&apos;s Proceed
            </Button>
            <Text className="address-verification-details-link" onClick={open}>
              No, It&apos;s not me
            </Text>
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
