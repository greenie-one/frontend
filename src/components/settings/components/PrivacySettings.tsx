import React from 'react';
import { Box, Title, Button, Modal, Text, PasswordInput, createStyles, rem, em } from '@mantine/core';
import { privacySettingsStyles, detailsFormStyles, confirmationModalStyle } from '../styles/articleContentStyles';
import { useDisclosure } from '@mantine/hooks';
import { MdOutlineInfo } from 'react-icons/md';
import { useSettingsContext } from '../context/SettingsContext';
import { HttpClient } from '../../../utils/generic/httpClient';
import { useGlobalContext } from '../../../context/GlobalContext';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../utils/functions/showNotification';
import { userApiList } from '../../../assets/api/ApiList';
import { useNavigate } from 'react-router-dom';

export const PrivacySettings: React.FC = (): JSX.Element => {
  const { authClient } = useGlobalContext();
  const navigate = useNavigate();

  const { classes: privacyClasses } = privacySettingsStyles();
  const [passwordModalOpened, { open: passwordModalOpen, close: passwordModalClose }] = useDisclosure(false);
  const [closeAccountModalOpened, { open: closeAccountModalOpen, close: closeAccountModalClose }] =
    useDisclosure(false);
  const { changeCurrentPassword, privacySettingsForm } = useSettingsContext();

  const { classes: formClasses } = detailsFormStyles();
  const { classes: inputClasses } = inputStyles();

  const handleOpenModal = () => {
    if (!privacySettingsForm.validate().hasErrors) {
      passwordModalOpen();
    }
  };

  const handleConfirmation = () => {
    changeCurrentPassword();
    passwordModalClose();
  };

  const onClose = () => {
    privacySettingsForm.setFieldValue('currentPassword', '');
    privacySettingsForm.setFieldValue('newPassword', '');
    privacySettingsForm.setFieldValue('confirmPassword', '');
    passwordModalClose();
  };

  const removeAuthTokens = () => {
    showLoadingNotification({ title: 'Deleting Your Account', message: 'Please wait while we complete the action' });

    setTimeout(() => {
      authClient.deleteTokens();
      navigate('/auth');
    }, 600);

    setTimeout(() => {
      showSuccessNotification({
        title: 'Account Deleted!',
        message: 'You account have been successfully deleted',
      });
    }, 1100);
  };

  const deleteAccount = async () => {
    const res = await HttpClient.callApiAuth(
      {
        url: userApiList.baseRoute,
        method: 'DELETE',
      },
      authClient
    );

    if (res.ok) {
      removeAuthTokens();
    } else {
      showErrorNotification('SOMETHING_WENT_WRONG');
    }

    closeAccountModalClose();
  };

  const accountActions = [
    {
      action: 'Close Account',
      onClick: closeAccountModalOpen,
    },
  ];

  return (
    <>
      <ConfirmationModal
        message="Are you sure you want to update the changes made?"
        opened={passwordModalOpened}
        onClose={onClose}
        handleConfirmation={handleConfirmation}
      />
      <ConfirmationModal
        message="Are you sure you want delete your account?"
        opened={closeAccountModalOpened}
        onClose={closeAccountModalClose}
        handleConfirmation={deleteAccount}
      />
      <form className={formClasses.detailsCategory}>
        <Title className={formClasses.detailsCategoryTitle}>Change password</Title>
        <PasswordInput
          label="Enter current password"
          classNames={inputClasses}
          {...privacySettingsForm.getInputProps('currentPassword')}
        />
        <PasswordInput
          label="Enter new password"
          classNames={inputClasses}
          {...privacySettingsForm.getInputProps('newPassword')}
        />
        <PasswordInput
          label="Confirm new password"
          classNames={inputClasses}
          {...privacySettingsForm.getInputProps('confirmPassword')}
        />
        <Box className={privacyClasses.accountActionBtnsContainer}>
          {accountActions.map((actions, idx) => (
            <button type="button" key={idx} onClick={actions.onClick} className={privacyClasses.accountActionBtns}>
              <span className={privacyClasses.accountActionIcon}>
                <MdOutlineInfo />
              </span>
              <span className={privacyClasses.accountActionText}>{actions.action}</span>
            </button>
          ))}
        </Box>
        <Button
          className={formClasses.formSubmitBtn}
          size="sm"
          type="submit"
          radius="xl"
          color="teal"
          onClick={handleOpenModal}
        >
          Save
        </Button>
      </form>
    </>
  );
};

type ConfirmationModalProps = {
  message: string;
  opened: boolean;
  onClose: () => void;
  handleConfirmation: () => void | Promise<void>;
};

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { classes: modalStyles } = confirmationModalStyle();

  return (
    <Modal
      opened={props.opened}
      onClose={props.onClose}
      title="Confirmation"
      padding="xl"
      radius="lg"
      size="lg"
      centered
      classNames={modalStyles}
    >
      <Box className={modalStyles.confirmationMsgWrapper}>
        <Text className={modalStyles.title}>{props.message}</Text>

        <Box className={modalStyles.modalBtnsContainer}>
          <Button
            className={modalStyles.modalActionBtns}
            onClick={props.handleConfirmation}
            size="sm"
            type="button"
            radius="xl"
            variant="filled"
            color="teal"
          >
            Confirm
          </Button>
          <Button
            className={modalStyles.modalActionBtns}
            onClick={props.onClose}
            size="sm"
            type="button"
            radius="xl"
            variant="outline"
            color="teal"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const inputStyles = createStyles(() => ({
  root: {
    position: 'relative',
  },

  input: {
    height: '68px',
    paddingTop: '18px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid #D1D4DB',
    lineHeight: '19px',
    letterSpacing: '-0.02em',
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      height: '46px',
      borderRadius: '6px',
      fontSize: '10px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },

  passwordInput: {
    '& input': {
      color: '#697082',
    },
  },

  innerInput: {
    height: rem(54),
    paddingTop: rem(28),

    [`@media screen and (max-width: ${em(1024)})`]: {
      paddingTop: rem(8),
    },
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: '12px',
    paddingLeft: '14px',
    paddingTop: '7px',
    lineHeight: '14.52px',
    letterSpacing: '-0.02em',
    zIndex: 1,
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      fontSize: '10px',
      lineHeight: '10px',
      paddingTop: '8px',
    },
  },
}));
