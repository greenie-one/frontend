import { Text, Box, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import '../styles/global.scss';

interface CardProps {
  position: string;
  companyLogo: string;
  companyName: string;
  isVerified: boolean;
  tenure: string;
  verifierName: string;
  verifierImg: string;
  verifierTestimonial: string;
}

export const WorkExperienceCard: React.FC<CardProps> = ({
  position,
  companyLogo,
  companyName,
  isVerified,
  tenure,
  verifierName,
  verifierImg,
  verifierTestimonial,
}) => {
  return (
    <Box className="experience-card">
      <Box className="companyLogo">
        <img src={companyLogo} alt="Company Logo" />
      </Box>
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
        <Text className="tenure">{tenure}</Text>
      </Box>
      <Text className="testimonial">{verifierTestimonial}</Text>
      <Box className="verifier">
        <img className="verifier-img" src={verifierImg} alt="verifier Image" />
        <Text className="verified-by">Verified by</Text>
        <Text className="verifier-name">{verifierName}</Text>
      </Box>
    </Box>
  );
};
