import React, { useState } from 'react';
import { Box, Chip, Group, Title, TextInput, Textarea, Button, Modal, Text } from '@mantine/core';
import { useGlobalContext } from '../../../context/GlobalContext';
import { ProfileModal } from '../../candidate/profile/types/ProfileGeneral';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { confirmationModalStyle } from '../styles/articleContentStyles';
import { detailsFormStyles, profileSettingsStyles } from '../styles/articleContentStyles';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import { ReportScreens } from '../../candidate/profile/components/reports/ReportScreens';

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
  const navigate = useNavigate();

  const { classes: formClasses } = detailsFormStyles();
  const { classes: profileClasses } = profileSettingsStyles();
  const { classes: modalStyles } = confirmationModalStyle();
  const { profileForm, updateProfile, profileData } = useGlobalContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [openModal, setOpenModal] = useState<ProfileModal>(null);

  const emailList = ['tanvitomar0579@gmail.com', 'swanandwagh7@gmail.com', 'example@.com'];
  const targetEmail = String(profileData.email);

  const [email, setEmail] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  console.log(profileData);

  const [showButton, setShowButton] = useState<boolean>(emailList.includes(targetEmail));
  // const checkEmailInList = () => {
  //   setShowButton(emailList.includes(targetEmail));
  // };
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/screens?email=${email}`);
  };
  const handleOpenModal = (modalType: ProfileModal) => {
    if (modalType === 'Save Profile') {
      setOpenModal(modalType);
      open();
    } else {
      setOpenModal(modalType);
      open();
    }
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleConfirmation();
  };

  const handleConfirmation = () => {
    updateProfile();
    close();
  };
  // console.log(profileData.email);
  return (
    <>
      {openModal === 'Save Profile' && (
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
      )}
      {openModal === 'Download' && (
        <Modal opened={opened} onClose={close} padding="xl" radius="lg" size="lg" centered classNames={modalStyles}>
          <Box className={modalStyles.downloadMsgWrapper}>
            <Title className={modalStyles.title}>Enter your Email ID</Title>
            <TextInput label="Email ID" className="inputClass" value={email} onChange={handleInputChange} />
            <div className={formClasses.profiledetailsForm}>
              {/* <Button
                className={formClasses.downloadBtn}
                size="sm"
                type="button"
                radius="xl"
                color="teal"
                onClick={() => handleOpenModal('Save Profile')}
              >
                Submit
              </Button> */}
              {/* <PDFDownloadLink document={<ReportScreens />} fileName="FORM"> */}
              <Button
                className={formClasses.downloadBtn}
                size="sm"
                type="button"
                radius="xl"
                color="teal"
                onClick={handleFormSubmit}
              >
                Generate Report
              </Button>

              {/* </PDFDownloadLink> */}
            </div>
          </Box>
        </Modal>
      )}

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
        <div className={formClasses.profiledetailsForm}>
          <Button
            className={formClasses.formSubmitBtn}
            size="sm"
            type="button"
            radius="xl"
            color="teal"
            onClick={() => handleOpenModal('Save Profile')}
          >
            Save
          </Button>
          {showButton && (
            <Button
              className={formClasses.formSubmitBtn}
              size="sm"
              type="button"
              radius="xl"
              color="teal"
              onClick={() => handleOpenModal('Download')}
            >
              Download
            </Button>
          )}
        </div>
      </form>
    </>
  );
};
