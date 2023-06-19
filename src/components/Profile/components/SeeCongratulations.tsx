import { Text, Box, Title, Button, Modal, CopyButton } from '@mantine/core';
import { useProfileContext } from '../context/ProfileContext';
import { BioSection } from '../sections/BioSection';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { MdVerified, MdOutlineContentCopy } from 'react-icons/md';

export const SeeCongratulations = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { detailsPage, dispatchDetailsPage } = useProfileContext();
  const greeneId = 'GRN788209';

  const handleContinue = () => {
    dispatchDetailsPage({
      type: 'SET_SEE_CONGRATULATIONS_SCREEN',
      payload: !detailsPage.seeCongratulations,
    });
  };

  return (
    <Box className="congratulations-screen">
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
          <Box className="greenie-copy-box">
            <Text className="greenie-id">{greeneId}</Text>
            <Box className="buttons-wrapper">
              <Button leftIcon={<MdVerified color="#8CF078" size={'18px'} />} className="verified">
                Verified
              </Button>
              <CopyButton value={greeneId} timeout={2000}>
                {({ copied, copy }) => (
                  <Box>
                    {copied ? (
                      <Button
                        className="copy-btn"
                        leftIcon={<MdOutlineContentCopy size={'15px'} />}
                      >
                        Copied
                      </Button>
                    ) : (
                      <Button
                        className="copy-btn"
                        onClick={copy}
                        leftIcon={<MdOutlineContentCopy size={'15px'} />}
                      >
                        Copy
                      </Button>
                    )}
                  </Box>
                )}
              </CopyButton>
            </Box>
          </Box>

          <Button className="primaryBtn" onClick={handleContinue}>
            Continue
          </Button>
        </Box>
      </Modal>
      <Box className="container">
        <Title className="title">Congratulations!</Title>
        <Text className="sub-title">You are a part of the Greenie Community</Text>
        <Text className="sub-text">
          You have achieved a star rating. You are among top 2% on Greenie.
        </Text>
        <Box className="congrats-profile-section">
          <Box className="profile-section">
            <Box className="cover-photo"></Box>
            <Box className="profile-photo"></Box>
          </Box>
          <BioSection />
        </Box>

        <Button className="primaryBtn" onClick={open}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};
