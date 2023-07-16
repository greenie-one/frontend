import React from 'react';
import styles from '../styles/notifications.module.css';
import { Box } from '@mantine/core';
import noNotificationIcon from '../../profile/assets/noNotifications.svg';

const { notifications_container, notification_icon_container, notification_msg } = styles;

export const Notifications: React.FC = (): JSX.Element => {
  return (
    <Box className={notifications_container}>
      <span className={notification_icon_container}>
        <img src={noNotificationIcon} alt="notification" />
      </span>
      <span className={notification_msg}>Coming Soon</span>
    </Box>
  );
};
