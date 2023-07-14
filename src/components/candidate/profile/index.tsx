import { useState } from 'react';
import { useProfileContext } from './context/ProfileContext';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ProfileSection } from './components/ProfileSection';
import { DocDepot } from '../doc_depot';
import { MyVerifications } from '../my_verifications';
import { Box, Button } from '@mantine/core';
import { CongratulationsScreen } from './components/IDs/CongratulationsScreen';
import { AddExperience } from './components/experience/AddExperience';
import { AddSkills } from './components/skills/AddSkills';
import './styles/global.scss';
import { Userprofile } from './components/user_profile/Userprofile';

export const Profile = () => {
  const [activeButton, setActiveButton] = useState(1);
  const { candidateActivePage } = useProfileContext();

  const handleButtonClick = (buttonId: number) => {
    setActiveButton(buttonId);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      {candidateActivePage === 'Add Experience' && (
        <main className="profile">
          <AddExperience />
        </main>
      )}
      {candidateActivePage === 'Add Skills' && (
        <main className="profile">
          <AddSkills />
        </main>
      )}
      {candidateActivePage === 'Congratulation Screen' && (
        <main className="profile">
          <CongratulationsScreen />
        </main>
      )}
      {candidateActivePage !== 'Add Experience' &&
        candidateActivePage !== 'Add Skills' &&
        candidateActivePage !== 'Congratulation Screen' && (
          <main className="profile">
            {candidateActivePage === 'Profile' && <Userprofile />}

            <Box
              className="profileNav"
              style={{
                marginTop: candidateActivePage === 'Profile' ? '0rem' : '7rem',
              }}
            >
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
        )}

      <Footer />
    </>
  );
};
