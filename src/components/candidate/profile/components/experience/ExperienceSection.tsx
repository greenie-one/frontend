import { Text, Box, Button } from '@mantine/core';
import noData from '../../assets/noData.png';
import { MdOutlineEdit } from 'react-icons/md';
import { Carousel } from '@mantine/carousel';
import { ExperienceCard } from './ExperienceCard';
import { useProfileContext } from '../../context/ProfileContext';
import { AiOutlinePlus } from 'react-icons/ai';

export const ExperienceSection = () => {
  const { workExperienceData, scrollToTop, setCandidateActivePage } = useProfileContext();

  const handleToggleWorkExperienceDetails = (): void => {
    scrollToTop();
    setCandidateActivePage('All Experiences');
  };

  const handleWorkExperiencePage = () => {
    scrollToTop();
    setCandidateActivePage('Add Experience');
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
        <Carousel
          withIndicators={false}
          slideSize="33.30%"
          slideGap={24}
          slidesToScroll={1}
          align="start"
          styles={{ control: { display: 'none' } }}
          breakpoints={[
            { maxWidth: 'xs', slideSize: '80%' },
            { maxWidth: 'md', slideSize: '50%' },
          ]}
        >
          {workExperienceData.reverse().map((workExperience, index) => {
            return (
              <Carousel.Slide key={index}>
                <ExperienceCard
                  position={workExperience.designation}
                  companyName={workExperience.companyName}
                  isVerified={workExperience.isVerified}
                  companyStartYear={workExperience.companyStartDate}
                  companyEndYear={workExperience.companyEndDate}
                />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      )}
      {workExperienceData.length > 0 && (
        <Button onClick={handleToggleWorkExperienceDetails} className="see-all-btn">
          See All
        </Button>
      )}
    </section>
  );
};
