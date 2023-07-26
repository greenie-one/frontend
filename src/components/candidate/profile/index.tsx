import { Userprofile } from './components/user_profile/Userprofile';
import { ResidentialInfoSection } from './components/residential_info/ResidentialInfoSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { IDSection } from './components/IDs/IDSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import './styles/global.scss';
import { ProfileNav } from './components/ProfileNav';
import { Layout } from './components/Layout';
import { Box } from '@mantine/core';

export const Profile = () => {
  return (
    <>
      <Layout>
        <Box>
          <Userprofile />
          <ProfileNav />
          <IDSection />
          <ExperienceSection />
          <ResidentialInfoSection />
          <SkillsSection />
        </Box>
      </Layout>
    </>
  );
};
