import React from 'react';
import '../styles/modal.css';
import { Box, Button } from '@mantine/core';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formattedDate = (data: string) => {
  return data.substring(0, 10).split('-').reverse();
};

export const AcceptanceModal: React.FC<{ confirmationHandler: () => void }> = ({
  confirmationHandler,
}): JSX.Element => {
  return (
    <Box className="modal-content">
      <h3 className="modal-content-heading">You are about confirm that you served</h3>
      <p className="modal-content-msg">
        Line manager at TCS with <span style={{ color: '#000000', fontWeight: '600' }}>John Marston</span> working
        directly or indirectly with you?
      </p>
      <Button radius="xl" className="modal-action-btn" onClick={confirmationHandler}>
        Accept request and confirm
      </Button>
    </Box>
  );
};

export const ReminderModal: React.FC<ReminderModalType> = ({ confirmationHandler, name, createdAt }): JSX.Element => {
  const date = formattedDate(String(createdAt));

  return (
    <Box className="modal-content">
      <h3 className="modal-content-heading">You are about to send a reminder to {name}!</h3>
      <p className="modal-content-msg">
        Request sent on {date[0]} {months[Number(date[1]) - 1]} {date[2]}
      </p>
      <Button radius="xl" className="modal-action-btn" onClick={confirmationHandler}>
        Send Reminder
      </Button>
    </Box>
  );
};

export const CancelationModal: React.FC<CancelationModalType> = ({
  cancelationHandler,
  name,
  createdAt,
}): JSX.Element => {
  const date = formattedDate(String(createdAt));

  return (
    <Box className="modal-content">
      <h3 className="modal-content-heading">Do you really want to cancel verification request sent to {name}!</h3>
      <p className="modal-content-msg">
        Request sent on {date[0]} {months[Number(date[1]) - 1]} {date[2]}
      </p>
      <Button radius="xl" className="modal-action-btn" onClick={cancelationHandler}>
        Cancel Request
      </Button>
    </Box>
  );
};
