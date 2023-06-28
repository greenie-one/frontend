import { useState } from 'react';
import { Text, Modal, Box, Title, Button } from '@mantine/core';
import noData from '../assets/noData.png';
import { MdOutlineEdit } from 'react-icons/md';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import '../styles/global.scss';
import { WorkExperienceCard } from '../components/WorkExperienceCard';
import { useProfileContext } from '../context/ProfileContext';
import { AiOutlinePlus } from 'react-icons/ai';
import officeBuilding from '../assets/office-building.png';
import freelancer from '../assets/freelancer.png';

enum EmploymentType {
  Employment = 'employment',
  Freelance = 'freelance',
}

interface IWorkExperience {
  _id: string;
  image: string | null;
  designation: string;
  companyName: string;
  email: string;
  companyId: string;
  companyStartDate: string;
  companyEndDate: string;
  workMode: string;
  workType: string;
  isVerified: boolean;
  verifiedBy: [] | null;
  companyType: string;
}

export const Experience = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [employmentType, setEmploymentType] = useState<EmploymentType | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const {
    workExperienceData,
    dispatchDetailsPage,
    detailsPage,
    scrollToTop,
    scrollToProfileNav,
    setSelectedCard,
  } = useProfileContext();

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

  const onClose = () => {
    close();
    setEmploymentType(null);
  };

  return (
    <section className="experience-section container">
      {employmentType === null && (
        <Modal
          className="modal"
          size={'65%'}
          fullScreen={isMobile}
          opened={opened}
          onClose={() => onClose()}
          title="Choose Work experience type"
        >
          <Box className="experience-wrapper">
            <Box className="employment-type" onClick={handleWorkExperiencePage}>
              <img src={officeBuilding} alt="Office building" />
              <Title className="title">Employment</Title>
              <Text className="employment-text">
                Full-time jobs, part-time jobs, Internships etc.
              </Text>
            </Box>
            <Box className="employment-type" onClick={handleWorkExperiencePage}>
              <img src={freelancer} alt="Freelancer" />
              <Title className="title">Freelance</Title>
              <Text className="employment-text">Commission work, contracts, side hustles etc.</Text>
            </Box>
          </Box>
          <Text className="employment-privacy-policy">
            The privacy policy and undertaking statement goes here
          </Text>
        </Modal>
      )}

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
              <Button
                leftIcon={<MdOutlineEdit />}
                onClick={handleWorkExperiencePage}
                className="edit-btn"
              >
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
          <Button leftIcon={<AiOutlinePlus />} onClick={open} className="add-records">
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
