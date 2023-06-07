import React from 'react';

import { useGeneralSettingsForm } from '../hooks/useGeneralSettings';
import { generalFormDetailsList } from '../constants/generalFormDetails';
import { SettingsForm } from './SettingsForm';

export const GeneralSettings: React.FC = (): JSX.Element => {
  const generalSettingsForm = useGeneralSettingsForm();

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Form submitted successfully!');
  };

  return (
    <>
      <SettingsForm
        settingsForm={generalSettingsForm}
        formDetailsList={generalFormDetailsList}
        onSubmitHandler={onFormSubmit}
      />
    </>
  );
};
