import { ResidentialInfoSection } from './residential_info/ResidentialInfoSection';
import { SkillsSection } from './skills/SkillsSection';
import { IDSection } from './IDs/IDSection';
import { ExperienceSection } from './experience/ExperienceSection';
import { useProfileContext } from '../context/ProfileContext';
import { AllExperiences } from './experience/AllExperiences';
import { AllSkills } from './skills/AllSkills';
import { AllResidentialInfo } from './residential_info/AllResidentialInfo';
import { VerifyAadharCard } from './IDs/VerifyAadharCard';
import { VerifyPanCard } from './IDs/VerifyPanCard';
import { VerifyDrivingLicence } from './IDs/VerifyDrivingLicence';
import { Box } from '@mantine/core';

export const ProfileSection = () => {
  const { candidateActivePage } = useProfileContext();
  return (
    <>
      {candidateActivePage === 'Profile' && (
        <Box>
          <IDSection />
          <ExperienceSection />
          <ResidentialInfoSection />
          <SkillsSection />
        </Box>
      )}
      {candidateActivePage === 'All Experiences' && <AllExperiences />}
      {candidateActivePage === 'All Residential Info' && <AllResidentialInfo />}
      {candidateActivePage === 'All Skills' && <AllSkills />}
      {candidateActivePage === 'Verify Aadhar Card' && <VerifyAadharCard />}
      {candidateActivePage === 'Verify PAN Card' && <VerifyPanCard />}
      {candidateActivePage === 'Verify Licence' && <VerifyDrivingLicence />}
    </>
  );
};
