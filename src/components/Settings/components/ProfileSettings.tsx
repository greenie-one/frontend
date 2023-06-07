import React, { useState } from 'react';
import { Box, Chip, Group, Title } from '@mantine/core';

import { detailsFormStyles, profileSettingsStyles } from '../styles/articleContentStyles';
import { useProfileSettingsForm } from '../hooks/useProfileSettings';
import { profileFormDetailsList, introductionTags } from '../constants/profileFormDetails';
import { SettingsForm } from './SettingsForm';

export const ProfileSettings: React.FC = (): JSX.Element => {
  const { classes: formClasses } = detailsFormStyles();
  const { classes: profileClasses } = profileSettingsStyles();
  const profileSettingsForm = useProfileSettingsForm();

  const [introduction, setIntroduction] = useState<string[]>([]);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Form submitted successfully!');
  };

  return (
    <>
      <SettingsForm
        settingsForm={profileSettingsForm}
        formDetailsList={profileFormDetailsList}
        onSubmitHandler={onFormSubmit}
      >
        <Box className={formClasses.detailsCategory}>
          <Title order={3} className={formClasses.detailsCategoryTitle}>
            Your Introduction
          </Title>
          <Chip.Group multiple={true} value={introduction} onChange={setIntroduction}>
            <Group position="left" mt="md" className={profileClasses.profileChipsWrapper}>
              {introductionTags.map((tags, idx) => (
                <Chip key={idx} value={tags.value} className={profileClasses.chipIcon}>
                  {tags.text}
                </Chip>
              ))}
            </Group>
          </Chip.Group>
        </Box>
      </SettingsForm>
    </>
  );
};
