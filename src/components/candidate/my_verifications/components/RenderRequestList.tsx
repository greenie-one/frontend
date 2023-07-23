import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Box, Button, Modal, Text } from '@mantine/core';
import { RequestListType } from './RequestList';
import { ReminderModal } from './Modals';
import profileImage from '../../../auth/assets/profileillustration.png';
import { BsCheckLg } from 'react-icons/bs';

import { peerVerificationAPIList } from '../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { HttpClient } from '../../../../utils/generic/httpClient';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';

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
  requested_date,
  request_status,
  request_status_text,
} = styles;

const ActionBtns: React.FC<{ type: 'sent' | 'recieved'; cbRight: () => void; cbLeft: () => void }> = ({
  type,
  cbRight,
}): JSX.Element => {
  return (
    <Box className={request_actions}>
      <Box>
        <Box className={request_status}>
          <BsCheckLg size={'14px'} />
          <Text className={request_status_text}>Sent</Text>
        </Box>
        <Text className={requested_date}>On 23rd April 2023</Text>
      </Box>
      <Button radius="xl" className={request_action_btns} onClick={cbRight}>
        {type === 'sent' ? 'Remind' : 'Accept'}
      </Button>
    </Box>
  );
};

const SentRequestActions: React.FC<SentRequestActionType> = ({ requestId, name }): JSX.Element => {
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
        <ReminderModal confirmationHandler={handleRemind} name={name} />
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
            <img src={profileImage} alt="notification" />
          </span>
          <Box className={request_item_body}>
            <Text className={request_title}>
              Request to <span style={{ color: '#000000', fontWeight: '400' }}>{request.name}</span>
            </Text>
            <span className={request_msg}>A request to verify your work experience as been sent</span>
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
