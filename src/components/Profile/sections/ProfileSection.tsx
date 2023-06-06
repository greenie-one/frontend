import { ResidentialInfo } from './ResidentialInfo';
import { SkillsSection } from './SkillsSection';
import { VerificationIDSection } from './VerificationIDSection';
import { Experience } from './Experience';
import { useProfileContext } from '../context/ProfileContext';
import { SeeAllExperiences } from '../components/SeeAllExperiences';
import { SeeAllSkills } from '../components/SeeAllSkills';
import { SeeAllResidentialInfo } from '../components/SeeAllResidentialInfo';
import { Box } from '@mantine/core';

export const ProfileSection = () => {
  const { detailsPage } = useProfileContext();
  return (
    <>
      {detailsPage.seeAllWorkExperience === false &&
        detailsPage.seeAllResidentialInfo === false &&
        detailsPage.seeAllSkills === false && (
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
    </>
  );
};
