import React from 'react';
import { Box, Title, TextInput, Button, Modal, Text } from '@mantine/core';
import { privacySettingsStyles } from '../styles/articleContentStyles';
import { usePrivacySettingsForm } from '../hooks/usePrivacySettings';
import { detailsFormStyles, detailsInputStyles } from '../styles/articleContentStyles';
import { useDisclosure } from '@mantine/hooks';
import { confirmationModalStyle } from '../styles/articleContentStyles';
import { MdOutlineHelpCenter } from 'react-icons/md';

export const PrivacySettings: React.FC = (): JSX.Element => {
  const { classes: privacyClasses } = privacySettingsStyles();
  const { classes: inputClasses } = detailsInputStyles();
  const privacySettingsForm = usePrivacySettingsForm();
  const [opened, { open, close }] = useDisclosure(false);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Form submitted successfully!');
  };

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

  const handleConfirmation = () => {
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
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
            {[
              { variant: 'filled', text: 'Confirm', action: handleConfirmation },
              { variant: 'outline', text: 'Cancel', action: close },
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
      <form className={formClasses.detailsCategory}>
        <Title className={formClasses.detailsCategoryTitle}>Change password</Title>
        <TextInput
          withAsterisk
          data-autofocus
          label="Enter current password"
          classNames={inputClasses}
          {...privacySettingsForm.getInputProps('currentPassword')}
        />
        <TextInput
          withAsterisk
          data-autofocus
          label="Enter new password"
          classNames={inputClasses}
          {...privacySettingsForm.getInputProps('newPassword')}
        />
        <TextInput
          withAsterisk
          data-autofocus
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
          onClick={open}
        >
          Save
        </Button>
      </form>
    </>
  );
};
