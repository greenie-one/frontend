import React from 'react';
import { Box, Modal, Button, Text } from '@mantine/core';
import { confirmationModalStyle } from '../styles/articleContentStyles';

interface IModalPropsType {
  formRef: React.MutableRefObject<HTMLFormElement | null>;
  modalOpened: boolean;
  modalClose: () => void;
}

export const ConfirmationModal: React.FC<IModalPropsType> = ({ formRef, modalOpened, modalClose }) => {
  const { classes: modalStyles } = confirmationModalStyle();

  const handleConfirmation = () => {
    modalClose();
    if (formRef.current !== null) {
      formRef.current.submit();
    }
  };

  return (
    <Modal
      opened={modalOpened}
      onClose={modalClose}
      title="Confirmation"
      padding="xl"
      radius="lg"
      size="lg"
      centered
      classNames={modalStyles}
    >
      <Box className={modalStyles.confirmationMsgWrapper}>
        <Text className={modalStyles.confirmationMsg}>Are you sure you want to update the changes made?</Text>

        <Box className={modalStyles.modalBtnsContainer}>
          {[
            { variant: 'filled', text: 'Confirm', action: handleConfirmation },
            { variant: 'outline', text: 'Cancel', action: modalClose },
          ].map((btns, idx) => (
            <Button
              key={idx}
              className={modalStyles.modalActionBtns}
              onClick={btns.action}
              size="sm"
              type="button"
              radius="xl"
              variant={btns.variant}
              color="teal"
            >
              {btns.text}
            </Button>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};
