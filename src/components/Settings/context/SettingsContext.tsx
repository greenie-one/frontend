import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { FaExclamation } from 'react-icons/fa';
import { useForm, matchesField, hasLength, UseFormReturnType } from '@mantine/form';
import { em } from '@mantine/core';
import { authApiList } from '../../../assets/api/ApiList';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { BsCheckLg } from 'react-icons/bs';

type ShowDetailsIdContextType = {
  showDetailsId: number;
  setShowDetailsId: React.Dispatch<React.SetStateAction<number>>;
  privacySettingsForm: UseFormReturnType<privacySettingsFormType>;
  changePassword: () => void;
};

type privacySettingsFormType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const SettingsContext = createContext<ShowDetailsIdContextType>(
  {} as ShowDetailsIdContextType
);

export const useSettingsContext = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showDetailsId, setShowDetailsId] = useState<number>(0);

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
  const token = localStorage.getItem('auth-tokens');
  const authTokens = token ? JSON.parse(token) : null;

  const changePassword = async () => {
    if (
      !privacySettingsForm.validateField('currentPassword').hasError &&
      !privacySettingsForm.validateField('newPassword').hasError &&
      !privacySettingsForm.validateField('confirmPassword').hasError
    ) {
      try {
        notifications.show({
          id: 'load-data',
          title: 'Changing your password',
          message: 'Please wait while we change your password.',
          loading: true,
          autoClose: false,
          withCloseButton: false,
          sx: { borderRadius: em(8) },
        });
        const res = await axios.post(
          authApiList.changePassword,
          {
            currentPassword: privacySettingsForm.values.currentPassword,
            newPassword: privacySettingsForm.values.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          }
        );

        notifications.update({
          id: 'load-data',
          color: 'teal',
          title: 'Success !',
          message: 'Password changed successfully.',
          icon: <BsCheckLg />,
          autoClose: 2000,
        });
        privacySettingsForm.setFieldValue('currentPassword', '');
        privacySettingsForm.setFieldValue('newPassword', '');
        privacySettingsForm.setFieldValue('confirmPassword', '');
      } catch (error: any) {
        if (error.response?.data?.code === 'GRA0012') {
          notifications.update({
            id: 'load-data',
            title: 'Invalid password',
            message: 'Please enter valid current password',
            autoClose: 2200,
            withCloseButton: false,
            color: 'red',
            icon: <FaExclamation />,
            sx: { borderRadius: em(8) },
          });
        }
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    setShowDetailsId(0);
  }, []);

  return (
    <SettingsContext.Provider
      value={{ showDetailsId, setShowDetailsId, privacySettingsForm, changePassword }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
