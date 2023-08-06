import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Box, Button, Modal, createStyles, em, TextInput, Title, CopyButton } from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';

import { HttpClient, Result } from '../../../../../utils/generic/httpClient';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { APIError } from '../../../../../utils/generic/httpClient';
import { aadharAPIList } from '../../../../../assets/api/ApiList';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../utils/functions/showNotification';

import { Layout } from '../Layout';
import emptyProfile from '../../assets/emptyProfile.png';
// import errorIcon from '../../assets/errorIcon.png';
// import { GrPowerReset } from 'react-icons/gr';
import { MdVerified, MdOutlineContentCopy } from 'react-icons/md';
import checkImg from '../../assets/94109-confirmation 1.gif';
// import AadharImg from '../../assets/Aadhar.png';
import { AiOutlineRight } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';

// import privacyPolicy from '../../../../auth/assets/Privacy Policy-Greenie.pdf';
// import consentNotice from '../../assets/ConsentNotice.pdf';
// import { VerifyID } from './VerifyID';

export const VerifyAadharCard = () => {
  const navigate = useNavigate();
  const { classes: otpInputClasses } = OtpInputStyles();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { authClient, setForceRender, scrollToTop, verifyAadharForm, profileData } = useGlobalContext();

  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [aadharIsVerified, setAadharIsVerified] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const [verificationData, setVerificationData] = useState<AadharVerificationResponse>({
    requestId: '',
    taskId: '',
  });

  const greeneId = profileData?.greenieId ?? '';

  const requestOTPForAadhar = async () => {
    showLoadingNotification({
      title: 'Sending OTP to linked phone number...',
      message: 'Please wait while we send OTP to your linked number.',
    });

    const requestBody: IDRequestBody = { id_type: 'AADHAR', id_number: verifyAadharForm.values.aadharNo };
    const res: Result<AddAadhar> = await HttpClient.callApiAuth(
      {
        url: `${aadharAPIList.requestOTPForAadhar}`,
        method: 'POST',
        body: requestBody,
      },
      authClient
    );

    if (res.ok) {
      showSuccessNotification({ title: 'Success !', message: 'OTP Sent to your linked phone number' });
      const { request_id, taskId } = res.value;

      setVerificationData((prevState) => ({
        ...prevState,
        requestId: request_id,
        taskId: taskId,
      }));
      open();
    } else {
      showErrorNotification(res.error.code);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyAadharForm.validateField('otp').hasError) {
      showLoadingNotification({
        title: 'Verifying your OTP...',
        message: 'Please wait while we verify your OTP',
      });

      const { taskId, requestId } = verificationData;
      const requestBody: IDVerificationOtpRequestBody = {
        otp: verifyAadharForm.values.otp,
        request_id: requestId,
        task_id: taskId,
      };

      const res: Result<verifyAadhar | APIError> = await HttpClient.callApiAuth(
        {
          url: `${aadharAPIList.verifyOTPForAadhar}`,
          method: 'POST',
          body: requestBody,
        },
        authClient
      );

      if (res.ok) {
        showSuccessNotification({ title: 'Success !', message: 'OTP Verified Successfully' });
        setAadharIsVerified(true);
        verifyAadharForm.reset();
        setForceRender((prev) => !prev);
        close();
      } else {
        showErrorNotification(res.error.code);
      }
    }
  };

  const handlePageChange = () => {
    verifyAadharForm.setFieldValue('aadharNo', '');
    verifyAadharForm.setFieldValue('otp', '');
    setAadharIsVerified(false);
    navigate('/candidate/profile');
  };

  const handleContinue = () => {
    scrollToTop();
    navigate('/candidate/profile/IDs/verify/aadhar/congratulations');
  };

  return (
    <Layout>
      <section className="container documents-container" style={{ marginTop: '7rem' }}>
        {aadharIsVerified ? (
          <Modal
            radius={'lg'}
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
                        <Button className="copy-btn" leftIcon={<MdOutlineContentCopy size={'15px'} />}>
                          Copied
                        </Button>
                      ) : (
                        <Button className="copy-btn" onClick={copy} leftIcon={<MdOutlineContentCopy size={'15px'} />}>
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
            radius={'lg'}
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
                <Button compact color="gray" variant="subtle" onClick={requestOTPForAadhar} className="resendLink">
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
                {profileData.profilePic ? (
                  <img src={profileData.profilePic} className="verified-document-profile" alt="" />
                ) : (
                  <img src={emptyProfile} className="verified-document-profile" alt="" />
                )}

                <Text className="verified-document-name">
                  {profileData.firstName} {profileData.lastName}
                </Text>
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
          <></>
          // <VerifyID checked={checked} setChecked={setChecked} handleOpenModal={handleOpenModal} />
        )}
      </section>
    </Layout>
  );
};

const OtpInputStyles = createStyles(() => ({
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
