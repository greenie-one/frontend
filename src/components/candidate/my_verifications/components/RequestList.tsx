import React, { useState } from 'react';
import styles from '../styles/requestlist.module.css';
import '../styles/modal.css';
import { useDisclosure } from '@mantine/hooks';
import { Box, Button, Modal } from '@mantine/core';
import { FiCheck } from 'react-icons/fi';

const {
  requestList_container,
  request_item,
  profile_image,
  request_item_body,
  request_title,
  request_msg,
  request_actions,
  request_action_btns,
  request_sent_info,
  check_icon,
  sent_msg,
  sent_date,
} = styles;

const RequestListArray: Array<{
  id: number;
  profileImg: string;
  name: string;
  title: string;
  message: string;
}> = [
  {
    id: 0,
    profileImg: '',
    name: 'John Marston',
    title: 'Request to verify your work experience',
    message: 'is asking you to verify your address proof.',
  },
  {
    id: 1,
    profileImg: '',
    name: 'John Marston',
    title: 'Request to verify your work experience',
    message: 'is asking you to verify your address proof',
  },
  {
    id: 2,
    profileImg: '',
    name: 'John Marston',
    title: 'Request to verify your work experience',
    message: 'is asking you to verify your address proof',
  },
];

export const RequestList: React.FC = (): JSX.Element => {
  const [requestSent, setRequestSent] = useState<boolean>(false);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <article className={requestList_container}>
      {RequestListArray.map((request) => {
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
            <Box className={request_actions}>
              {!requestSent ? (
                <Button radius="xl" className={request_action_btns} onClick={open}>
                  Accept
                </Button>
              ) : (
                <span className={request_sent_info}>
                  <span className={sent_msg}>
                    <FiCheck className={check_icon} />
                    Sent
                  </span>
                  <span className={sent_date}>On 23rd April 2023</span>
                </span>
              )}
              <Button radius="xl" className={request_action_btns}>
                Reject
              </Button>
            </Box>
          </Box>
        );
      })}
      <Modal opened={opened} onClose={close} title="Confirmation" centered radius="lg" padding="xl" size="lg">
        <Box className="modal-content">
          <h3 className="modal-content-heading">You are about confirm that you served</h3>
          <p className="modal-content-msg">
            Line manager at TCS with <span style={{ color: '#000000', fontWeight: '600' }}>John Marston</span> working
            directly or indirectly with you?
          </p>
          <Button
            radius="xl"
            className="modal-action-btn"
            onClick={() => {
              setRequestSent(true);
              close();
            }}
          >
            Accept request and confirm
          </Button>
        </Box>
      </Modal>
    </article>
  );
};
