import { Box, Text, Chip, Group, CopyButton } from '@mantine/core';
import { useState, useEffect } from 'react';
import level from '../assets/level.png';
import levelFilled from '../assets/levelFilled.png';
import medal from '../assets/medal.png';
import copyIcon from '../assets/content_copy.png';
import { MdVerified } from 'react-icons/md';
import { useMediaQuery } from '@mantine/hooks';
import { useProfileContext } from '../context/ProfileContext';
import axios from 'axios';
import ApiList from '../../../assets/api/ApiList';
import { useLocalStorage } from '@mantine/hooks';

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

interface UserProfile {
  firstName: string;
  lastName: string;
  descriptionTags: string[];
}

export const BioSection = () => {
  const [userLevel, setUserLevel] = useState(0);
  const [greeneId, setGreenieId] = useState('GRN788209');
  const screenSize = useMediaQuery('(min-width: 768px)');

  const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens>({ key: 'auth-tokens' });

  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  const getProfile = async () => {
    try {
      const res = await axios.get<UserProfile>(ApiList.getMyProfile, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      if (res.data && authTokens?.accessToken) {
        setProfileData(res.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section className="bio-section container">
      <Box className="bio-name-box">
        <Text className="bio-name">
          {profileData?.firstName} <span>{profileData?.lastName}</span>
        </Text>
        <MdVerified className="name-verified" size={'20px'} />
      </Box>

      <Box className="chips">
        <Chip.Group>
          <Group>
            {profileData?.descriptionTags.map((tag) => (
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
              <Text className="top-text">Among Top</Text>
              <Text className="percentage">2%</Text>
            </Box>
          </Box>
        </Box>
        <Box className="border-left"></Box>
        <Box className="right-section">
          <CopyButton value={greeneId} timeout={2000}>
            {({ copied, copy }) => (
              <Box className="greenie-id" onClick={copy}>
                <Box className="icon-box">
                  <img src={copyIcon} alt="copy" className="greenie-id-icon" />
                </Box>

                <Box>
                  <Text className="greenie-id-heading">Share Greenie ID </Text>
                  {copied ? (
                    <Text className="id">Copied</Text>
                  ) : (
                    <Text className="id">{greeneId}</Text>
                  )}
                </Box>
              </Box>
            )}
          </CopyButton>
        </Box>
      </Box>
      <Text className="bio-text">
        With over 20 years of experience in engineering leadership, John Smith is a seasoned
        professional who has consistently driven success in complex and dynamic environments.
      </Text>
    </section>
  );
};
