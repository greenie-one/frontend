import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Box, Button, Modal } from '@mantine/core';
import { RequestListType } from './RequestList';

import { CancelationModal, ReminderModal } from './Modals';
import profileImage from '../../../auth/assets/profileillustration.png';

import { addressVerificationAPIList, peerVerificationAPIList } from '../../../../assets/api/ApiList';
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
  setForceRenderList: React.Dispatch<React.SetStateAction<boolean>>;
};

const {
  request_item,
  request_item_body,
  profile_image,
  request_title,
  request_msg,
  request_actions,
  request_name,
  request_action_btns,
} = styles;

const ActionBtns: React.FC<{ cbRight: () => void; cbLeft: () => void }> = ({ cbLeft, cbRight }): JSX.Element => {
  return (
    <Box className={request_actions}>
      <Button radius="xl" className={request_action_btns} onClick={cbLeft}>
        Remind
      </Button>
      <Button radius="xl" className={request_action_btns} onClick={cbRight}>
        Cancel
      </Button>
    </Box>
  );
};

const SentRequestActions: React.FC<SentRequestActionType> = ({
  requestId,
  name,
  setForceRenderList,
  createdAt,
  requestType,
}): JSX.Element => {
  const { authClient } = useGlobalContext();
  const [reminderModalOpened, { open: reminderModalOpen, close: reminderModalClose }] = useDisclosure(false);
  const [cancelationModalOpened, { open: cancelationModalOpen, close: cancelationModalClose }] = useDisclosure(false);

  const handleRemind = async () => {
    const requestURL =
      requestType === 'work'
        ? `${peerVerificationAPIList.remindRequest}/${requestId}/resend`
        : `${addressVerificationAPIList.createPeer}/${requestId}/resend`;
    showLoadingNotification({ title: 'Please wait!', message: 'We are sending a reminder to the peer.' });

    const res = await HttpClient.callApiAuth<{ message: string; success: boolean }>(
      {
        url: requestURL,
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
    const requestURL =
      requestType === 'work'
        ? `${peerVerificationAPIList.remindRequest}/${requestId}`
        : `${addressVerificationAPIList.createPeer}/${requestId}`;
    showLoadingNotification({ title: 'Please wait!', message: 'We are sending a reminder to the peer.' });

    const res = await HttpClient.callApiAuth<{ message: string; success: boolean }>(
      {
        url: requestURL,
        method: 'DELETE',
      },
      authClient
    );
    if (res.ok) {
      setForceRenderList((current: boolean) => !current);
      showSuccessNotification({ title: 'Success!', message: res.value.message });
      cancelationModalClose();
    } else {
      showErrorNotification(res.error.code);
    }
  };

  return (
    <>
      <ActionBtns cbLeft={reminderModalOpen} cbRight={cancelationModalOpen} />
      <Modal
        opened={reminderModalOpened}
        onClose={reminderModalClose}
        title="Confirmation"
        centered
        radius="lg"
        padding="xl"
        size="lg"
      >
        <ReminderModal confirmationHandler={handleRemind} name={name} createdAt={createdAt} />
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
        <CancelationModal cancelationHandler={handleCancelRequest} name={name} createdAt={createdAt} />
      </Modal>
    </>
  );
};

export const RenderRequestList: React.FC<RenderRequestListProps> = ({
  requestList,
  setForceRenderList,
}): JSX.Element => {
  return (
    <>
      {[...requestList]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((request) => {
          if (!request.isVerificationCompleted) {
            return (
              <Box key={request.id} className={request_item}>
                <span className={profile_image}>
                  <img src={profileImage} alt="notification" />
                </span>
                <Box className={request_item_body}>
                  <span className={request_title}>
                    Request to verify your {request.peerPost ? 'Work Experience' : 'Address'}
                  </span>
                  <span className={request_msg}>
                    You have requested{' '}
                    <span className={request_name} style={{ color: '#000000', fontWeight: '500' }}>
                      {request.name}
                    </span>{' '}
                    to verify your {request.peerPost ? 'work experience' : 'address'}
                  </span>
                </Box>
                {request.isVerificationCompleted ? (
                  <Box className={request_actions}>
                    <Button className={request_action_btns}>Completed</Button>
                  </Box>
                ) : (
                  <SentRequestActions
                    setForceRenderList={setForceRenderList}
                    requestId={request.id}
                    name={request.name}
                    createdAt={request.createdAt}
                    requestType={request.peerPost ? 'work' : 'address'}
                  />
                )}
              </Box>
            );
          }
          return <></>;
        })}
    </>
  );
};
