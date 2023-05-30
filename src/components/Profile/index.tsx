import { useState } from 'react';
import { Footer } from './sections/Footer';
import { BioSection } from './sections/BioSection';
import { Navbar } from './sections/Navbar';
import { ProfilePhotos } from './sections/ProfilePhotos';
import { ProfileSection } from './sections/ProfileSection';
import { DocDepot } from './sections/DocDepot';
import { MyVerifications } from './sections/MyVerifications';
import { Box, Button } from '@mantine/core';
import './styles/global.scss';

export const Profile = () => {
  const [activeButton, setActiveButton] = useState('profile');

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="profile">
        <ProfilePhotos />
        <BioSection />
        <Box className="profile-btn-wrapper">
          <Button variant="outline" className="btn" onClick={() => handleButtonClick('profile')}>
            Profile
          </Button>
          <Button variant="outline" className="btn" onClick={() => handleButtonClick('doc depot')}>
            Doc Depot
          </Button>
          <Button
            variant="outline"
            className="btn"
            onClick={() => handleButtonClick('my verification')}
          >
            My Verification
          </Button>
        </Box>
        {activeButton === 'profile' && <ProfileSection />}
        {activeButton === 'doc depot' && <DocDepot />}
        {activeButton === 'my verifications' && <MyVerifications />}
      </main>
      <Footer />
    </>
  );
};
