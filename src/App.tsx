import { Routes, Route, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { PageNotFound } from './pages/PageNotFound';
import { Landing } from './pages/Landing';
import { AuthPage } from './pages/AuthPage';
import { Waitlist } from './pages/Waitlist';
import { GoogleAuthRedirect } from './components/Auth/components/Google/GoogleAuthRedirect';
import { ProfilePage } from './pages/ProfilePage';
import { AuthVerificationLayout } from './utils/constants/AuthVerification';
import { AppLayout } from './components/layouts/AppLayout';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TearmsAndConditionsPage } from './pages/TearmsAndConditionsPage';

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
            <Route element={<AuthVerificationLayout />}>
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="privacy" element={<PrivacyPolicyPage />} />
            <Route path="tos" element={<TearmsAndConditionsPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MantineProvider>
    </>
  );
};

export default App;
