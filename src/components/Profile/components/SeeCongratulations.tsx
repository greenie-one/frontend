import { Text, Box, Title, Button } from '@mantine/core';
import { useProfileContext } from '../context/ProfileContext';
import { BioSection } from '../sections/BioSection';
import checkGif from '../assets/94109-confirmation 1.gif';

export const SeeCongratulations = () => {
  const { detailsPage, dispatchDetailsPage, setAadharIsVerified, scrollToTop } =
    useProfileContext();

  const handleContinue = () => {
    scrollToTop();
    setAadharIsVerified(false);
    dispatchDetailsPage({
      type: 'SET_SEE_CONGRATULATIONS_SCREEN',
      payload: !detailsPage.seeCongratulations,
    });
  };

  return (
    <Box className="congratulations-screen">
      <Box className="container">
        <img src={checkGif} className="checkedImg" alt="Checked" />
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

        <Button className="primaryBtn" onClick={handleContinue}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};
