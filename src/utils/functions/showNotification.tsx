import { em } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { ErrorMessage } from '../../assets/api/ApiErrors';
import { FaExclamation } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs';

export const showErrorNotification = (code: string) => {
  const error = ErrorMessage[code];

  notifications.update({
    id: 'load-data',
    title: error.title,
    message: error.message,
    autoClose: 2500,
    color: 'red',
    icon: <FaExclamation />,
    sx: { borderRadius: em(8) },
  });
};

export const showSuccessNotification = (item: { title: string; message: string }) => {
  notifications.update({
    id: 'load-data',
    title: item.title,
    message: item.message,
    autoClose: 2500,
    color: 'teal',
    icon: <BsCheckLg />,
    sx: { borderRadius: em(8) },
  });
};

export const showLoadingNotification = (item: { title: string; message: string }) => {
  notifications.show({
    id: 'load-data',
    title: item.title,
    message: item.message,
    loading: true,
    sx: { borderRadius: em(8) },
  });
};
