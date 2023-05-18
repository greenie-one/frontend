import { Routes, Route, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useRef } from 'react';
import { PageNotFound } from './pages/PageNotFound';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Landing } from './pages/Landing';
import { AuthPage } from './pages/AuthPage';
import { Waitlist } from './pages/Waitlist';
import { ProfilePage } from './pages/ProfilePage';

import { validRoutes } from './utils/constants/ValidRoutes';

const App = () => {
  const { pathname } = useLocation();

  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications position="top-right" zIndex={999} />
        {validRoutes.includes(pathname) ? <Navbar /> : null}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {validRoutes.includes(pathname) ? <Footer /> : null}
      </MantineProvider>
    </>
  );
};

export default App;
