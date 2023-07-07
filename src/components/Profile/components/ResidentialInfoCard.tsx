import { Text, Box, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import '../styles/global.scss';
import location from '../assets/location.png';
import { CgSandClock } from 'react-icons/cg';

interface IResidentialInfoCardProps {
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  pincode: number;
  start_date: Date;
  end_date: Date;
  isVerified: boolean;
  city: string;
}

export const ResidentialInfoCard: React.FC<IResidentialInfoCardProps> = ({
  address_line_1,
  address_line_2,
  landmark,
  pincode,
  start_date,
  end_date,
  isVerified,
  city,
}) => {
  return (
    <Box className="residential-card">
      <Box className="top-box">
        <Box className="location">
          <img className="location=img" src={location} alt="Location" />
        </Box>
        <Box className="address-box">
          <Box className="address">
            {address_line_1}, {address_line_2}, {landmark}, {city} {pincode}
          </Box>
          {isVerified ? (
            <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
              Verified
            </Button>
          ) : (
            <Button leftIcon={<CgSandClock size={'16px'} />} className="pending">
              Pending
            </Button>
          )}
        </Box>
      </Box>
      <Box>
        <Text className="since-text">Since</Text>
        <Text className="tenure">
          {start_date.toString().substring(0, 4)} - {end_date.toString().substring(0, 4)}
        </Text>
      </Box>
    </Box>
  );
};
