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
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonId: number) => {
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
        <Box className="profileNav">
          <Box className="profile-btn-wrapper">
            <Button
              variant="outline"
              className={activeButton === 1 ? 'active' : ''}
              onClick={() => handleButtonClick(1)}
            >
              Profile
            </Button>
            <Button
              variant="outline"
              className={activeButton === 2 ? 'active' : ''}
              onClick={() => handleButtonClick(2)}
            >
              Doc Depot
            </Button>
            <Button
              variant="outline"
              className={activeButton === 3 ? 'active' : ''}
              onClick={() => handleButtonClick(3)}
            >
              My Verification
            </Button>
          </Box>
        </Box>

        {activeButton === 1 && <ProfileSection />}
        {activeButton === 2 && <DocDepot />}
        {activeButton === 3 && <MyVerifications />}
      </main>
      <Footer />
    </>
  );
};
