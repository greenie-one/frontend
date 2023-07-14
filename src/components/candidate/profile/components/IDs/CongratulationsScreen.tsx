import { Text, Box, Title, Button, Chip, Group, CopyButton } from '@mantine/core';
import { useProfileContext } from '../../context/ProfileContext';
import { MdVerified, MdOutlineContentCopy } from 'react-icons/md';
import checkGif from '../../assets/94109-confirmation 1.gif';
import level from '../../assets/level.png';
import levelFilled from '../../assets/levelFilled.png';
import medal from '../../assets/medal.png';
import { useMediaQuery } from '@mantine/hooks';

export const CongratulationsScreen = () => {
  const { setAadharIsVerified, scrollToTop, setCandidateActivePage, profileData, documentsData } = useProfileContext();

  const userLevel = 0;
  const greeneId = 'GRN788209';
  const screenSize = useMediaQuery('(min-width: 768px)');
  const handleContinue = () => {
    scrollToTop();
    setAadharIsVerified(false);
    setCandidateActivePage('Profile');
  };

  return (
    <Box className="congratulations-screen">
      <Box className="container">
        <img src={checkGif} className="checkedImg" alt="Checked" />
        <Title className="title">Congratulations!</Title>
        <Text className="sub-title">You are a part of the Greenie Community</Text>
        <Text className="sub-text">You have achieved a star rating. You are among top 2% on Greenie.</Text>
        <Box className="congrats-profile-section">
          <Box className="profile-section">
            <Box className="cover-photo"></Box>
            <Box className="profile-photo"></Box>
          </Box>
          <Box className="bio-section container">
            <Box className="bio-name-box">
              <Text className="bio-name">
                {profileData.firstName} {profileData.lastName}
              </Text>
              {documentsData.length > 0 && <MdVerified className="name-verified" size={'20px'} />}
            </Box>

            <Box className="chips">
              <Chip.Group>
                <Group>
                  {profileData.descriptionTags.map((tag: string) => (
                    <Chip key={tag} size={screenSize ? 'sm' : 'xs'}>
                      {tag}
                    </Chip>
                  ))}
                </Group>
              </Chip.Group>
            </Box>

            <Box className="bio-section-wrapper">
              <Box className="left-section">
                <Box className="level">
                  <Text className="level-heading">Level {userLevel}</Text>
                  {userLevel === 0 ? (
                    <Box className="level-wrapper">
                      <img className="level-img" src={level} alt="level" />
                      <img className="level-img" src={level} alt="level" />
                      <img className="level-img" src={level} alt="level" />
                      <img className="level-img" src={level} alt="level" />
                      <img className="level-img" src={level} alt="level" />
                    </Box>
                  ) : (
                    <Box className="level-wrapper">
                      {userLevel > 0 ? (
                        <img className="level-img" src={levelFilled} alt="level" />
                      ) : (
                        <img src={level} alt="level" />
                      )}
                      {userLevel > 1 ? (
                        <img className="level-img" src={levelFilled} alt="level" />
                      ) : (
                        <img className="level-img" src={level} alt="level" />
                      )}
                      {userLevel > 2 ? (
                        <img className="level-img" src={levelFilled} alt="level" />
                      ) : (
                        <img className="level-img" src={level} alt="level" />
                      )}
                      {userLevel > 3 ? (
                        <img className="level-img" src={levelFilled} alt="level" />
                      ) : (
                        <img className="level-img" src={level} alt="level" />
                      )}
                      {userLevel > 4 ? (
                        <img className="level-img" src={levelFilled} alt="level" />
                      ) : (
                        <img className="level-img" src={level} alt="level" />
                      )}
                    </Box>
                  )}
                </Box>
                <Box className="border-left"></Box>

                <Box className="medal-wrapper">
                  <img className="medal-icon" src={medal} alt="Medal Icon" />
                  <Box className="medal-text-box">
                    <Text className="top-text">No rank</Text>
                    <Text className="percentage">#</Text>
                  </Box>
                </Box>
              </Box>
              <Box className="border-left"></Box>
              <Box className="right-section">
                {documentsData.length > 0 ? (
                  <CopyButton value={greeneId} timeout={2000}>
                    {({ copied, copy }) => (
                      <Box className="greenie-id" onClick={copy}>
                        <Box className="icon-box">
                          <MdOutlineContentCopy size={'18px'} color="#17a672" />
                        </Box>

                        <Box>
                          <Text className="greenie-id-heading">Share Greenie ID </Text>
                          {copied ? <Text className="id">Copied</Text> : <Text className="id">{greeneId}</Text>}
                        </Box>
                      </Box>
                    )}
                  </CopyButton>
                ) : (
                  <Box className="verify-id-bio-text">
                    <Text className="text-subheading">Verify your identity </Text>
                    <Text className="text-subheading">and get a {<MdVerified color="#8cf078" />} Greenie Check</Text>
                  </Box>
                )}
              </Box>
            </Box>
            <Text className="bio-text">{profileData.bio}</Text>
          </Box>
        </Box>

        <Button className="primaryBtn" onClick={handleContinue}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};
