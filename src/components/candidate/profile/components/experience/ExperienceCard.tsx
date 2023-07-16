import { Text, Box, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import tscLogo from '../../assets/tscLogo.png';

export const ExperienceCard: React.FC<ExperienceCardProp> = ({
  position,
  companyName,
  isVerified,
  companyStartYear,
  companyEndYear,
}) => {
  return (
    <Box className="experience-card">
      <img className="companyLogo" src={tscLogo} />
      <Box>
        <Text className="position">{position}</Text>
        <Text className="companyName">{companyName}</Text>
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

      <Box className="tenure-box">
        <Text className="since-text">Since</Text>

        {companyEndYear === null ? (
          <Text> {companyStartYear?.toString().substring(0, 4)}-Present</Text>
        ) : (
          <Text className="tenure">
            {companyStartYear?.toString().substring(0, 4)}-{companyEndYear?.toString().substring(0, 4)}
          </Text>
        )}
      </Box>
    </Box>
  );
};
