import { Text, Modal, Box, Title, Button, CopyButton } from '@mantine/core';
import { MdVerified, MdOutlineContentCopy } from 'react-icons/md';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useProfileContext } from '../context/ProfileContext';
import emptyProfile from '../assets/emptyProfile.png';
import { BioSection } from '../sections/BioSection';

export const SeeCongratulations = () => {
  const greeneId = 'GRN788209';
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const { detailsPage, dispatchDetailsPage } = useProfileContext();

  const handleContinue = () => {
    dispatchDetailsPage({
      type: 'SET_SEE_CONGRATULATIONS_SCREEN',
      payload: !detailsPage.seeCongratulations,
    });
  };

  return (
    <Box className="container congratulations-screen">
      <Modal
        centered
        className="modal"
        size={'55%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
      >
        <Box className="congratulations-modal">
          <Title className="title">Your Profile is now verified</Title>
          <Text className="sub-title">Here is your Greenie ID</Text>
          <Text className="greenie-id">{greeneId}</Text>
          <Box className="buttons-wrapper">
            <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
              Verified
            </Button>
            <CopyButton value={greeneId} timeout={2000}>
              {({ copied, copy }) => (
                <Box>
                  {copied ? (
                    <Button className="copy-btn" leftIcon={<MdOutlineContentCopy size={'16px'} />}>
                      Copied
                    </Button>
                  ) : (
                    <Button
                      className="copy-btn"
                      onClick={copy}
                      leftIcon={<MdOutlineContentCopy size={'16px'} />}
                    >
                      Copy
                    </Button>
                  )}
                </Box>
              )}
            </CopyButton>
          </Box>
          <Button className="primaryBtn" onClick={handleContinue}>
            Continue
          </Button>
        </Box>
      </Modal>
      <Title>Congratulations!</Title>
      <Text>You are a part of the Greenie Community</Text>
      <Text>You have achieved a star rating. You are among top 2% on Greenie.</Text>
      <Box className="profile-section">
        <Box className="cover-photo"></Box>
        <Box className="profile-photo">
          <img src={emptyProfile} alt="Profile Picture" />
        </Box>
      </Box>
      <BioSection />
      <Button className="primaryBtn" onClick={open}>
        Continue
      </Button>
    </Box>
  );
};
