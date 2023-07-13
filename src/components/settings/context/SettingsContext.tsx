import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useForm, matchesField, hasLength, UseFormReturnType } from '@mantine/form';
import { authApiList } from '../../../assets/api/ApiList';
import { useGlobalContext } from '../../../context/GlobalContext';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../utils/functions/showNotification';
import { HttpClient } from '../../../utils/generic/httpClient';

type ShowDetailsIdContextType = {
  showDetailsId: number;
  setShowDetailsId: React.Dispatch<React.SetStateAction<number>>;
  privacySettingsForm: UseFormReturnType<privacySettingsFormType>;
  changeCurrentPassword: () => void;
};

type privacySettingsFormType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const SettingsContext = createContext<ShowDetailsIdContextType>({} as ShowDetailsIdContextType);

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
      const res = await HttpClient.callApiAuth(
        {
          url: `${authApiList.changePassword}`,
          method: 'POST',
          body: {
            currentPassword: privacySettingsForm.values.currentPassword,
            newPassword: privacySettingsForm.values.newPassword,
          },
        },
        authClient
      );
      if (res.ok) {
        showSuccessNotification({
          title: 'Success !',
          message: 'Password changed successfully.',
        });
        privacySettingsForm.setFieldValue('currentPassword', '');
        privacySettingsForm.setFieldValue('newPassword', '');
        privacySettingsForm.setFieldValue('confirmPassword', '');
      } else {
        showErrorNotification(res.error.code);
      }
    }
  };

  useEffect(() => {
    setShowDetailsId(0);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        showDetailsId,
        setShowDetailsId,
        privacySettingsForm,
        changeCurrentPassword,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
