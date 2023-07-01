import { Text, Box, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import ProfilePic from '../../../Profile/assets/johnMarston.png';
import { useVBHRContext } from '../context/VBHRContext';

const candidateDetails = [
  { label: 'Candidate Company ID', detail: 'INFO001308' },
  { label: 'Department', detail: 'Engineering' },
  { label: 'Designation at work', detail: 'Software Engineer' },
  { label: 'Date of Joining', detail: '13/03/2021' },
  { label: 'Date of Leaving', detail: 'Currently working' },
];

export const VBHRStepOne = () => {
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
      <Box className="profile-details-action-section">
        {candidateDetails.map(({ label, detail }, index) => {
          return (
            <Box className="profile-detail" key={index}>
              <Box className="details">
                <Text className="label">{label}</Text>
                <Text className="detail">{detail}</Text>
              </Box>
              <Box className="profile-details-actions">
                <Button className="green-outline-btn">Approve</Button>
                <Button className="dispute-btn">Dispute</Button>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Text className="verification-disclaimer">
        I understand that during the sign-up process and while using this website, I may be required
        to provide certain personal information, including but not limited to my name, email
        address, contact details, and any other information deemed necessary for registration and
        website usage.
      </Text>
      <Text className="policy">Click to view Data and Privacy Policy</Text>
      <Box className="verification-btns-wrapper">
        <Button className="btn prev-btn">Back</Button>
        <Button className="btn next-btn" onClick={NextActiveStep}>
          Continue and Upload
        </Button>
      </Box>
    </section>
  );
};
