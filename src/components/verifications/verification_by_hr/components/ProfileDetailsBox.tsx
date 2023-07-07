import { MdVerified } from 'react-icons/md';
import ProfilePic from '../../../Profile/assets/johnMarston.png';
import { Text, Box, Button } from '@mantine/core';

export const ProfileDetailsBox = () => {
  return (
    <Box className="profile-details-top">
      <Box className="candidate-profile">
        <img src={ProfilePic} alt="" />
      </Box>
      <Box className="profile-details-text-box">
        <Text className="name">Abhishek Deshmukh</Text>
        <Text className="designation">Software Engieer</Text>
        <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
          Verified
        </Button>
      </Box>
    </Box>
  );
};
