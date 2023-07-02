import { Text, Box, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import ProfilePic from '../../../Profile/assets/johnMarston.png';
import { useVBHRContext } from '../context/VBHRContext';

export const VBHRStepThree = () => {
  const salary = '13.5 Lac p.a.';
  const companyName = 'Infotech Solutions Private Limited';
  const { NextActiveStep } = useVBHRContext();
  return (
    <section className="verification-step">
      <Box className="profile-details-top">
        <Box className="candidate-profile">
          <img src={ProfilePic} alt="" />
        </Box>
        <Box className="profile-details-text-box">
          <Text className="name">Abhishek Deshmukh</Text>
          <Text className="designation">Software Engieer</Text>
          <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
            Verified
          </Button>
        </Box>
      </Box>
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
        I understand that during the sign-up process and while using this website, I may be required
        to provide certain personal information, including but not limited to my name, email
        address, contact details, and any other information deemed necessary for registration and
        website usage.
      </Text>
      <Text className="policy">Click to view Data and Privacy Policy</Text>
    </section>
  );
};
