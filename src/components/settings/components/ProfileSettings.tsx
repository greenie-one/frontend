import React from 'react';
import { Box, Chip, Group, Title, TextInput, Textarea, Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useGlobalContext } from '../../../context/GlobalContext';
import { confirmationModalStyle } from '../styles/articleContentStyles';
import { detailsFormStyles, profileSettingsStyles } from '../styles/articleContentStyles';

const introductionTags = [
  'Team Player',
  'Energetic',
  'Optimistic',
  'Self Interior',
  'Hard Working',
  'Prodigy',
  'Lone Wolf',
  'Micro Planner',
  'Jack of All Trade',
];

export const ProfileSettings: React.FC = (): JSX.Element => {
  const { classes: formClasses } = detailsFormStyles();
  const { classes: profileClasses } = profileSettingsStyles();
  const { classes: modalStyles } = confirmationModalStyle();
  const { profileForm, updateProfile, profileData } = useGlobalContext();
  const [opened, { open, close }] = useDisclosure(false);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleConfirmation();
  };

  const handleConfirmation = () => {
    updateProfile();
    close();
  };

  return (
    <>
      <Modal
        centered
        size="lg"
        radius="lg"
        padding="xl"
        onClose={close}
        opened={opened}
        title="Confirmation"
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
        <Title className={formClasses.detailsCategoryTitle}>Name</Title>
        <TextInput
          maxLength={10}
          minLength={3}
          label="First Name"
          className="inputClass"
          placeholder={profileData.firstName}
          {...profileForm.getInputProps('firstName')}
        />
        <TextInput
          maxLength={10}
          minLength={3}
          label="Last Name"
          className="inputClass"
          placeholder={profileData.lastName}
          {...profileForm.getInputProps('lastName')}
        />

        <Title className={formClasses.detailsCategoryTitle}>Bio</Title>
        <Textarea
          minRows={8}
          maxLength={250}
          label="Edit your bio"
          className="text-area-input"
          placeholder={profileData.bio}
          {...profileForm.getInputProps('bio')}
        />
        <Box className={formClasses.detailsCategory}>
          <Title order={3} className={formClasses.detailsCategoryTitle}>
            Your Introduction
          </Title>

          <Chip.Group multiple {...profileForm.getInputProps('descriptionTags')}>
            <Group className={profileClasses.profileChipsWrapper}>
              {introductionTags.map((skill, id) => (
                <Chip
                  key={id}
                  value={skill}
                  className={profileClasses.chipIcon}
                  disabled={
                    profileForm.values.descriptionTags.length === 3 &&
                    !profileForm.values.descriptionTags.includes(skill)
                  }
                >
                  {skill}
                </Chip>
              ))}
            </Group>
          </Chip.Group>
        </Box>

        <Button className={formClasses.formSubmitBtn} size="sm" type="button" radius="xl" color="teal" onClick={open}>
          Save
        </Button>
      </form>
    </>
  );
};
