import { Text, Box, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';

export const ExperienceCard: React.FC<ExperienceCardProp> = ({
  position,
  companyName,
  isVerified,
  companyStartYear,
  companyEndYear,
}) => {
  return (
    <Box className="experience-card">
      <Box>
        <Text className="companyName">{companyName.substring(0, 25)}</Text>
        <Text className="position">{position.substring(0, 25)}</Text>
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
          <Text> {companyStartYear?.toString().substring(3, 15)} - Present</Text>
        ) : (
          <Text className="tenure">
            {companyStartYear?.toString().substring(3, 15)} - {companyEndYear?.toString().substring(3, 15)}
          </Text>
        )}
      </Box>
    </Box>
  );
};
