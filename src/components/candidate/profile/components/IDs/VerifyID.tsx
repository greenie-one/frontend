import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Checkbox, Text, TextInput, Title } from '@mantine/core';
import { useProfileForms } from '../../context/ProfileForms';

import AadharImg from '../../assets/Aadhar.png';
import consentNotice from '../../assets/ConsentNotice.pdf';
import privacyPolicy from '../../../../auth/assets/Privacy Policy-Greenie.pdf';

type VerifyIDProps = {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenModal: () => void;
};

export const VerifyID: React.FC<VerifyIDProps> = ({ checked, setChecked, handleOpenModal }) => {
  const params = useParams();
  const { verifyAadharForm, verifyPANForm, verifyLicenceForm } = useProfileForms();

  return (
    <>
      <Box className="document-container">
        <img src={AadharImg} className="document-img" alt="Aadhar Img" />
        <Box className="document-text-box">
          <Title className="heading">Enter your {params?.id} number</Title>
          <TextInput
            label="Enter aadhar number"
            className="inputClass"
            withAsterisk
            minLength={12}
            maxLength={12}
            {...verifyAadharForm.getInputProps('aadharNo')}
          />
          <Button disabled={!checked} onClick={handleOpenModal} className={checked ? 'greenBtn' : 'disabledBtn'}>
            Click to verify
          </Button>
          <Box className="checkbox-box">
            <Checkbox
              color="teal"
              checked={checked}
              className="checkbox"
              onChange={() => setChecked((prev) => !prev)}
            />
            <Text className="tearms-conditions">
              I hereby authorize Greenie to verify my Aadhar/PAN/DL details for authentication purposes. I have read the
              Consent Notice and I am aware that Greenie will use the information only for the intended purpose and my
              data will be handled as per laws. I am aware that I can withdraw this consent in the future.
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
        </Box>
      </Box>
    </>
  );
};
