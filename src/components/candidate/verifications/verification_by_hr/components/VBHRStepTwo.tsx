import { Text, Box, Button } from '@mantine/core';
import { useVBHRContext } from '../context/VBHRContext';
import { ProfileDetailsBox } from './ProfileDetailsBox';

export const VBHRStepTwo = () => {
  const designation = 'CXP Manager';
  const companyName = 'Infotech Solutions Private Limited';
  const startDate = '13/03/2021';
  const { NextActiveStep } = useVBHRContext();

  return (
    <section className="verification-step">
      <ProfileDetailsBox />
      <Text className="question-text" w={'45%'}>
        According to Abhishek you were his <span>{designation}</span> during his employment in{' '}
        <span>{companyName}</span> from <span className="date">{startDate}</span> till Current day
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
    </section>
  );
};
