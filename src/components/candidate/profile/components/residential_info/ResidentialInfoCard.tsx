import { Text, Box, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import location from '../../assets/location.png';
import { CgSandClock } from 'react-icons/cg';

const formattedDate = (data: string) => {
  return data?.substring(0, 10).split('-').reverse().join('-');
};

export const ResidentialInfoCard: React.FC<ResidentialInfoCardProps> = ({
  address_line_1,
  address_line_2,
  landmark,
  pincode,
  start_date,
  end_date,
  isVerified,
  city,
  addressType,
}) => {
  return (
    <Box className="residential-card">
      <Box className="top-box">
        <Box className="location">
          <img className="location=img" src={location} alt="Location" />
        </Box>
        <Box className="address-box">
          <Box className="address">
            {address_line_1} {address_line_2}, {landmark}, {city} {pincode}
          </Box>
          <Box className="address-type">{addressType}</Box>
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
      <Box className="card-footer">
        <Text className="since-text">Since</Text>
        <Text className="tenure">
          {formattedDate(String(start_date))} to {end_date ? formattedDate(String(end_date)) : 'Present'}
        </Text>
      </Box>
    </Box>
  );
};
