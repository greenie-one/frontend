import { Text, Box, Button } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { Navbar } from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { skillExpertiseDict } from '../../../constants/dictionaries';

export const AllSkills = () => {
  const navigate = useNavigate();
  const { skillData } = useGlobalContext();

  const handleProfilePage = () => {
    navigate('/candidate/profile');
  };

  const uniqueSkills = [...new Set(skillData.map((skill) => skill.skillName))];

  return (
    <>
      <Navbar />
      <main className="profile">
        <section className="container" style={{ marginTop: '7rem' }}>
          <Box className="see-all-header">
            <Box className="go-back-btn" onClick={handleProfilePage}>
              <BsArrowLeft className="arrow-left-icon" size={'16px'} />
              <Text>Profile</Text>
              <AiOutlineRight className="arrow-right-icon" size={'16px'} />
            </Box>
            <Text>{`Skills (${uniqueSkills.length})`}</Text>
          </Box>
          <Box className="skills-card-wrapper">
            {uniqueSkills.reverse().map((skillName, index) => {
              const skill = skillData.find((skill) => skill.skillName === skillName);
              const expertise = skill?.expertise;
              const isVerified = skill?.isVerified;

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
                  {expertise && <Text className="skill-rate">{skillExpertiseDict[expertise]}</Text>}
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
      </main>
    </>
  );
};
