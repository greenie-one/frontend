import '../styles/global.scss';
import { useState, useEffect } from 'react';
import { useProfileContext } from '../context/ProfileContext';
import {
  Text,
  Box,
  Button,
  Modal,
  Checkbox,
  createStyles,
  em,
  rem,
  TextInput,
  Title,
  CopyButton,
} from '@mantine/core';
import { FaExclamation } from 'react-icons/fa';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { BsArrowLeft, BsCheckLg } from 'react-icons/bs';
import { MdVerified, MdOutlineContentCopy } from 'react-icons/md';
import { AiOutlineRight } from 'react-icons/ai';
import AadharImg from '../assets/Aadhar.png';
import john from '../assets/johnMarston.png';
import { notifications } from '@mantine/notifications';
import { aadharAPIList } from '../../../assets/api/ApiList';
import axios from 'axios';
import checkImg from '../assets/check.png';

interface VerificationData {
  requestId: string;
  taskId: string;
}

export const SeeAadharCard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const { classes: inputClasses } = inputStyles();
  const { classes: otpInputClasses } = OtpInputStyles();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const greeneId = 'GRN788209';
  const {
    detailsPage,
    dispatchDetailsPage,
    verifyAadharForm,
    getDocuments,
    authTokens,
    aadharIsVerified,
    setAadharIsVerified,
    scrollToTop,
  } = useProfileContext();
  const [verificationData, setVerificationData] = useState<VerificationData>({
    requestId: '',
    taskId: '',
  });

  const requestOTPForAadhar = async () => {
    try {
      notifications.show({
        id: 'load-data',
        title: 'Sending OTP to linked phone number...',
        message: 'Please wait while we send OTP to your linked number.',
        loading: true,
        autoClose: false,
        withCloseButton: false,
        sx: { borderRadius: em(8) },
      });
      const res = await axios.post(
        `${aadharAPIList.requestOTPForAadhar}`,
        {
          id_type: 'AADHAR',
          id_number: verifyAadharForm.values.aadharNo,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        }
      );
      if (res.data.success) {
        const { request_id, taskId } = res.data;
        setVerificationData((prevState) => ({
          ...prevState,
          requestId: request_id,
          taskId: taskId,
        }));
        open();
        notifications.update({
          id: 'load-data',
          title: 'Success!',
          message: 'OTP Sent to your linked phone number',
          autoClose: 2200,
          withCloseButton: false,
          color: 'teal',
          icon: <BsCheckLg />,
          sx: { borderRadius: em(8) },
        });
      }
    } catch (error: any) {
      if (error.response?.data?.code === 'GR0033') {
        notifications.update({
          id: 'load-data',
          title: 'Invalid ID Number!',
          message: 'Please enter valid Aadhar number',
          autoClose: 2200,
          withCloseButton: false,
          color: 'red',
          icon: <FaExclamation />,
          sx: { borderRadius: em(8) },
        });
      }
      if (error.response?.data?.code === 'GR0034') {
        notifications.update({
          id: 'load-data',
          title: 'Limit exceeded!',
          message: 'Rate limit exceeded for OTP requests',
          autoClose: 2200,
          withCloseButton: false,
          color: 'red',
          icon: <FaExclamation />,
          sx: { borderRadius: em(8) },
        });
      }
      console.log(error.message);
    }
  };

  const handleOpenModal = async () => {
    if (!verifyAadharForm.validateField('aadharNo').hasError && checked) {
      requestOTPForAadhar();
      const timer = setInterval(() => {
        setSecondsRemaining((prevSecondsRemaining) => {
          const newSecondsRemaining = prevSecondsRemaining - 1;
          if (newSecondsRemaining === 0) {
            clearInterval(timer);
          }
          return newSecondsRemaining;
        });
      }, 1000);

      if (secondsRemaining === 0) {
        clearInterval(timer);
      }

      return () => clearInterval(timer);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!verifyAadharForm.validateField('otp').hasError) {
      try {
        notifications.show({
          id: 'load-data',
          title: 'Verifying your OTP...',
          message: 'Please wait while we verify your OTP',
          loading: true,
          autoClose: false,
          withCloseButton: false,
          sx: { borderRadius: em(8) },
        });
        const { taskId, requestId } = verificationData;
        const res = await axios.post(
          `${aadharAPIList.verifyOTPForAadhar}`,
          { otp: verifyAadharForm.values.otp, request_id: requestId, task_id: taskId },
          {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          }
        );
        if (res.data.success) {
          notifications.update({
            id: 'load-data',
            title: 'Success !',
            message: 'OTP Verified Successfully',
            autoClose: 2200,
            withCloseButton: false,
            color: 'teal',
            icon: <BsCheckLg />,
            sx: { borderRadius: em(8) },
          });
          close();
          setAadharIsVerified(true);
          verifyAadharForm.values.otp = '';
          verifyAadharForm.values.aadharNo = '';
          getDocuments();
        }
      } catch (error: any) {
        if (error.response?.data?.code === 'GR0033') {
          notifications.update({
            id: 'load-data',
            title: 'Invalid OTP!',
            message: 'Please enter valid OTP',
            autoClose: 2200,
            withCloseButton: false,
            color: 'red',
            icon: <FaExclamation />,
            sx: { borderRadius: em(8) },
          });
        }
      }
    }
  };

  const handlePageChange = () => {
    dispatchDetailsPage({ type: 'SET_SEE_AADHAR_CARD', payload: !detailsPage.seeAadharCard });
    verifyAadharForm.values.aadharNo = '';
    verifyAadharForm.values.otp = '';
  };

  const handleContinue = () => {
    scrollToTop();
    dispatchDetailsPage({ type: 'SET_SEE_AADHAR_CARD', payload: !detailsPage.seeAadharCard });
    dispatchDetailsPage({
      type: 'SET_SEE_CONGRATULATIONS_SCREEN',
      payload: !detailsPage.seeCongratulations,
    });
  };

  return (
    <section className="container documents-container">
      {aadharIsVerified ? (
        <Modal
          centered
          className="modal"
          size={'55%'}
          fullScreen={isMobile}
          opened={opened}
          onClose={close}
        >
          <Box className="congratulations-modal">
            <img src={checkImg} alt="Checked" />
            <Title className="title">
              Your Profile is now verified <MdVerified color="#8CF078" size={'18px'} />
            </Title>
            <Text className="sub-title">Here is your Greenie ID</Text>
            <Text className="greenie-id">{greeneId}</Text>

            <Box className="buttons-wrapper">
              <Button leftIcon={<MdVerified color="#8CF078" size={'18px'} />} className="verified">
                Verified
              </Button>
              <CopyButton value={greeneId} timeout={2000}>
                {({ copied, copy }) => (
                  <Box>
                    {copied ? (
                      <Button
                        className="copy-btn"
                        leftIcon={<MdOutlineContentCopy size={'15px'} />}
                      >
                        Copied
                      </Button>
                    ) : (
                      <Button
                        className="copy-btn"
                        onClick={copy}
                        leftIcon={<MdOutlineContentCopy size={'15px'} />}
                      >
                        Copy
                      </Button>
                    )}
                  </Box>
                )}
              </CopyButton>
            </Box>

            <Button className="primaryBtn" onClick={handleContinue}>
              Continue
            </Button>
          </Box>
        </Modal>
      ) : (
        <Modal
          centered
          className="modal"
          size={'55%'}
          fullScreen={isMobile}
          opened={opened}
          onClose={close}
          title="Please enter the OTP send to"
          styles={{
            title: {
              fontSize: '1.25rem',
              fontWeight: 600,
            },
          }}
        >
          <form className="otp-form" onSubmit={handleSubmit}>
            <Title className="title">OTP has been sent to your linked phone number!</Title>
            <Text className="disbled-Input-State">
              {verifyAadharForm.values.aadharNo}
              <span className="changeBtn" onClick={close}>
                Change
              </span>
            </Text>
            <TextInput
              classNames={otpInputClasses}
              withAsterisk
              maxLength={6}
              pattern="[0-9]{6}"
              {...verifyAadharForm.getInputProps('otp')}
            />
            {secondsRemaining === 0 ? (
              <Button
                compact
                color="gray"
                variant="subtle"
                onClick={requestOTPForAadhar}
                className="resendLink"
              >
                Resend
              </Button>
            ) : (
              <Text fw={'light'} fz={'xs'} my={'md'}>
                Resend{' '}
                <Text fw={'500'} span>
                  after {secondsRemaining}s
                </Text>
              </Text>
            )}
            <Button type="submit" className="primaryBtn">
              Verify
            </Button>
          </form>
        </Modal>
      )}

      <Box className="see-all-header">
        <Box className="go-back-btn" onClick={handlePageChange}>
          <BsArrowLeft className="arrow-left-icon" size={'16px'} />
          <Text>Profile</Text>
          <AiOutlineRight className="arrow-right-icon" size={'16px'} />
        </Box>
        <Box className="go-back-btn">
          <Text>Verification ID</Text>
          <AiOutlineRight className="arrow-right-icon" size={'16px'} />

          {aadharIsVerified ? <Text>Aadhar card details</Text> : <Text>Aadhar Card</Text>}
        </Box>
      </Box>
      {aadharIsVerified ? (
        <Box className="document-verified-container">
          <Box className="document-verified-left-box">
            <Box className="left-img-box">
              <img src={john} className="verified-document-profile" alt="" />
              <Text className="verified-document-name">John Jocab Marston</Text>
            </Box>

            <Box className="left-text-box">
              <Box>
                <Text className="heading">Last Updated</Text>
                <Text className="details">02/03/2023</Text>
              </Box>
              <Box>
                <Text className="heading">Timestamp</Text>
                <Text className="details">12:30 AM | 02/03/2023</Text>
              </Box>
            </Box>
          </Box>
          <Box className="document-verified-right-box">
            <Box className="box-row aadhar-first-row">
              <Box className="details-box">
                <Title className="details-title">Aadhar number</Title>
                <Text className="details-detail">2237 8928 8282 0092</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">Name of Father/Husband</Title>
                <Text className="details-detail">Jacob Marston</Text>
              </Box>
            </Box>
            <Box className="box-row aadhar-second-row">
              <Box className="details-box">
                <Title className="details-title">State</Title>
                <Text className="details-detail">Maharashtra</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">Street house landmark</Title>
                <Text className="details-detail">Near TY Corner</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">Pincode</Title>
                <Text className="details-detail">413049</Text>
              </Box>
            </Box>
            <Box className="box-row aadhar-third-row">
              <Box className="details-box">
                <Title className="details-title">Country</Title>
                <Text className="details-detail">India</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">DOB</Title>
                <Text className="details-detail">19/09/1990</Text>
              </Box>
              <Box className="details-box">
                <Title className="details-title">Phone Number</Title>
                <Text className="details-detail">+918383838383</Text>
              </Box>
            </Box>

            <Button className="primaryBtn" onClick={open}>
              Continue
            </Button>
          </Box>
        </Box>
      ) : (
        <Box className="document-container">
          <img src={AadharImg} className="document-img" alt="Aadhar Img" />
          <Box className="document-text-box">
            <Title className="heading">Enter your Aadhaar number</Title>
            <TextInput
              label="Enter aadhar number"
              classNames={inputClasses}
              withAsterisk
              minLength={12}
              maxLength={12}
              {...verifyAadharForm.getInputProps('aadharNo')}
            />
            <Button
              disabled={!checked}
              onClick={handleOpenModal}
              className={checked ? 'greenBtn' : 'disabledBtn'}
            >
              Click to verify
            </Button>
            <Box className="checkbox-box">
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="checkbox"
                color="teal"
              />
              <Text className="tearms-conditions">
                I understand that during the sign-up process and while using this website, I may be
                required to provide certain personal information, including but not limited to my
                name, email address, contact details, and any other information deemed necessary for
                registration and website usage.
              </Text>
            </Box>

            <Text className="policy">Click to view Data and Privacy Policy</Text>
          </Box>
        </Box>
      )}
    </section>
  );
};

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: '10px',
    marginBottom: '26px',
  },

  input: {
    height: '58px',
    paddingTop: '18px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid #D1D4DB',
    lineHeight: '19px',
    letterSpacing: '-0.02em',
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      height: '46px',
      borderRadius: '6px',
      fontSize: '10px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },

  innerInput: {
    height: rem(54),
    paddingTop: rem(28),

    [`@media screen and (max-width: ${em(1024)})`]: {
      paddingTop: rem(8),
    },
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: '12px',
    paddingLeft: '14px',
    paddingTop: '7px',
    lineHeight: '14.52px',
    letterSpacing: '-0.02em',
    zIndex: 1,
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      fontSize: '10px',
      lineHeight: '10px',
      paddingTop: '8px',
    },
  },
}));

const OtpInputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginBlock: '8px',
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
