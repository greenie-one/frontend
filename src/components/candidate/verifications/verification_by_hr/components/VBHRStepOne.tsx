import { Text, Box, Button, Modal } from '@mantine/core';
import { ProfileDetailsBox } from './ProfileDetailsBox';
import { useVerificationContext } from '../context/VerificationContext';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';

const candidateDetails = [
  { label: 'Candidate Company ID', detail: 'INFO001308' },
  { label: 'Department', detail: 'Engineering' },
  { label: 'Designation at work', detail: 'Software Engineer' },
  { label: 'Date of Joining', detail: '13/03/2021' },
  { label: 'Date of Leaving', detail: 'Currently working' },
];

export const VBHRStepOne = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const { NextActiveStep } = useVerificationContext();
  return (
    <section className="verification-step">
      <Modal centered size={'75%'} fullScreen={isMobile} opened={opened} onClose={close}></Modal>
      <ProfileDetailsBox />
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
                <Button className="dispute-btn" onClick={open}>
                  Dispute
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Text className="verification-disclaimer">
        I understand that during the sign-up process and while using this website, I may be required to provide certain
        personal information, including but not limited to my name, email address, contact details, and any other
        information deemed necessary for registration and website usage.
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
