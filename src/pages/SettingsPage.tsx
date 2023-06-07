import React from 'react';
import { ProfileProvider } from '../components/Profile/context/ProfileContext';
import { Settings } from '../components/Settings';

export const SettingsPage: React.FC = (): JSX.Element => {
  return (
    <ProfileProvider>
      <Settings />
    </ProfileProvider>
  );
};
