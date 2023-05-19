import { Box } from '@mantine/core';
import emptyProfile from '../assets/emptyProfile.png';
export const ProfilePhotos = () => {
  return (
    <Box className="profile-section">
      <Box className="cover-photo"></Box>
      <Box className="profile-photo">
        <img src={emptyProfile} alt="Profile Picture" />
      </Box>
    </Box>
  );
};
