import { Box, Button } from '@mantine/core';
import emptyProfile from '../assets/emptyProfile.png';
import { MdOutlineEdit } from 'react-icons/md';
export const ProfilePhotos = () => {
  return (
    <section className="profile-section">
      <Box className="cover-photo">
        <Button leftIcon={<MdOutlineEdit />} className="edit-btn">
          Update Cover
        </Button>
      </Box>
      <Box className="profile-photo">
        <Button leftIcon={<MdOutlineEdit />} className="edit-btn">
          Change picture
        </Button>
        <img src={emptyProfile} alt="Profile Picture" />
      </Box>
    </section>
  );
};
