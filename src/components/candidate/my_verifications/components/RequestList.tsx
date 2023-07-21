import React, { useEffect, useState } from 'react';
import { Box } from '@mantine/core';

import { peerVerificationAPIList } from '../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { HttpClient } from '../../../../utils/generic/httpClient';
import { RenderRequestList } from './RenderRequestList';

import { showErrorNotification } from '../../../../utils/functions/showNotification';
import noNotificationIcon from '../../profile/assets/noNotifications.svg';
import notificationStyles from '../styles/notifications.module.css';
import styles from '../styles/requestlist.module.css';

const { requestList_container } = styles;
const { notifications_container, notification_icon_container, notification_msg } = notificationStyles;

export type RequestListType = {
  id: string;
  email: string;
  name: string;
  phone: string;
  isVerificationCompleted: boolean;
};

export const RequestList: React.FC<{ activeListItem: number }> = ({ activeListItem }): JSX.Element => {
  const { authClient } = useGlobalContext();
  const [sentRequests, setSentRequests] = useState<Array<RequestListType>>([]);

  const getSentRequests = async () => {
    const res = await HttpClient.callApiAuth<RequestListType[]>(
      {
        url: peerVerificationAPIList.getSentRequest,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      setSentRequests(res.value);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  useEffect(() => {
    getSentRequests();
  }, [authClient]);

  return activeListItem === 0 ? (
    <article className={requestList_container}>
      <RenderRequestList requestType={activeListItem === 0 ? 'sent' : 'recieved'} requestList={sentRequests} />
    </article>
  ) : (
    <Box className={notifications_container}>
      <span className={notification_icon_container}>
        <img src={noNotificationIcon} alt="notification" />
      </span>
      <span className={notification_msg}>Coming Soon</span>
    </Box>
  );
};
