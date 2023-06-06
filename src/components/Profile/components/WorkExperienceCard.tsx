import { Text, Box, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import '../styles/global.scss';

interface CardProps {
  position: string;
  companyName: string;
  isVerified: boolean;
  companyStartYear: string;
  companyEndYear: string;
}

export const WorkExperienceCard: React.FC<CardProps> = ({
  position,
  companyName,
  isVerified,
  companyStartYear,
  companyEndYear,
}) => {
  return (
    <Box className="experience-card">
      <Box className="companyLogo"></Box>
      <Text className="position">{position}</Text>
      <Text className="companyName">{companyName}</Text>
      {isVerified ? (
        <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
          Verified
        </Button>
      ) : (
        <Box></Box>
      )}

      <Box className="tenure-box">
        <Text className="since-text">Since</Text>
        <Text className="tenure">
          {companyStartYear.substring(0, 4)}-{companyEndYear.substring(0, 4)}
        </Text>
      </Box>
    </Box>
  );
};
