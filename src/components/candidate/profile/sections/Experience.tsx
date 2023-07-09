import { Text, Box, Button } from '@mantine/core';
import noData from '../assets/noData.png';
import { MdOutlineEdit } from 'react-icons/md';
import { Carousel } from '@mantine/carousel';
import '../styles/global.scss';
import { WorkExperienceCard } from '../components/WorkExperienceCard';
import { useProfileContext } from '../context/ProfileContext';
import { AiOutlinePlus } from 'react-icons/ai';

export const Experience = () => {
  const { workExperienceData, dispatchDetailsPage, detailsPage, scrollToTop, scrollToProfileNav } = useProfileContext();

  const handleToggleWorkExperienceDetails = (): void => {
    scrollToProfileNav();
    dispatchDetailsPage({
      type: 'SET_SEE_ALL_WORKEXPERIENCE',
      payload: !detailsPage.seeAllWorkExperience,
    });
  };

  const handleWorkExperiencePage = () => {
    scrollToTop();
    dispatchDetailsPage({
      type: 'SET_SEE_ADD_WORK_EXPERIENCE',
      payload: !detailsPage.seeAllWorkExperience,
    });
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
                <WorkExperienceCard
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
