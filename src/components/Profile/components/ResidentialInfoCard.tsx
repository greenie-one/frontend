import { Text, Box, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import '../styles/global.scss';
import location from '../assets/location.png';

interface CardProps {
  address: string;
  tenure: string;
  isVerified: boolean;
}

export const ResidentialInfoCard: React.FC<CardProps> = ({ address, tenure, isVerified }) => {
  return (
    <Box className="residential-card">
      <Box className="top-box">
        <Box className="location">
          <img className="location=img" src={location} alt="Location" />
        </Box>
        <Box>
          <Box className="address">{address}</Box>
          {isVerified ? (
            <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
              Verified
            </Button>
          ) : (
            <Box></Box>
          )}
        </Box>
      </Box>
      <Box>
        <Text className="since-text">Since</Text>
        <Text className="tenure">{tenure}</Text>
      </Box>
    </Box>
  );
};
