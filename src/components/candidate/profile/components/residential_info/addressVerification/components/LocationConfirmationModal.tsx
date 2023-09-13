import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Box, Button, Modal, createStyles, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

type LocationConfirmationModalProps = {
  opened: boolean;
  close: () => void;
  onConfirm: () => void;
  onDeny: () => void;
};

export const LocationConfirmationModal: React.FC<LocationConfirmationModalProps> = ({
  opened,
  close,
  onConfirm,
  onDeny,
}): JSX.Element => {
  const { classes } = useStyles();
  const isTab = useMediaQuery('(max-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 540px)');

  return (
    <>
      <Modal
        className="modal"
        size={isTab ? '100%' : '700px'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        centered
        radius={'lg'}
      >
        <Box className={classes.modalContentContainer}>
          <Title order={3} className={classes.modalTitle}>
            Confirmation
          </Title>
          <Text className={classes.modalMsgText}>Please confirm that you are present at the above location.</Text>
          <Box className={classes.actionBtnsContainer}>
            <Button
              radius="xl"
              onClick={() => {
                close();
                onConfirm();
              }}
              className={classes.confirmActionBtn}
            >
              Yes
            </Button>
            <Button radius="xl" onClick={onDeny} className={`${classes.confirmActionBtn} ${classes.denyAction}`}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export const LocationDenyModal: React.FC<{
  opened: boolean;
  close: () => void;
}> = ({ opened, close }): JSX.Element => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const isTab = useMediaQuery('(max-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 540px)');

  return (
    <>
      <Modal
        className="modal"
        size={isTab ? '100%' : '700px'}
        fullScreen={isMobile}
        opened={opened}
        onClose={() => {
          close();
          navigate('.?verified=true');
        }}
        centered
        radius={'lg'}
      >
        <Box className={classes.modalContentContainer}>
          <Title order={3} className={classes.modalTitle}>
            Thank You For Confirmation
          </Title>
          <Text className={classes.modalMsgText}>Please try again when you are at the correct location.</Text>
          <Box className={classes.actionBtnsContainer}>
            <Button radius="xl" onClick={() => navigate('.?verified=true')} className={classes.confirmActionBtn}>
              Okay, Got It
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const useStyles = createStyles(() => ({
  'mantine-Modal-body': {
    height: '100%',
  },
  modalContentContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    paddingBottom: '2rem',
  },

  modalTitle: {
    fontSize: '1.3rem',
    color: '#191919',
    borderBottom: '1px solid #191919',
  },

  modalMsgText: {
    fontSize: '1.05rem',
    fontWeight: 500,
    textAlign: 'center',
  },

  actionBtnsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    width: 'min(100%, 280px)',
    marginTop: '2rem',
  },

  confirmActionBtn: {
    backgroundColor: '#17A672',
    border: '1px solid #17A672',
    width: '24ch',
    fontSize: '15px',

    ':hover': {
      backgroundColor: '#17A672',
    },
  },

  denyAction: {
    backgroundColor: '#FF7272',
    border: '1px solid #FF7272',

    ':hover': {
      backgroundColor: '#FF7272',
    },
  },
}));
