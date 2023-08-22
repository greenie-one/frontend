import { Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { PageNotFound } from './pages/PageNotFound';
import { Landing } from './pages/Landing';
import { AuthPage } from './pages/AuthPage';
import { Waitlist } from './pages/Waitlist';

import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { HRForm } from './pages/HRForm';
import { AdminForm } from './pages/AdminForm';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsAndConditionsPage } from './pages/TermsAndConditionsPage';

import { AuthVerificationLayout } from './utils/constants/AuthVerification';
import { AdminVerification } from './utils/constants/AdminVerification';
import { HRVerificationProtection } from './utils/constants/HRVerificationProtection';
import { GoogleAuthRedirect } from './components/auth/components/google/GoogleAuthRedirect';
import { AppLayout } from './components/layouts/AppLayout';
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
import { CongratulationsScreen } from './components/candidate/profile/components/IDs/CongratulationsScreen';
import { PeerVerification } from './components/candidate/profile/components/residential_info/addressVerification/peerVerification/PeerVerification';
import { SelfVerification } from './components/candidate/profile/components/residential_info/addressVerification/selfVerification/SelfVerification';
import { VerifyResidentialInfo } from './components/candidate/profile/components/residential_info/VerifyResidentialInfo';
import { IDVerifiedDetails } from './components/candidate/profile/components/IDs/IDVerifiedDetails';
import { VerifyID } from './components/candidate/profile/components/IDs/VerifyID';
import { HRVerification } from './utils/constants/HRVerification';

const App = () => {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications position="top-right" zIndex={999} />

        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Landing />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="waitlist" element={<Waitlist />} />
            <Route path="oauth/google/callback" element={<GoogleAuthRedirect />} />
            <Route path="/verification/:peer/:uuid" element={<ExperienceVerification />} />
            <Route path="/location/verify/:uuid" element={<PeerVerification />} />
            <Route element={<AuthVerificationLayout />}>
              <Route element={<HRVerification />}>
                <Route path="roles/hr" element={<HRForm />} />
              </Route>
            </Route>
            <Route element={<AuthVerificationLayout />}>
              <Route element={<AdminVerification />}>
                <Route path="roles/admin" element={<AdminForm />} />
              </Route>
            </Route>

            <Route element={<AuthVerificationLayout />}>
              <Route element={<HRVerificationProtection />}>
                <Route path="candidate/profile">
                  <Route index element={<ProfilePage />} />
                  <Route path="settings" element={<SettingsPage />} />

                  <Route path="IDs/verify/aadhar/congratulations" element={<CongratulationsScreen />} />
                  <Route path="IDs/verify/:id/details" element={<IDVerifiedDetails />} />
                  <Route path="IDs/verify/:id" element={<VerifyID />} />

                  <Route path="experience/addExperience" element={<AddExperience />} />
                  <Route path="experience/allExperiences" element={<AllExperiences />} />
                  <Route path="experience/:id" element={<ExperienceDetails />} />
                  <Route path="experience/:id/verify" element={<VerifyExperience />} />

                  <Route path="address/addResidentialInfo" element={<AddResidentialInfo />} />
                  <Route path="address/allAddresses" element={<AllResidentialInfo />} />
                  <Route path="address/:id" element={<ResidentialInfoDetails />} />
                  <Route path="address/:id/verify" element={<VerifyResidentialInfo />} />
                  <Route path="location/:id/verify/me" element={<SelfVerification />} />

                  <Route path="skills/allSkills" element={<AllSkills />} />
                  <Route path="skills/addSkills" element={<AddSkills />} />
                  <Route path="docDepot" element={<DocDepotPage />} />
                  <Route path="myVerification" element={<MyVerifications />} />
                </Route>
              </Route>
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
