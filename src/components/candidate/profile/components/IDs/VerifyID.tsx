import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Checkbox, Text, TextInput, Title, Modal, createStyles, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { Layout } from '../Layout';
import { useIDVerificationMethods } from './IDFunctions';
import { useGlobalContext } from '../../../../../context/GlobalContext';

import PanImg from '../../assets/Pan.png';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import AadharImg from '../../assets/Aadhar.png';
import DrivingLicenceImg from '../../assets/DrivingLicence.png';
import consentNotice from '../../assets/ConsentNotice.pdf';
import privacyPolicy from '../../../../auth/assets/Privacy Policy-Greenie.pdf';

export const VerifyID: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { verifyAadharForm, verifyPANForm, verifyLicenceForm } = useGlobalContext();
  const {
    close,
    opened,
    checked,
    setChecked,
    secondsRemaining,
    handlePANSubmit,
    handleAadharModal,
    handleAadharSubmit,
    requestOTPForAadhar,
    handleDrivingLicenceSubmit,
  } = useIDVerificationMethods();

  const { classes: otpInputClasses } = OtpInputStyles();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <Layout>
        <section className="container documents-container" style={{ marginTop: '7rem' }}>
          <Modal
            centered
            size={'55%'}
            radius={'lg'}
            opened={opened}
            onClose={close}
            className="modal"
            fullScreen={isMobile}
            styles={{
              title: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            }}
          >
            <form className="otp-form" onSubmit={handleAadharSubmit}>
              <Title className="title">OTP is sent to your linked phone number!</Title>
              <Text className="disbled-Input-State">
                {verifyAadharForm.values.aadharNo}
                <span className="changeBtn" onClick={close}>
                  Change
                </span>
              </Text>
              <TextInput
                withAsterisk
                maxLength={6}
                pattern="[0-9]{6}"
                classNames={otpInputClasses}
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

          <Box className="see-all-header">
            <Box className="go-back-btn" onClick={() => navigate('/candidate/profile')}>
              <BsArrowLeft className="arrow-left-icon" size={'16px'} />
              <Text>Profile</Text>
              <AiOutlineRight className="arrow-right-icon" size={'16px'} />
            </Box>
            <Box className="go-back-btn">
              <Text>Verification ID</Text>
              <AiOutlineRight className="arrow-right-icon" size={'16px'} />
              <Text>{params.id?.toUpperCase().replace('_', ' ')} Details</Text>
            </Box>
          </Box>

          <Box className="document-container">
            {params?.id?.toLowerCase() === 'aadhar' && (
              <img src={AadharImg} className="document-img" alt="Aadhar Img" />
            )}

            {params?.id?.toLowerCase() === 'pan' && <img src={PanImg} className="document-img" alt="Pan Card Image" />}

            {params?.id?.toLowerCase() === 'driving_license' && (
              <img src={DrivingLicenceImg} className="document-img" alt="Driving Licence Image" />
            )}

            <form className="document-text-box">
              <Title className="heading">Enter your {params.id?.toUpperCase().replace('_', ' ')} number</Title>

              {params?.id?.toLowerCase() === 'aadhar' && (
                <>
                  <TextInput
                    withAsterisk
                    minLength={12}
                    maxLength={12}
                    className="inputClass"
                    label="Enter aadhar number"
                    {...verifyAadharForm.getInputProps('aadharNo')}
                  />
                  <Button
                    type="submit"
                    disabled={!checked}
                    onClick={handleAadharModal}
                    className={checked ? 'greenBtn' : 'disabledBtn'}
                  >
                    Click to verify
                  </Button>
                </>
              )}

              {params?.id?.toLowerCase() === 'pan' && (
                <>
                  <TextInput
                    withAsterisk
                    minLength={10}
                    maxLength={10}
                    label="PAN Number"
                    className="inputClass"
                    {...verifyPANForm.getInputProps('panNo')}
                  />
                  <Button
                    type="submit"
                    disabled={!checked}
                    onClick={handlePANSubmit}
                    className={checked ? 'greenBtn' : 'disabledBtn'}
                  >
                    Click to verify
                  </Button>
                </>
              )}

              {params?.id?.toLowerCase() === 'driving_license' && (
                <>
                  <TextInput
                    withAsterisk
                    className="inputClass"
                    label="DOB as per license(DD/MM/YYYY)"
                    {...verifyLicenceForm.getInputProps('dateOfBirth')}
                  />
                  <TextInput
                    withAsterisk
                    minLength={15}
                    maxLength={15}
                    className="inputClass"
                    label="Licence Number"
                    {...verifyLicenceForm.getInputProps('licenceNo')}
                  />
                  <Button
                    type="submit"
                    disabled={!checked}
                    onClick={handleDrivingLicenceSubmit}
                    className={checked ? 'greenBtn' : 'disabledBtn'}
                  >
                    Click to verify
                  </Button>
                </>
              )}

              <Box className="checkbox-box">
                <Checkbox
                  color="teal"
                  checked={checked}
                  className="checkbox"
                  onChange={() => setChecked((prev) => !prev)}
                />
                <Text className="terms-conditions">
                  I hereby authorize Greenie to verify my Aadhar/PAN/DL details for authentication purposes. I have read
                  the Consent Notice and I am aware that Greenie will use the information only for the intended purpose
                  and my data will be handled as per laws. I am aware that I can withdraw this consent in the future.
                </Text>
              </Box>

              <Text style={{ textDecoration: 'none' }} className="policy">
                Click to view{' '}
                <a style={{ textDecoration: 'underline' }} href={consentNotice} download={'Consent Notice'}>
                  Consent terms
                </a>{' '}
                and{' '}
                <a style={{ textDecoration: 'underline' }} href={privacyPolicy} download={'Privacy Policy'}>
                  Privacy Policy
                </a>
              </Text>
            </form>
          </Box>
        </section>
      </Layout>
    </>
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
