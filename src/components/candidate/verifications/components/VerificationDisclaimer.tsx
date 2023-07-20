import React from 'react';
import { Text } from '@mantine/core';

export const VerificationDisclaimer: React.FC = (): JSX.Element => {
  return (
    <>
      <Text className="verification-disclaimer">
        I understand that during the sign-up process and while using this website, I may be required to provide certain
        personal information, including but not limited to my name, email address, contact details, and any other
        information deemed necessary for registration and website usage.
      </Text>
      <Text className="policy">Click to view Data and Privacy Policy</Text>
    </>
  );
};
