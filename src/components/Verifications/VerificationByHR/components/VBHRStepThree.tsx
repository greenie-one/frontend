import { Text, Box, Button } from '@mantine/core';
import { useVBHRContext } from '../context/VBHRContext';
import { ProfileDetailsBox } from './ProfileDetailsBox';

export const VBHRStepThree = () => {
  const salary = '13.5 Lac p.a.';
  const companyName = 'Infotech Solutions Private Limited';
  const { NextActiveStep } = useVBHRContext();
  return (
    <Box className="verification-step">
      <ProfileDetailsBox />
      <Text className="question-text">
        Was his salary <span>{salary}</span> at the {companyName}?
      </Text>
      <Box className="profile-details-actions">
        <Button className="green-outline-btn" onClick={NextActiveStep}>
          Approve
        </Button>
        <Button className="dispute-btn">Dispute</Button>
      </Box>
      <Text className="verification-disclaimer">
        I understand that during the sign-up process and while using this website, I may be required to provide certain
        personal information, including but not limited to my name, email address, contact details, and any other
        information deemed necessary for registration and website usage.
      </Text>
      <Text className="policy">Click to view Data and Privacy Policy</Text>
    </Box>
  );
};
