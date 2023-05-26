import { Footer } from './sections/Footer';
import { BioSection } from './sections/BioSection';
import { Experience } from './sections/Experience';
import { Navbar } from './sections/Navbar';
import { ProfilePhotos } from './sections/ProfilePhotos';
import { ResidentialInfo } from './sections/ResidentialInfo';
import { SkillsSection } from './sections/SkillsSection';
import { VerificationIDSection } from './sections/VerificationIDSection';
import { ProfileNav } from './components/ProfileNav';

export const Profile = () => {
  return (
    <>
      <main className="profile">
        <Navbar />
        <ProfilePhotos />
        <BioSection />
        <ProfileNav />
        <VerificationIDSection />
        <Experience />
        <ResidentialInfo />
        <SkillsSection />
      </main>
      <Footer />
    </>
  );
};
