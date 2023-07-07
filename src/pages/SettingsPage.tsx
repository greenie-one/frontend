import React from 'react';
import { ProfileProvider } from '../components/profile/context/ProfileContext';
import { SettingsProvider } from '../components/Settings/context/SettingsContext';
import { Settings } from '../components/settings';

export const SettingsPage: React.FC = (): JSX.Element => {
  return (
    <SettingsProvider>
      <ProfileProvider>
        <Settings />
      </ProfileProvider>
    </SettingsProvider>
  );
};
