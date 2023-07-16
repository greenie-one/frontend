import React from 'react';
import styles from '../styles/requestlist.module.css';
import { useDisclosure } from '@mantine/hooks';
import { Box, Button, Modal } from '@mantine/core';

import { AcceptanceModal, ReminderModal } from './Modals';

type RenderRequestListProps = {
  requestType: 'sent' | 'recieved';
  requestList: Array<{
    id: number;
    profileImg: string;
    name: string;
    title: string;
    message: string;
  }>;
};

const {
  request_item,
  profile_image,
  request_item_body,
  request_title,
  request_msg,
  request_actions,
  request_action_btns,
} = styles;

const SentRequestActions = (): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleRemind = () => {
    alert('Reminder Sent!');
    close();
  };

  const handleCancelRequest = () => {
    alert('Request Cancelled!');
  };

  return (
    <>
      <Box className={request_actions}>
        <Button radius="xl" className={request_action_btns} onClick={open}>
          Remind
        </Button>
        <Button radius="xl" className={request_action_btns} onClick={handleCancelRequest}>
          Cancel
        </Button>
      </Box>
      <Modal opened={opened} onClose={close} title="Confirmation" centered radius="lg" padding="xl" size="lg">
        <ReminderModal confirmationHandler={handleRemind} />
      </Modal>
    </>
  );
};

const ReceivedRequestActions = (): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleAccept = () => {
    alert('Reminder Sent!');
    close();
  };

  const handleRejectRequest = () => {
    alert('Reminder Rejected');
  };

  return (
    <>
      <Box className={request_actions}>
        <Button radius="xl" className={request_action_btns} onClick={open}>
          Accept
        </Button>
        <Button radius="xl" className={request_action_btns} onClick={handleRejectRequest}>
          Reject
        </Button>
      </Box>
      <Modal opened={opened} onClose={close} title="Confirmation" centered radius="lg" padding="xl" size="lg">
        <AcceptanceModal confirmationHandler={handleAccept} />
      </Modal>
    </>
  );
};

export const RenderRequestList: React.FC<RenderRequestListProps> = ({ requestType, requestList }): JSX.Element[] => {
  return requestList.map((request) => {
    return (
      <Box key={request.id} className={request_item}>
        <span className={profile_image}>
          <img src="" alt="" />
        </span>
        <Box className={request_item_body}>
          <span className={request_title}>{request.title}</span>
          <span className={request_msg}>
            <span style={{ color: '#000000', fontWeight: '500' }}>{request.name}</span> {request.message}
          </span>
        </Box>
        {requestType === 'sent' ? <SentRequestActions /> : <ReceivedRequestActions />}
      </Box>
    );
  });
};
