import { Text, Box, Button } from '@mantine/core';
import { useProfileContext } from '../context/ProfileContext';

import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import '../styles/global.scss';

export const SeeAllSkills = () => {
  const { detailsPage, dispatchDetailsPage, skillData } = useProfileContext();

  const handleToggleSkillsDetails = (): void => {
    dispatchDetailsPage({
      type: 'SET_SEE_ALL_SKILLS',
      payload: !detailsPage.seeAllSkills,
    });
  };

  return (
    <section className="container">
      <Box className="see-all-header">
        <Box className="go-back-btn" onClick={handleToggleSkillsDetails}>
          <BsArrowLeft className="arrow-left-icon" size={'16px'} />
          <Text>Profile</Text>
          <AiOutlineRight className="arrow-right-icon" size={'16px'} />
        </Box>
        <Text>{`Skills (${skillData.length})`}</Text>
      </Box>

      <Box className="skills-card-wrapper">
        {skillData.reverse().map(({ skillName, expertise, isVerified }, index) => {
          return (
            <Box className="skill-card" key={index}>
              <Box className="skill-card-header">
                <Text className="designation">{skillName}</Text>
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

              <Text className="skill-rate">
                {expertise === 'AMATEUR' && 'Amature'}
                {expertise === 'EXPERT' && 'Expert'}
              </Text>

              <Box className="skill-btn-wrapper">
                {isVerified ? (
                  <Button className="view-details-btn">View details</Button>
                ) : (
                  <Button mt={'8px'} className="get-verified">
                    Get Verified
                  </Button>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </section>
  );
};
