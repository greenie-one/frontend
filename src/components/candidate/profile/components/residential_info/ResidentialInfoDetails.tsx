import { Box, Text, Title, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import location from '../../assets/location.png';

export const ResidentialInfoDetails: React.FC<ResidentialInfoDetailsCardProps> = ({
  address_line_1,
  address_line_2,
  landmark,
  pincode,
  start_date,
  end_date,
  isVerified,
  city,
  address_type,
  state,
  country,
}) => {
  return (
    <Box className="info-detail-box">
      <Box className="info-detail-top-box">
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
      <Box className="wrapper">
        <Title className="title">Other information</Title>
        <Box className="other-info-box">
          <Box className="detail-box">
            <Title className="title">Address Type</Title>
            <Text className="detail">{address_type}</Text>
          </Box>
          <Box className="detail-box">
            <Title className="title">Tenure</Title>
            <Text className="detail">
              {start_date.toString().substring(0, 4)} - {end_date.toString().substring(0, 4)}{' '}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box className="wrapper">
        <Title className="title">About Residence</Title>
        <Box className="about-info-box">
          <Box className="detail-box">
            <Title className="title">Address line 1</Title>
            <Text className="detail">{address_line_1}</Text>
          </Box>
          <Box className="detail-box">
            <Title className="title">Address line 2</Title>
            <Text className="detail">{address_line_2}</Text>
          </Box>
        </Box>
      </Box>
      <Box className="wrapper">
        <Title className="title">Geographic Information</Title>
        <Box className="geo-info-box">
          <Box className="detail-box">
            <Title className="title">Landmark</Title>
            <Text className="detail">{landmark}</Text>
          </Box>
          <Box className="detail-box">
            <Title className="title">Pincode</Title>
            <Text className="detail">{pincode}</Text>
          </Box>
          <Box className="detail-box">
            <Title className="title">City</Title>
            <Text className="detail">{city}</Text>
          </Box>
          <Box className="detail-box">
            <Title className="title">State</Title>
            <Text className="detail">{state}</Text>
          </Box>
          <Box className="detail-box">
            <Title className="title">Country</Title>
            <Text className="detail">{country}</Text>
          </Box>
          <Box className="detail-box">
            <Title className="title">Google maps</Title>
            <Text className="detail details-link">Click to locate</Text>
          </Box>
        </Box>
      </Box>
      <Box className="experience-details-links">
        <Text className="details-link">Show Documents</Text>
        <Text className="details-link">Show Skills</Text>
      </Box>
    </Box>
  );
};
