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
import { GoogleAuthRedirect } from './components/auth/components/google_/GoogleAuthRedirect';
import { AppLayout } from './components/layouts/AppLayout';

import { VerificationByHRPage } from './pages/VerificationByHRPage';
import { VerificationByManagerPage } from './pages/verificationByManagerPage';

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
            <Route path="/hr" element={<VerificationByHRPage />} />
            <Route path="/manager" element={<VerificationByManagerPage />} />

            <Route element={<AuthVerificationLayout />}>
              <Route path="profile">
                <Route index element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
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
