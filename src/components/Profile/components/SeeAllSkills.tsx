import '../styles/global.scss';
import { useProfileContext } from '../context/ProfileContext';
import { Text, Modal, Box, Button, Title } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { RiDeleteBin6Line } from 'react-icons/ri';

const data = [
  { designation: 'Software developer', skillRate: 'Amature', isVerified: true },
  { designation: 'Software developer', skillRate: 'Amature', isVerified: false },
  { designation: 'Software developer', skillRate: 'Amature', isVerified: true },
  { designation: 'Software developer', skillRate: 'Amature', isVerified: true },
  { designation: 'Software developer', skillRate: 'Amature', isVerified: false },
  { designation: 'Software developer', skillRate: 'Amature', isVerified: true },
];

export const SeeAllSkills = () => {
  const { handleToggleSkillsDetails, skillData } = useProfileContext();
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
        {data.map(({ designation, skillRate, isVerified }, index) => {
          return (
            <Box className="skill-card" key={index}>
              <Box className="skill-card-header">
                <Text className="designation">{designation}</Text>
                {isVerified ? (
                  <Button
                    leftIcon={<MdVerified color="#8CF078" size={'16px'} />}
                    className="verified"
                  >
                    Verified
                  </Button>
                ) : (
                  <Button
                    leftIcon={<CgSandClock color="#FF7272" size={'16px'} />}
                    className="pending"
                  >
                    Pending
                  </Button>
                )}
              </Box>
              <Text className="skill-rate">{skillRate}</Text>
              <Box className="skill-btn-wrapper">
                {isVerified ? (
                  <Button className="view-details-btn">View details</Button>
                ) : (
                  <Button mt={'8px'} className="get-verified">
                    Get Verified
                  </Button>
                )}

                <Box className="delete-icon">
                  <RiDeleteBin6Line size={'22px'} color="#697082" />
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </section>
  );
};
