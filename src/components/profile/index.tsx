import { useState } from 'react';
import { useProfileContext } from './context/ProfileContext';
import { Footer } from './sections/Footer';
import { BioSection } from './sections/BioSection';
import { Navbar } from './sections/Navbar';
import { ProfilePhotos } from './sections/ProfilePhotos';
import { ProfileSection } from './sections/ProfileSection';
import { DocDepot } from '../DocDepot';
import { MyVerifications } from './sections/MyVerifications';
import { Box, Button } from '@mantine/core';
import { SeeCongratulations } from './components/SeeCongratulations';
import { AddWorkExperience } from './components/AddWorkExperience';
import { AddSkills } from './components/AddSkills';
import './styles/global.scss';

export const Profile = () => {
  const [activeButton, setActiveButton] = useState(1);
  const { detailsPage, aadharIsVerified, panIsVerified, licenseIsVerified } = useProfileContext();
  const { seeAddWorkExperience, seeAadharCard, seePanCard, seeDrivingLicence, seeCongratulations } = detailsPage;

  const handleButtonClick = (buttonId: number) => {
    setActiveButton(buttonId);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      {seeAddWorkExperience ? (
        <main className="profile">
          <AddWorkExperience />
        </main>
      ) : detailsPage.seeAddSkills ? (
        <main className="profile">
          <AddSkills />
        </main>
      ) : (
        <main className="profile">
          {!seeCongratulations &&
            !aadharIsVerified &&
            !panIsVerified &&
            !licenseIsVerified &&
            seeAadharCard === false &&
            seePanCard === false &&
            seeDrivingLicence === false && (
              <Box>
                <ProfilePhotos />
                <BioSection />
              </Box>
            )}

          <Box
            className="profileNav"
            style={{
              marginTop:
                detailsPage.seeCongratulations ||
                aadharIsVerified ||
                panIsVerified ||
                licenseIsVerified ||
                seeAadharCard === true ||
                seePanCard === true ||
                seeDrivingLicence === true
                  ? '7rem'
                  : '0rem',
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
          {seeCongratulations && activeButton === 1 && <SeeCongratulations />}
          {activeButton === 1 && <ProfileSection />}
          {activeButton === 2 && <DocDepot />}
          {activeButton === 3 && <MyVerifications />}
        </main>
      )}

      <Footer />
    </>
  );
};
