import { Text, Box } from '@mantine/core';
import { useProfileContext } from '../../Profile/context/ProfileContext';
import profileImg from '../../Profile/assets/johnMarston.png';
import starImg from '../assets/star.png';
import { MdVerified } from 'react-icons/md';

export const ProfileBar = () => {
  const { profileData } = useProfileContext();
  return (
    <Box>
      <Box className="profile-bar-profile-details">
        <Box className="left-box">
          <Box className="image-box">
            <img src={profileImg} alt="Profile Image" />
            <MdVerified color="#17a672" className="verified-icon" size={'24px'} />
          </Box>

          <Box className="name-box">
            <Text className="name">
              {profileData.firstName} {profileData.lastName}
            </Text>
            <Text className="designation">Software Engineer</Text>
          </Box>
        </Box>
        <Box className="right-box">
          <img src={starImg} alt="star Image" />
          <Text className="ratings">4.5 star</Text>
        </Box>
      </Box>
    </Box>
  );
};
