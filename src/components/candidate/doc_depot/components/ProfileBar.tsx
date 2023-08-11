import { Text, Box } from '@mantine/core';
import emptyProfile from '../../profile/assets/emptyProfile.png';

import starImg from '../assets/star.png';
import { MdVerified } from 'react-icons/md';
import { useGlobalContext } from '../../../../context/GlobalContext';

export const ProfileBar = () => {
  const { profileData, IDs } = useGlobalContext();

  return (
    <Box>
      <Box className="profile-bar-profile-details">
        <Box className="left-box">
          {profileData?.profilePic ? (
            <Box className="image-box">
              <img src={profileData?.profilePic} alt="Profile Image" />
            </Box>
          ) : (
            <Box className="image-box">
              <img src={emptyProfile} alt="Profile Image" />
              {IDs?.length > 0 && <MdVerified color="#17a672" className="verified-icon" size={'24px'} />}
            </Box>
          )}

          <Box className="name-box">
            <Text className="name">
              {profileData?.firstName} {profileData?.lastName}
            </Text>
          </Box>
        </Box>
        <Box className="right-box">
          <img src={starImg} alt="star Image" />
          <Text className="ratings">0 star</Text>
        </Box>
      </Box>
    </Box>
  );
};
