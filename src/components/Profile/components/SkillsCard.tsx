import { Box, Text, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';

interface CardProps {
  skillName: string;
  expertise: string;
  isVerified: boolean;
}

export const SkillsCard: React.FC<CardProps> = ({ skillName, expertise, isVerified }) => {
  return (
    <Box className="skill-card">
      <Box className="skill-img"></Box>
      <Box className="skill-wrapper">
        <Text className="skill-rate">
          {expertise === 'AMATEUR' && 'Amature'}
          {expertise === 'EXPERT' && 'Expert'}
        </Text>
        <Box>
          <Text className="skill">{skillName}</Text>
          {isVerified ? (
            <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
              Verified
            </Button>
          ) : (
            <Button leftIcon={<CgSandClock color="#FF7272" size={'16px'} />} className="pending">
              Pending
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
