import React from 'react';
import { Box, Button, createStyles, Modal, Text } from '@mantine/core';

type ModalPropsType = {
  opened: boolean;
  close: () => void;
  cb?: () => void;
  deleteText: string;
};

export const DeleteConfirmationModal: React.FC<ModalPropsType> = ({ cb, deleteText, opened, close }): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Modal opened={opened} onClose={close} title="Confirmation" centered size="lg" padding="lg" radius="lg">
      <Box className={classes.modalContentContainer}>
        <Text className={classes.modalMsgText}>
          You are about to delete your {deleteText} ! <br /> Are you sure about this?
        </Text>
        <Button
          radius="xl"
          onClick={(event) => {
            event.stopPropagation();
            if (!cb) return;
            cb();
          }}
          className={classes.confirmActionBtn}
        >
          Confirm & Delete
        </Button>
      </Box>
    </Modal>
  );
};

const useStyles = createStyles(() => ({
  'mantine-Modal-title': {
    fontSize: '2rem',
  },

  modalContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    paddingBlock: '2rem',
  },

  modalMsgText: {
    fontSize: '1.05rem',
    fontWeight: 500,
    textAlign: 'center',
  },

  confirmActionBtn: {
    backgroundColor: '#17A672',
    width: '35ch',

    ':hover': {
      backgroundColor: '#17A672',
    },
  },
}));
