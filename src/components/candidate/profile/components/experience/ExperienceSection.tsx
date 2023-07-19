import { Text, Box, Button } from '@mantine/core';
import noData from '../../assets/noData.png';
import { MdOutlineEdit } from 'react-icons/md';
import { ExperienceCard } from './ExperienceCard';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export const ExperienceSection = () => {
  const { workExperienceData, scrollToTop } = useGlobalContext();
  const navigate = useNavigate();

  const handleAllExperiencePage = (): void => {
    navigate('/candidate/profile/experience/allExperiences');
    scrollToTop();
  };

  const handleAddWorkExperiencePage = () => {
    navigate('/candidate/profile/experience/addExperience');
    scrollToTop();
  };

  const handleDetailsPage = (id: string) => {
    scrollToTop();
    navigate(`/candidate/profile/experience/${id}`);
  };

  return (
    <section className="experience-section container">
      <Box className="header">
        <Box>
          <Text className="heading">{`Work Experience (${workExperienceData.length})`}</Text>
          <Text className="subheading">All your past and present work experience</Text>
        </Box>

        {workExperienceData.length > 0 && (
          <>
            <Box className="header-links">
              <Text className="link" onClick={handleAllExperiencePage}>
                See All Experiences
              </Text>
              <Button leftIcon={<MdOutlineEdit />} onClick={handleAddWorkExperiencePage} className="edit-btn">
                Edit Section
              </Button>
            </Box>
            <Box className="edit-icon" onClick={handleAddWorkExperiencePage}>
              <MdOutlineEdit size={'22px'} className="btn" />
            </Box>
          </>
        )}
      </Box>

      {workExperienceData.length === 0 ? (
        <Box className="no-data-wrapper">
          <img className="no-data" src={noData} alt="No data" />

          <Button leftIcon={<AiOutlinePlus />} onClick={handleAddWorkExperiencePage} className="add-records">
            Add records
          </Button>
        </Box>
      ) : (
        <Box className="section-cards-wrapper">
          {workExperienceData
            .reverse()
            .slice(0, 3)
            .map((workExperience, index) => {
              return (
                <Box key={index} onClick={() => handleDetailsPage(workExperience.id)}>
                  <ExperienceCard
                    position={workExperience.designation}
                    companyName={workExperience.companyName}
                    isVerified={workExperience.isVerified}
                    companyStartYear={workExperience.companyStartDate}
                    companyEndYear={workExperience.companyEndDate}
                  />
                </Box>
              );
            })}
        </Box>
      )}
      {workExperienceData.length > 0 && (
        <Button onClick={handleAllExperiencePage} className="see-all-btn">
          See All
        </Button>
      )}
    </section>
  );
};
