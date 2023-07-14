import { Text, Box, Button } from '@mantine/core';
import noData from '../../assets/noData.png';
import { MdOutlineEdit } from 'react-icons/md';
import { useProfileContext } from '../../context/ProfileContext';
import { AiOutlinePlus } from 'react-icons/ai';

export const SkillsSection = () => {
  const { setCandidateActivePage, skillData, scrollToTop } = useProfileContext();

  const handleToggleSkillsDetails = (): void => {
    scrollToTop();
    setCandidateActivePage('All Skills');
  };

  const handleAddSkillPage = () => {
    scrollToTop();
    setCandidateActivePage('Add Skills');
  };

  return (
    <section className="skills-section container">
      <Box className="header">
        <Box>
          <Text className="heading">{`Skills (${skillData.length})`}</Text>
          <Text className="subheading">All your skills, certifications and expertise</Text>
        </Box>
        {skillData.length > 0 && (
          <>
            <Box className="header-links">
              <Text className="link" onClick={handleToggleSkillsDetails}>
                See All Skills
              </Text>
              <Button leftIcon={<MdOutlineEdit />} onClick={handleAddSkillPage} className="edit-btn">
                Edit Section
              </Button>
            </Box>
            <Box className="edit-icon">
              <MdOutlineEdit size={'22px'} onClick={handleAddSkillPage} className="btn" />
            </Box>
          </>
        )}
      </Box>

      {skillData.length === 0 ? (
        <Box className="no-data-wrapper">
          <img className="no-data" src={noData} alt="No data" />
          <Button leftIcon={<AiOutlinePlus />} onClick={handleAddSkillPage} className="add-records">
            Add records
          </Button>
        </Box>
      ) : (
        <Box className="add-skills-wrapper">
          {skillData.map((skill, index) => {
            const { expertise, skillName } = skill;
            return (
              <Box key={index} className="add-skill-box">
                <Text className="add-skill-name">{skillName}</Text>
                {expertise === 'AMATEUR' && <Text className="add-skill-rate">Amature</Text>}
                {expertise === 'BEGINNER' && <Text className="add-skill-rate">Beginner</Text>}
                {expertise === 'HIGHLY_COMPETENT' && <Text className="add-skill-rate">Highly Competent</Text>}
                {expertise === 'EXPERT' && <Text className="add-skill-rate">Expert</Text>}
                {expertise === 'SUPER_SPECIALIST' && <Text className="add-skill-rate">Super Specialist</Text>}
                {expertise === 'MASTER' && <Text className="add-skill-rate">Master</Text>}
              </Box>
            );
          })}
        </Box>
      )}
      {skillData.length > 0 && (
        <Button onClick={handleToggleSkillsDetails} className="see-all-btn">
          See All
        </Button>
      )}
    </section>
  );
};
