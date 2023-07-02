import '../styles/global.scss';
import { useProfileContext } from '../context/ProfileContext';
import { Text, Box, Button, createStyles, em, rem } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';

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
        {skillData.reverse().map(({ _id, skillName, expertise, isVerified }, index) => {
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

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: '10px',
    marginBottom: '10px',
  },

  icon: {
    marginTop: '16px',
  },

  input: {
    height: '58px',
    paddingTop: '18px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid #D1D4DB',
    lineHeight: '19px',
    letterSpacing: '-0.02em',
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      height: '46px',
      borderRadius: '6px',
      fontSize: '10px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },

  innerInput: {
    height: rem(54),
    paddingTop: rem(28),

    [`@media screen and (max-width: ${em(1024)})`]: {
      paddingTop: rem(8),
    },
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: '12px',
    paddingLeft: '14px',
    paddingTop: '7px',
    lineHeight: '14.52px',
    letterSpacing: '-0.02em',
    zIndex: 1,
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      fontSize: '10px',
      lineHeight: '10px',
      paddingTop: '8px',
    },
  },
}));
