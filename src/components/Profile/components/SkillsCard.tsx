import { Box, Text, Button } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
interface CardProps {
  skill: string;
  skillRate: number;
  isVerified: boolean;
}

export const SkillsCard: React.FC<CardProps> = ({ skill, skillRate, isVerified }) => {
  return (
    <Box className="skill-card">
      <Box className="skill-img"></Box>
      <Box className="skill-wrapper">
        <Text className="skill-rate">
          {skillRate === 0 && 'Amature'}
          {skillRate === 1 && 'Intermediate'}
          {skillRate === 2 && 'Expert'}
        </Text>
        <Box>
          <Text className="skill">{skill}</Text>
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
