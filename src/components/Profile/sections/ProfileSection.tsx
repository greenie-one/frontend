import { ResidentialInfo } from './ResidentialInfo';
import { SkillsSection } from './SkillsSection';
import { VerificationIDSection } from './VerificationIDSection';
import { Experience } from './Experience';

export const ProfileSection = () => {
  return (
    <>
      <VerificationIDSection />
      <Experience />
      <ResidentialInfo />
      <SkillsSection />
    </>
  );
};
