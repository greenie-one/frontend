import React from 'react';
import styles from '../styles/requestlist.module.css';
import { useDisclosure } from '@mantine/hooks';
import { Box, Button, Modal } from '@mantine/core';
import { RequestListType } from './RequestList';

import { ReminderModal } from './Modals';
import { HttpClient } from '../../../../utils/generic/httpClient';
import { useGlobalContext } from '../../../../context/GlobalContext';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';
import { peerVerificationAPIList } from '../../../../assets/api/ApiList';
import notificationIcon from '../../profile/assets/notification.svg';

type RenderRequestListProps = {
  requestType: 'sent' | 'recieved';
  requestList: Array<RequestListType>;
};

const {
  request_item,
  request_item_body,
  profile_image,
  request_title,
  request_msg,
  request_actions,
  request_action_btns,
} = styles;

const ActionBtns: React.FC<{ type: 'sent' | 'recieved'; cbRight: () => void; cbLeft: () => void }> = ({
  type,
  cbRight,
  cbLeft,
}): JSX.Element => {
  return (
    <Box className={request_actions}>
      <Button radius="xl" className={request_action_btns} onClick={cbRight}>
        {type === 'sent' ? 'Remind' : 'Accept'}
      </Button>
      <Button radius="xl" className={request_action_btns} onClick={cbLeft}>
        {type === 'sent' ? 'Cancel' : 'Reject'}
      </Button>
    </Box>
  );
};

const SentRequestActions: React.FC<{ requestId: string }> = ({ requestId }): JSX.Element => {
  const { authClient } = useGlobalContext();
  const [opened, { open, close }] = useDisclosure(false);

  const handleRemind = async () => {
    showLoadingNotification({ title: 'Please wait!', message: 'We are sending a reminder to the peer.' });
    const res = await HttpClient.callApiAuth<{ message: string; success: boolean }>(
      {
        url: `${peerVerificationAPIList.remindRequest}/${requestId}/resend`,
        method: 'GET',
      },
      authClient
    );
    if (res.ok) {
      showSuccessNotification({ title: 'Success!', message: res.value.message });
      close();
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const handleCancelRequest = () => {
    alert('Request Cancelled!');
  };

  return (
    <>
      <ActionBtns type="sent" cbRight={open} cbLeft={handleCancelRequest} />
      <Modal opened={opened} onClose={close} title="Confirmation" centered radius="lg" padding="xl" size="lg">
        <ReminderModal confirmationHandler={handleRemind} />
      </Modal>
    </>
  );
};

export const RenderRequestList: React.FC<RenderRequestListProps> = ({ requestList }): JSX.Element[] => {
  return requestList.map((request) => {
    return (
      <Box key={request.id} className={request_item}>
        <span className={profile_image}>
          <img src={notificationIcon} alt="notification" />
        </span>
        <Box className={request_item_body}>
          <span className={request_title}>Request to verify your work experience</span>
          <span className={request_msg}>
            You have requested <span style={{ color: '#000000', fontWeight: '500' }}>{request.name}</span> to verify
            your work experience
          </span>
        </Box>
        <SentRequestActions requestId={request.id} />
      </Box>
    );
  });
};
