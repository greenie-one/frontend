import React from 'react';
import { Box } from '@mantine/core';

import { privacySettingsStyles } from '../styles/articleContentStyles';
import { usePrivacySettingsForm } from '../hooks/usePrivacySettings';
import { privacyFormDetailsList } from '../constants/privacyFormDetails';
import { SettingsForm } from './SettingsForm';

import { MdOutlineHelpCenter } from 'react-icons/md';

export const PrivacySettings: React.FC = (): JSX.Element => {
  const { classes: privacyClasses } = privacySettingsStyles();
  const privacySettingsForm = usePrivacySettingsForm();

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Form submitted successfully!');
  };

  const deactivateAccount = () => {
    console.log('Account deactivated!');
  };

  const closeAccount = () => {
    console.log('Account closed!');
  };

  const accountActions = [
    {
      action: 'Deactivate Account',
      cb: deactivateAccount,
    },
    {
      action: 'Close Account',
      cb: closeAccount,
    },
  ];

  return (
    <>
      <SettingsForm
        settingsForm={privacySettingsForm}
        formDetailsList={privacyFormDetailsList}
        onSubmitHandler={onFormSubmit}
      >
        <Box className={privacyClasses.accountActionBtnsContainer}>
          {accountActions.map((actions, idx) => (
            <button key={idx} onClick={actions.cb} className={privacyClasses.accountActionBtns}>
              <span className={privacyClasses.accountActionIcon}>
                <MdOutlineHelpCenter />
              </span>
              <span className={privacyClasses.accountActionText}>{actions.action}</span>
            </button>
          ))}
        </Box>
      </SettingsForm>
    </>
  );
};
