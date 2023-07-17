import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Userprofile } from './components/user_profile/Userprofile';
import { ResidentialInfoSection } from './components/residential_info/ResidentialInfoSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { IDSection } from './components/IDs/IDSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import './styles/global.scss';
import { ProfileNav } from './components/ProfileNav';

export const Profile = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="profile">
        <Userprofile />
        <ProfileNav />
        <IDSection />
        <ExperienceSection />
        <ResidentialInfoSection />
        <SkillsSection />
      </main>
      <Footer />
    </>
  );
};
