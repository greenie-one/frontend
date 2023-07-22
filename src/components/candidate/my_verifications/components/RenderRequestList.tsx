import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Box, Button, Modal } from '@mantine/core';
import { RequestListType } from './RequestList';
import { CancelationModal, ReminderModal } from './Modals';

import { peerVerificationAPIList } from '../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { HttpClient } from '../../../../utils/generic/httpClient';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';

import notificationIcon from '../../profile/assets/notification.svg';
import styles from '../styles/requestlist.module.css';

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

const SentRequestActions: React.FC<SentRequestActionType> = ({ requestId, name }): JSX.Element => {
  const { authClient } = useGlobalContext();
  const [reminderModalOpened, { open: reminderModalOpen, close: reminderModalClose }] = useDisclosure(false);
  const [cancelationModalOpened, { open: cancelationModalOpen, close: cancelationModalClose }] = useDisclosure(false);

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
      reminderModalClose();
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const handleCancelRequest = async () => {
    showLoadingNotification({ title: 'Please wait!', message: 'We are sending a reminder to the peer.' });
    const res = await HttpClient.callApiAuth<{ message: string; success: boolean }>(
      {
        url: `${peerVerificationAPIList.remindRequest}/${requestId}`,
        method: 'DELETE',
      },
      authClient
    );
    if (res.ok) {
      showSuccessNotification({ title: 'Success!', message: res.value.message });
      cancelationModalClose();
    } else {
      showErrorNotification(res.error.code);
    }
  };

  return (
    <>
      <ActionBtns type="sent" cbRight={reminderModalOpen} cbLeft={cancelationModalOpen} />
      <Modal
        opened={reminderModalOpened}
        onClose={reminderModalClose}
        title="Confirmation"
        centered
        radius="lg"
        padding="xl"
        size="lg"
      >
        <ReminderModal confirmationHandler={handleRemind} name={name} />
      </Modal>
      <Modal
        opened={cancelationModalOpened}
        onClose={cancelationModalClose}
        title="Confirmation"
        centered
        radius="lg"
        padding="xl"
        size="lg"
      >
        <CancelationModal cancelationHandler={handleCancelRequest} name={name} />
      </Modal>
    </>
  );
};

export const RenderRequestList: React.FC<RenderRequestListProps> = ({ requestList }): JSX.Element[] => {
  return requestList.map((request) => {
    if (!request.isVerificationCompleted) {
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
          {request.isVerificationCompleted ? (
            <Box className={request_actions}>
              <Button className={request_action_btns}>Completed</Button>
            </Box>
          ) : (
            <SentRequestActions requestId={request.id} name={request.name} />
          )}
        </Box>
      );
    }
    return <></>;
  });
};
