import React from 'react';
import { Title, TextInput, Button, Modal, Text, Box } from '@mantine/core';
import { useGeneralSettingsForm } from '../hooks/useGeneralSettings';
import { detailsFormStyles, detailsInputStyles } from '../styles/articleContentStyles';
import { confirmationModalStyle } from '../styles/articleContentStyles';
import { useDisclosure } from '@mantine/hooks';

export const GeneralSettings: React.FC = (): JSX.Element => {
  const { classes: formClasses } = detailsFormStyles();
  const { classes: inputClasses } = detailsInputStyles();
  const generalSettingsForm = useGeneralSettingsForm();
  const [opened, { open, close }] = useDisclosure(false);
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Form submitted successfully!');
  };
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
          <Text className={modalStyles.title}>Are you sure you want to update the changes made?</Text>

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

      <form className={formClasses.detailsCategory} onSubmit={onFormSubmit}>
        <Title className={formClasses.detailsCategoryTitle}>Contact details</Title>
        <TextInput
          withAsterisk
          data-autofocus
          label="Phone number"
          classNames={inputClasses}
          {...generalSettingsForm.getInputProps('phoneNumber')}
        />
        <TextInput
          withAsterisk
          data-autofocus
          label="Email"
          classNames={inputClasses}
          {...generalSettingsForm.getInputProps('emailId')}
        />
        <Title className={formClasses.detailsCategoryTitle}>Demographics</Title>
        <TextInput
          withAsterisk
          data-autofocus
          label="Age"
          classNames={inputClasses}
          {...generalSettingsForm.getInputProps('age')}
        />
        <TextInput
          withAsterisk
          data-autofocus
          label="Date of birth"
          classNames={inputClasses}
          {...generalSettingsForm.getInputProps('dateOfBirth')}
        />
        <Title className={formClasses.detailsCategoryTitle}>Aadhar details</Title>
        <TextInput
          withAsterisk
          data-autofocus
          label="Phone number linked with Aadhaar"
          classNames={inputClasses}
          {...generalSettingsForm.getInputProps('phoneLinkedWithAadhar')}
        />
        <TextInput
          withAsterisk
          data-autofocus
          label="Aadhar number"
          classNames={inputClasses}
          {...generalSettingsForm.getInputProps('aadharNumber')}
        />
        <Title className={formClasses.detailsCategoryTitle}>PAN details</Title>
        <TextInput
          withAsterisk
          data-autofocus
          label="Phone number linked with PAN"
          classNames={inputClasses}
          {...generalSettingsForm.getInputProps('phoneLinkedWithPAN')}
        />
        <TextInput
          withAsterisk
          data-autofocus
          label="PAN"
          classNames={inputClasses}
          {...generalSettingsForm.getInputProps('PANNumber')}
        />

        <Button className={formClasses.formSubmitBtn} size="sm" type="button" radius="xl" color="teal" onClick={open}>
          Save
        </Button>
      </form>
    </>
  );
};
