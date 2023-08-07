import { Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { PageNotFound } from './pages/PageNotFound';
import { Landing } from './pages/Landing';
import { AuthPage } from './pages/AuthPage';
import { Waitlist } from './pages/Waitlist';

import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsAndConditionsPage } from './pages/TermsAndConditionsPage';

import { AuthVerificationLayout } from './utils/constants/AuthVerification';
import { GoogleAuthRedirect } from './components/auth/components/google/GoogleAuthRedirect';
// import { AppLayout } from './components/layouts/AppLayout';
import { PersonalIdentification } from './components/candidate/profile/components/reports/personalidentification';
import { ExperienceVerification } from './pages/ExperienceVerification';
import { AllExperiences } from './components/candidate/profile/components/experience/AllExperiences';
import { ExperienceDetails } from './components/candidate/profile/components/experience/ExperienceDetails';
import { VerifyExperience } from './components/candidate/profile/components/experience/VerifyExperience';
import { AllResidentialInfo } from './components/candidate/profile/components/residential_info/AllResidentialInfo';
import { ResidentialInfoDetails } from './components/candidate/profile/components/residential_info/ResidentialInfoDetails';
import { AllSkills } from './components/candidate/profile/components/skills/AllSkills';

import { AddExperience } from './components/candidate/profile/components/experience/AddExperience';
import { AddResidentialInfo } from './components/candidate/profile/components/residential_info/AddResidentialInfo';
import { AddSkills } from './components/candidate/profile/components/skills/AddSkills';
import { DocDepotPage } from './pages/DocDepotPage';
import { MyVerifications } from './components/candidate/my_verifications';
import { VerifyAadharCard } from './components/candidate/profile/components/IDs/VerifyAadharCard';
import { VerifyPanCard } from './components/candidate/profile/components/IDs/VerifyPanCard';
import { VerifyDrivingLicence } from './components/candidate/profile/components/IDs/VerifyDrivingLicence';
import { CongratulationsScreen } from './components/candidate/profile/components/IDs/CongratulationsScreen';
import { PeerVerification } from './components/candidate/profile/components/residential_info/addressVerification/peerVerification/PeerVerification';
import { SelfVerification } from './components/candidate/profile/components/residential_info/addressVerification/selfVerification/SelfVerification';

const App = () => {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications position="top-right" zIndex={999} />

        <Routes>
          <Route path="/" element={<PersonalIdentification />}>
            <Route index element={<Landing />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="waitlist" element={<Waitlist />} />
            <Route path="oauth/google/callback" element={<GoogleAuthRedirect />} />
            <Route path="/verification/:peer/:uuid" element={<ExperienceVerification />} />
            <Route path="/location/verify/:uuid" element={<PeerVerification />} />

            <Route element={<AuthVerificationLayout />}>
              <Route path="candidate/profile">
                <Route index element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />

                <Route path="IDs/verify/aadhar" element={<VerifyAadharCard />} />
                <Route path="IDs/verify/aadhar/congratulations" element={<CongratulationsScreen />} />
                <Route path="IDs/verify/pan" element={<VerifyPanCard />} />
                <Route path="IDs/verify/licence" element={<VerifyDrivingLicence />} />

                <Route path="experience/addExperience" element={<AddExperience />} />
                <Route path="experience/allExperiences" element={<AllExperiences />} />
                <Route path="experience/:id" element={<ExperienceDetails />} />
                <Route path="experience/:id/verify" element={<VerifyExperience />} />

                <Route path="address/addResidentialInfo" element={<AddResidentialInfo />} />
                <Route path="address/allAddresses" element={<AllResidentialInfo />} />
                <Route path="address/:id" element={<ResidentialInfoDetails />} />
                <Route path="location/:id/verify/me" element={<SelfVerification />} />

                <Route path="skills/allSkills" element={<AllSkills />} />
                <Route path="skills/addSkills" element={<AddSkills />} />
                <Route path="docDepot" element={<DocDepotPage />} />
                <Route path="myVerification" element={<MyVerifications />} />
              </Route>
              R
            </Route>

            <Route path="privacy" element={<PrivacyPolicyPage />} />
            <Route path="tos" element={<TermsAndConditionsPage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MantineProvider>
    </>
  );
};

export default App;
