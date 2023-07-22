import React from 'react';
import { Text, Box, Button } from '@mantine/core';
import privacyPolicy from '../../../auth/assets/Privacy Policy-Greenie.pdf';
import { useVerificationContext } from '../context/VerificationContext';

export const VerificationDisclaimer: React.FC = (): JSX.Element => {
  const { setActiveStep } = useVerificationContext();

  return (
    <>
      <section className="verification-step">
        <Text className="verification-disclaimer">
          I understand that during the sign-up process and while using this website, I may be required to provide
          certain personal information, including but not limited to my name, email address, contact details, and any
          other information deemed necessary for registration and website usage.
        </Text>
        <a href={privacyPolicy} download={'Data and Privacy Policy'} className="policy">
          Click to view Data and Privacy Policy
        </a>
        <Box className="verification-btns-wrapper">
          <Button className="btn next-btn" onClick={() => setActiveStep((current) => current + 1)}>
            Continue
          </Button>
        </Box>
      </section>
    </>
  );
};
