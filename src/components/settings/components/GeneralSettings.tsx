import React from 'react';
import { Title, TextInput, Button, Modal, Text, Box } from '@mantine/core';
import { useGeneralSettingsForm } from '../hooks/useGeneralSettings';
import { detailsFormStyles } from '../styles/articleContentStyles';
import { confirmationModalStyle } from '../styles/articleContentStyles';
import { useDisclosure } from '@mantine/hooks';
import { DateInput } from '@mantine/dates';

export const GeneralSettings: React.FC = (): JSX.Element => {
  const { classes: formClasses } = detailsFormStyles();
  const generalSettingsForm = useGeneralSettingsForm();
  const [opened, { open, close }] = useDisclosure(false);
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
              {
                variant: 'filled',
                text: 'Confirm',
                action: handleConfirmation,
              },
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
          data-autofocus
          label="Phone number"
          className="inputClass"
          {...generalSettingsForm.getInputProps('phoneNumber')}
        />
        <TextInput
          data-autofocus
          label="Email"
          className="inputClass"
          {...generalSettingsForm.getInputProps('emailId')}
        />
        <Title className={formClasses.detailsCategoryTitle}>Demographics</Title>
        <TextInput data-autofocus label="Age" className="inputClass" {...generalSettingsForm.getInputProps('age')} />
        <DateInput
          data-autofocus
          label="Date of birth"
          className="inputClass"
          {...generalSettingsForm.getInputProps('dateOfBirth')}
        />
        <Title className={formClasses.detailsCategoryTitle}>Aadhar details</Title>
        <TextInput
          data-autofocus
          label="Phone number linked with Aadhaar"
          className="inputClass"
          {...generalSettingsForm.getInputProps('phoneLinkedWithAadhar')}
          maxLength={10}
          minLength={10}
        />
        <TextInput
          data-autofocus
          label="Aadhar number"
          className="inputClass"
          {...generalSettingsForm.getInputProps('aadharNumber')}
          minLength={12}
          maxLength={12}
        />
        <Title className={formClasses.detailsCategoryTitle}>PAN details</Title>
        <TextInput
          data-autofocus
          label="PAN number"
          className="inputClass"
          {...generalSettingsForm.getInputProps('PANNumber')}
          maxLength={10}
          minLength={10}
        />

        <Button className={formClasses.formSubmitBtn} size="sm" type="button" radius="xl" color="teal" onClick={open}>
          Save
        </Button>
      </form>
    </>
  );
};
