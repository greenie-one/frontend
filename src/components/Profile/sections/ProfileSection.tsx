import { ResidentialInfo } from './ResidentialInfo';
import { SkillsSection } from './SkillsSection';
import { VerificationIDSection } from './VerificationIDSection';
import { Experience } from './Experience';
import { useProfileContext } from '../context/ProfileContext';
import { SeeAllExperiences } from '../components/SeeAllExperiences';
import { SeeAllSkills } from '../components/SeeAllSkills';
import { SeeAllResidentialInfo } from '../components/SeeAllResidentialInfo';
import { SeeAadharCard } from '../components/SeeAadharCard';
import { SeePanCard } from '../components/SeePanCard';
import { SeeDrivingLicence } from '../components/SeeDrivingLicence';
import { Box } from '@mantine/core';

export const ProfileSection = () => {
  const { detailsPage } = useProfileContext();
  return (
    <>
      {detailsPage.seeAllWorkExperience === false &&
        detailsPage.seeAllResidentialInfo === false &&
        detailsPage.seeAllSkills === false &&
        detailsPage.seeAadharCard === false &&
        detailsPage.seePanCard === false &&
        detailsPage.seeDrivingLicence === false && (
          <Box>
            <VerificationIDSection />
            <Experience />
            <ResidentialInfo />
            <SkillsSection />
          </Box>
        )}
      {detailsPage.seeAllWorkExperience && <SeeAllExperiences />}
      {detailsPage.seeAllResidentialInfo && <SeeAllResidentialInfo />}
      {detailsPage.seeAllSkills && <SeeAllSkills />}
      {detailsPage.seeAadharCard && <SeeAadharCard />}
      {detailsPage.seePanCard && <SeePanCard />}
      {detailsPage.seeDrivingLicence && <SeeDrivingLicence />}
    </>
  );
};
