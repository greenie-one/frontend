import { Box, Text, Button, RingProgress, Center } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
interface CardProps {
  skill: string;
  percentage: number;
  isVerified: boolean;
}

export const SkillsCard: React.FC<CardProps> = ({ skill, percentage, isVerified }) => {
  return (
    <Box className="skill-card">
      <Box className="skill-img"></Box>
      <Box className="skill-wrapper">
        <RingProgress
          size={80}
          sections={[{ value: percentage, color: '#8CF078' }]}
          roundCaps
          thickness={8}
          label={<Center>{percentage}</Center>}
        />
        <Box>
          <Text className="skill">{skill}</Text>
          {isVerified ? (
            <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
              Verified
            </Button>
          ) : (
            <Box></Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
