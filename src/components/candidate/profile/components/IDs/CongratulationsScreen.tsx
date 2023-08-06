import { Text, Box, Title, Button, Chip, Group, CopyButton } from '@mantine/core';
import { MdVerified, MdOutlineContentCopy } from 'react-icons/md';
import checkGif from '../../assets/94109-confirmation 1.gif';
import level from '../../assets/level.png';
import levelFilled from '../../assets/levelFilled.png';
import medal from '../../assets/medal.png';
import { useMediaQuery } from '@mantine/hooks';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { Layout } from '../Layout';
import emptyProfile from '../../assets/emptyProfile.png';
import { useNavigate } from 'react-router-dom';

export const CongratulationsScreen = () => {
  const navigate = useNavigate();
  const { scrollToTop, profileData } = useGlobalContext();

  const userLevel = 1;
  const greeneId = profileData?.greenieId ?? '';
  const screenSize = useMediaQuery('(min-width: 768px)');

  const handleContinue = () => {
    scrollToTop();
    navigate('/candidate/profile');
  };

  return (
    <Layout>
      <Box className="congratulations-screen">
        <Box className="container">
          <img src={checkGif} className="checkedImg" alt="Checked" />
          <Title className="title">Congratulations!</Title>
          <Text className="sub-title">You are a part of the Greenie Community</Text>
          <Text className="sub-text">You have achieved a star rating. You are among top 2% on Greenie.</Text>
          <Box className="congrats-profile-section">
            <Box className="profile-section">
              <Box className="cover-photo"></Box>
              <Box className="profile-photo">
                {profileData.profilePic ? (
                  <img src={profileData.profilePic} alt="emptyProfile" />
                ) : (
                  <img src={emptyProfile} alt="emptyProfile" />
                )}
              </Box>
            </Box>
            <Box className="bio-section container">
              <Box className="bio-name-box">
                <Text className="bio-name">
                  {profileData.firstName} {profileData.lastName}
                  <span>
                    <MdVerified size={'19px'} color="#8cf078" />
                  </span>
                </Text>
              </Box>

              <Box>
                <Chip.Group>
                  <Group className="chips">
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

                    <Box className="level-wrapper">
                      <img className="level-img" src={levelFilled} alt="level" />
                      <img className="level-img" src={level} alt="level" />
                      <img className="level-img" src={level} alt="level" />
                      <img className="level-img" src={level} alt="level" />
                      <img className="level-img" src={level} alt="level" />
                    </Box>
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
    </Layout>
  );
};
