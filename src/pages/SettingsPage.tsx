import React from 'react';
import { ProfileProvider } from '../components/candidate/profile/context/ProfileContext';
import { SettingsProvider } from '../components/settings/context/SettingsContext';
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
