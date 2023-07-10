import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useForm, matchesField, hasLength } from '@mantine/form';
import { authApiList } from '../../../assets/api/ApiList';
import { useGlobalContext } from '../../../context/GlobalContext';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../utils/functions/showNotification';
import { HttpClient, Result } from '../../../utils/generic/httpClient';
import { ChangePasswordRequest } from '../types/SettingsRequests';
import { privacySettingsFormType } from '../types/SettingsForms';
import { SettingsContextType } from '../types/SettingsContext';

export const SettingsContext = createContext<SettingsContextType>({} as SettingsContextType);

export const useSettingsContext = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showDetailsId, setShowDetailsId] = useState<number>(0);
  const { authClient } = useGlobalContext();

  const privacySettingsForm = useForm<privacySettingsFormType>({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },

    validate: {
      currentPassword: hasLength({ min: 9, max: 72 }, 'Password must have at least 9 characters'),
      newPassword: hasLength({ min: 9, max: 72 }, 'Password must have at least 9 characters'),
      confirmPassword: matchesField('newPassword', 'Passwords are not the same'),
    },
  });

  const changeCurrentPassword = async () => {
    if (
      !privacySettingsForm.validateField('currentPassword').hasError &&
      !privacySettingsForm.validateField('newPassword').hasError &&
      !privacySettingsForm.validateField('confirmPassword').hasError
    ) {
      showLoadingNotification({
        title: 'Changing your password',
        message: 'Please wait while we change your password.',
      });
      const requestBody: ChangePasswordRequest = {
        currentPassword: privacySettingsForm.values.currentPassword,
        newPassword: privacySettingsForm.values.newPassword,
      };
      const res: Result<any> = await HttpClient.callApiAuth(
        {
          url: `${authApiList.changePassword}`,
          method: 'POST',
          body: requestBody,
        },
        authClient
      );
      if (res.ok) {
        showSuccessNotification({ title: 'Success !', message: 'Password changed successfully.' });
        privacySettingsForm.setFieldValue('currentPassword', '');
        privacySettingsForm.setFieldValue('newPassword', '');
        privacySettingsForm.setFieldValue('confirmPassword', '');
      } else {
        showErrorNotification(res.error.code);
        console.log();
      }
    }
  };

  useEffect(() => {
    setShowDetailsId(0);
  }, []);

  return (
    <SettingsContext.Provider value={{ showDetailsId, setShowDetailsId, privacySettingsForm, changeCurrentPassword }}>
      {children}
    </SettingsContext.Provider>
  );
};
