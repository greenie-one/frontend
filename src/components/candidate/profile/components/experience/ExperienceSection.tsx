import { Text, Box, Button } from '@mantine/core';
import noData from '../../assets/noData.png';
import { MdOutlineEdit } from 'react-icons/md';
import { ExperienceCard } from './ExperienceCard';
import { useProfileContext } from '../../context/ProfileContext';
import { AiOutlinePlus } from 'react-icons/ai';

export const ExperienceSection = () => {
  const { workExperienceData, scrollToTop, setCandidateActivePage, setSelectedExperience } = useProfileContext();

  const handleToggleWorkExperienceDetails = (): void => {
    scrollToTop();
    setCandidateActivePage('All Experiences');
  };

  const handleWorkExperiencePage = () => {
    scrollToTop();
    setCandidateActivePage('Add Experience');
  };

  const handleGoToVerification = (experience: WorkExperience) => {
    setCandidateActivePage('All Experiences');
    setSelectedExperience(experience);
    scrollToTop();
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
              <Text className="link" onClick={handleToggleWorkExperienceDetails}>
                See All Experiences
              </Text>
              <Button leftIcon={<MdOutlineEdit />} onClick={handleWorkExperiencePage} className="edit-btn">
                Edit Section
              </Button>
            </Box>
            <Box className="edit-icon" onClick={handleWorkExperiencePage}>
              <MdOutlineEdit size={'22px'} className="btn" />
            </Box>
          </>
        )}
      </Box>

      {workExperienceData.length === 0 ? (
        <Box className="no-data-wrapper">
          <img className="no-data" src={noData} alt="No data" />
          <Button leftIcon={<AiOutlinePlus />} onClick={handleWorkExperiencePage} className="add-records">
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
                <Box key={index} onClick={() => handleGoToVerification(workExperience)}>
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
        <Button onClick={handleToggleWorkExperienceDetails} className="see-all-btn">
          See All
        </Button>
      )}
    </section>
  );
};
