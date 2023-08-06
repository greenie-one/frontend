import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Checkbox, Text, TextInput, Title } from '@mantine/core';

import { Layout } from '../Layout';
import { useIDVerificationMethods } from './IDFunctions';
import { useProfileForms } from '../../context/ProfileForms';
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

  const { scrollToTop } = useGlobalContext();
  const { verifyAadharForm, verifyPANForm, verifyLicenceForm } = useProfileForms();
  const {
    checked,
    setChecked,
    handlePANSubmit,
    handleAadharModal,
    handleAadharSubmit,
    requestOTPForAadhar,
    handleDrivingLicenceSubmit,
  } = useIDVerificationMethods();

  const handleContinue = () => {
    scrollToTop();
    navigate('/candidate/profile/IDs/verify/aadhar/congratulations');
  };

  return (
    <>
      <Layout>
        <section className="container documents-container" style={{ marginTop: '7rem' }}>
          <Box className="see-all-header">
            <Box className="go-back-btn" onClick={() => navigate('/candidate/profile')}>
              <BsArrowLeft className="arrow-left-icon" size={'16px'} />
              <Text>Profile</Text>
              <AiOutlineRight className="arrow-right-icon" size={'16px'} />
            </Box>
            <Box className="go-back-btn">
              <Text>Verification ID</Text>
              <AiOutlineRight className="arrow-right-icon" size={'16px'} />
              <Text>{params.id?.toUpperCase()} Details</Text>
            </Box>
          </Box>

          <Box className="document-container">
            {params?.id?.toLowerCase() === 'aadhar' && (
              <img src={AadharImg} className="document-img" alt="Aadhar Img" />
            )}

            {params?.id?.toLowerCase() === 'pan' && <img src={PanImg} className="document-img" alt="Pan Card Image" />}

            {params?.id?.toLowerCase() === 'driving_licence' && (
              <img src={DrivingLicenceImg} className="document-img" alt="Driving Licence Image" />
            )}

            <form className="document-text-box">
              <Title className="heading">Enter your {params?.id?.toUpperCase()} number</Title>

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

              {params?.id?.toLowerCase() === 'driving_licence' && (
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
