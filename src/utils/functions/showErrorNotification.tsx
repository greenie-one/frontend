import { notifications } from '@mantine/notifications';
import { ErrorMessage } from '../../assets/api/ApiErrors';
import { FaExclamation } from 'react-icons/fa';

export const showErrorNotification = (code: string) => {
  const error = ErrorMessage[code];

  notifications.show({
    title: error.title,
    message: error.message,
    autoClose: 2200,
    color: 'red',
    icon: <FaExclamation />,
  });
};
