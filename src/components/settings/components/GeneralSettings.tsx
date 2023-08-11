import React from 'react';
import { Title, TextInput, Button, Modal, Text, Box } from '@mantine/core';
import { useForm, isEmail, isNotEmpty } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import { useGlobalContext } from '../../../context/GlobalContext';
import { detailsFormStyles } from '../styles/articleContentStyles';
import { confirmationModalStyle } from '../styles/articleContentStyles';

export const GeneralSettings: React.FC = (): JSX.Element => {
  const { classes: formClasses } = detailsFormStyles();
  const { classes: modalStyles } = confirmationModalStyle();

  const { IDs } = useGlobalContext();
  const [opened, { open, close }] = useDisclosure(false);

  const handleConfirmation = () => {
    close();
  };

  const generalSettingsForm = useForm({
    initialValues: {
      phoneNumber: null,
      emailId: '',
    },

    validate: {
      phoneNumber: isNotEmpty('Phone number cannot be empty'),
      emailId: isEmail('Invalid email id!'),
    },
  });

  const aadharDetails: DocsType | undefined = IDs?.find((item) => item.id_type.toLowerCase() === 'aadhar');
  const panDetails: DocsType | undefined = IDs?.find((item) => item.id_type.toLowerCase() === 'pan');

  const getAge = (dateOfBirth: string): number => {
    const dob = new Date(dateOfBirth);
    const now = new Date();

    const yearsDiff = now.getFullYear() - dob.getFullYear();
    const monthsDiff = now.getMonth() - dob.getMonth();
    const daysDiff = now.getDate() - dob.getDate();

    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      return yearsDiff - 1;
    } else {
      return yearsDiff;
    }
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

      <form className={formClasses.detailsCategory}>
        <Title className={formClasses.detailsCategoryTitle}>Contact details</Title>
        <TextInput label="Phone number" className="inputClass" {...generalSettingsForm.getInputProps('phoneNumber')} />
        <TextInput label="Email" className="inputClass" {...generalSettingsForm.getInputProps('emailId')} />

        <Title className={formClasses.detailsCategoryTitle}>Demographics</Title>
        <TextInput disabled value={getAge(aadharDetails?.dob ?? '')} label="Age" className="inputClass" />
        <TextInput disabled value={aadharDetails?.dob} label="Date of birth" className="inputClass" />

        <Title className={formClasses.detailsCategoryTitle}>Aadhar details</Title>
        <TextInput disabled className="inputClass" label="Phone number linked with Aadhaar" />
        <TextInput disabled value={aadharDetails?.id_number} label="Aadhar number" className="inputClass" />

        <Title className={formClasses.detailsCategoryTitle}>PAN details</Title>
        <TextInput disabled value={panDetails?.id_number} label="PAN number" className="inputClass" />

        <Button className={formClasses.formSubmitBtn} size="sm" type="button" radius="xl" color="teal" onClick={open}>
          Save
        </Button>
      </form>
    </>
  );
};
