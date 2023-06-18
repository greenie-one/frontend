import React from 'react';
import { ProfileProvider } from '../components/Profile/context/ProfileContext';
import { SettingsProvider } from '../components/Settings/context/SettingsContext';
import { Settings } from '../components/Settings';

export const SettingsPage: React.FC = (): JSX.Element => {
  return (
    <SettingsProvider>
      <ProfileProvider>
        <Settings />
      </ProfileProvider>
    </SettingsProvider>
  );
};
