import React from 'react';
import {
  Box,
  Title,
  Button,
  Modal,
  Text,
  PasswordInput,
  rem,
  em,
  createStyles,
} from '@mantine/core';
import { privacySettingsStyles } from '../styles/articleContentStyles';
import { detailsFormStyles, detailsInputStyles } from '../styles/articleContentStyles';
import { useDisclosure } from '@mantine/hooks';
import { confirmationModalStyle } from '../styles/articleContentStyles';
import { MdOutlineHelpCenter } from 'react-icons/md';
import { useSettingsContext } from '../context/SettingsContext';

export const PrivacySettings: React.FC = (): JSX.Element => {
  const { classes: privacyClasses } = privacySettingsStyles();
  const { classes: inputClasses } = inputStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const { changePassword, privacySettingsForm } = useSettingsContext();

  const deactivateAccount = () => {
    console.log('Account deactivated!');
  };

  const closeAccount = () => {
    console.log('Account closed!');
  };

  const accountActions = [
    {
      action: 'Deactivate Account',
      cb: deactivateAccount,
    },
    {
      action: 'Close Account',
      cb: closeAccount,
    },
  ];

  const { classes: formClasses } = detailsFormStyles();
  const { classes: modalStyles } = confirmationModalStyle();

  const handleOpenModal = () => {
    if (
      !privacySettingsForm.validateField('currentPassword').hasError &&
      !privacySettingsForm.validateField('newPassword').hasError &&
      !privacySettingsForm.validateField('confirmPassword').hasError
    ) {
      open();
    }
  };

  const handleConfirmation = () => {
    changePassword();
    close();
  };

  const onClose = () => {
    privacySettingsForm.values.currentPassword = '';
    privacySettingsForm.values.newPassword = '';
    privacySettingsForm.values.confirmPassword = '';
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Confirmation"
        padding="xl"
        radius="lg"
        size="lg"
        centered
        classNames={modalStyles}
      >
        <Box className={modalStyles.confirmationMsgWrapper}>
          <Text className={modalStyles.title}>
            Are you sure you want to update the changes made?
          </Text>

          <Box className={modalStyles.modalBtnsContainer}>
            <Button
              className={modalStyles.modalActionBtns}
              onClick={handleConfirmation}
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
              onClick={onClose}
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
      <form className={formClasses.detailsCategory}>
        <Title className={formClasses.detailsCategoryTitle}>Change password</Title>
        <PasswordInput
          withAsterisk
          label="Enter current password"
          classNames={inputClasses}
          {...privacySettingsForm.getInputProps('currentPassword')}
        />
        <PasswordInput
          withAsterisk
          label="Enter new password"
          classNames={inputClasses}
          {...privacySettingsForm.getInputProps('newPassword')}
        />
        <PasswordInput
          withAsterisk
          label="Confirm new password"
          classNames={inputClasses}
          {...privacySettingsForm.getInputProps('confirmPassword')}
        />
        <Box className={privacyClasses.accountActionBtnsContainer}>
          {accountActions.map((actions, idx) => (
            <button key={idx} onClick={actions.cb} className={privacyClasses.accountActionBtns}>
              <span className={privacyClasses.accountActionIcon}>
                <MdOutlineHelpCenter />
              </span>
              <span className={privacyClasses.accountActionText}>{actions.action}</span>
            </button>
          ))}
        </Box>
        <Button
          className={formClasses.formSubmitBtn}
          size="sm"
          type="button"
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

const inputStyles = createStyles((theme) => ({
  input: {
    paddingBlockStart: rem(18),
    height: rem(60),
    fontSize: rem(14),
    fontWeight: 500,
    borderRadius: rem(8),
    color: '#697082',

    [`@media screen and (max-width: ${rem(768)})`]: {
      maxWidth: '100vw',
    },
  },

  innerInput: {
    maxWidth: rem(420),
    height: rem(60),
    paddingBlockStart: rem(18),
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: rem(12),
    fontWeight: 400,
    zIndex: 1,
    paddingBlock: rem(8),
    paddingInline: rem(14),
    color: '#697082',
  },
}));
