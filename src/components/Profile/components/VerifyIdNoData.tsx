import { Text, Box } from '@mantine/core';
import janeCooper from '../assets/janeCooper.png';
import johnMarston from '../assets/johnMarston.png';
import flyoMiles from '../assets/flyodMiles.png';
import { MdVerified } from 'react-icons/md';

export const VerifyIdNoData = () => {
  return (
    <Box className="verify-data-no-data-card-wrapper">
      <Box className="hidden-card">
        <img className="card-img" src={janeCooper} alt="Profile Picture" />
        <Text className="card-text">Jane Cooper </Text>
      </Box>
      <Box className="card">
        <img className="card-img" src={johnMarston} alt="Profile Picture" />
        <Text className="card-text">{`John Marston`} </Text>
      </Box>
      <Box className="hidden-card">
        <img className="card-img" src={flyoMiles} alt="Profile Picture" />
        <Text className="card-text">Floyd Miles</Text>
      </Box>
    </Box>
  );
};
