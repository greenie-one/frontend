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
          By verifying the candidate's information, you confirm that you are a genuine peer and that the details you
          provide are accurate and true to the best of your knowledge. Your verification will be used solely for the
          intended purpose as claimed by the candidate. Greenie ensures the security and confidentiality of the data
          shared during the verification process
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
