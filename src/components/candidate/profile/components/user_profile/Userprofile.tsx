import React, { useState, useRef } from 'react';
import { Box, Button, Modal, Text, Title, Textarea, Divider, TextInput, Chip, Group, CopyButton } from '@mantine/core';
import axios from 'axios';
import emptyProfile from '../../assets/emptyProfile.png';
import level from '../../assets/level.png';
import levelFilled from '../../assets/levelFilled.png';
import medal from '../../assets/medal.png';
import { profileAPIList } from '../../../../../assets/api/ApiList';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useProfileContext } from '../../context/ProfileContext';
import { MdVerified, MdOutlineEdit, MdOutlineContentCopy } from 'react-icons/md';
import { showLoadingNotification, showSuccessNotification } from '../../../../../utils/functions/showNotification';

const skillSetOne = [
  'Lone Wolf',
  'Energetic',
  'Prodigy',
  'Self Initiator',
  'Hardworking',
  'Optimistic',
  'Team Player',
  'Micro Planner',
  'Jack of All',
];

export const Userprofile = () => {
  const { authClient } = useGlobalContext();
  const authToken = authClient.getAccessToken();
  //-------------profile photo------------------------
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState<string>(emptyProfile);

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    showLoadingNotification({ title: 'Wait !', message: 'Please wait while we update your profile picture' });
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('profilePicture', event.target.files[0]);
      const res = await axios.post(`${profileAPIList.updateProfilePicture}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });
      setSrc(res.data.url);
      showSuccessNotification({ title: 'Success !', message: 'Profile picture is updated !' });
    }
  };

  //----------------Bio section-----------------------------------

  const userLevel = 0;
  const greeneId = 'GRN788209';
  const screenSize = useMediaQuery('(min-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const { profileData, profileForm, updateProfile, documentsData } = useProfileContext();

  const onClose = () => {
    profileForm.values.firstName = '';
    profileForm.values.lastName = '';
    profileForm.values.bio = '';
    profileForm.values.descriptionTags = [];
    close();
  };

  const isSubmitDisabled =
    profileForm.values.firstName === '' &&
    profileForm.values.lastName === '' &&
    profileForm.values.bio === '' &&
    profileForm.values.descriptionTags.length !== 3;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateProfile();
    onClose();
  };

  return (
    <>
      <Modal
        className="modal"
        size={'65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={onClose}
        title="Update Profile"
      >
        <form onSubmit={handleSubmit}>
          <Box className="input-section">
            <Title className="title">First Name</Title>
            <TextInput
              withAsterisk
              data-autofocus
              label="Your first name"
              className="inputClass"
              {...profileForm.getInputProps('firstName')}
            />
          </Box>
          <Box className="input-section">
            <Title className="title">Last Name</Title>
            <TextInput
              withAsterisk
              data-autofocus
              label="Your last name"
              className="inputClass"
              {...profileForm.getInputProps('lastName')}
            />
          </Box>
          <Divider mb={'10px'} />
          <Box className="input-section">
            <Title className="title">Tell Us about yourself</Title>
            <Textarea
              withAsterisk
              data-autofocus
              label="Your bio"
              className="text-area-input"
              {...profileForm.getInputProps('bio')}
            />
          </Box>
          <Divider mb={'10px'} />
          <Box>
            <Title className="title" align="center">
              Introduce yourself in 3 words
            </Title>

            <Chip.Group multiple {...profileForm.getInputProps('descriptionTags')}>
              <Group className="description-tags-box">
                {skillSetOne.map((skill) => (
                  <Chip
                    key={skill}
                    value={skill}
                    variant="filled"
                    color="teal"
                    size={'xs'}
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

          <Box className="btn-wrapper">
            <Button type="button" variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button color="teal" disabled={isSubmitDisabled} type="submit">
              Save
            </Button>
          </Box>
        </form>
      </Modal>

      <section className="profile-section">
        <Box className="cover-photo">
          <Button leftIcon={<MdOutlineEdit />} className="edit-btn">
            Update Cover
          </Button>
        </Box>

        <Box className="profile-photo">
          <img src={src} alt="emptyProfile" className="profile-image" />
          <Button leftIcon={<MdOutlineEdit />} className="edit-btn" onClick={openFileInput}>
            Change picture
          </Button>
          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={onImageChange} />
        </Box>
      </section>
      <section className="bio-section container">
        <Box className="icon" onClick={open}>
          <MdOutlineEdit size={'22px'} className="btn" />
        </Box>
        <Box className="bio-name-box">
          <Text className="bio-name">
            {profileData.firstName} {profileData.lastName}
          </Text>
          {documentsData.length > 0 && <MdVerified className="name-verified" size={'20px'} />}
        </Box>

        <Box className="chips">
          <Chip.Group>
            <Group>
              {profileData.descriptionTags.map((tag: string) => (
                <Chip key={tag} size={screenSize ? 'sm' : 'xs'}>
                  {tag}
                </Chip>
              ))}
            </Group>
          </Chip.Group>
        </Box>

        <Box className="bio-section-wrapper">
          <Box className="left-section">
            <Box className="level">
              <Text className="level-heading">Level {userLevel}</Text>
              {userLevel === 0 ? (
                <Box className="level-wrapper">
                  <img className="level-img" src={level} alt="level" />
                  <img className="level-img" src={level} alt="level" />
                  <img className="level-img" src={level} alt="level" />
                  <img className="level-img" src={level} alt="level" />
                  <img className="level-img" src={level} alt="level" />
                </Box>
              ) : (
                <Box className="level-wrapper">
                  {userLevel > 0 ? (
                    <img className="level-img" src={levelFilled} alt="level" />
                  ) : (
                    <img src={level} alt="level" />
                  )}
                  {userLevel > 1 ? (
                    <img className="level-img" src={levelFilled} alt="level" />
                  ) : (
                    <img className="level-img" src={level} alt="level" />
                  )}
                  {userLevel > 2 ? (
                    <img className="level-img" src={levelFilled} alt="level" />
                  ) : (
                    <img className="level-img" src={level} alt="level" />
                  )}
                  {userLevel > 3 ? (
                    <img className="level-img" src={levelFilled} alt="level" />
                  ) : (
                    <img className="level-img" src={level} alt="level" />
                  )}
                  {userLevel > 4 ? (
                    <img className="level-img" src={levelFilled} alt="level" />
                  ) : (
                    <img className="level-img" src={level} alt="level" />
                  )}
                </Box>
              )}
            </Box>
            <Box className="border-left"></Box>

            <Box className="medal-wrapper">
              <img className="medal-icon" src={medal} alt="Medal Icon" />
              <Box className="medal-text-box">
                <Text className="top-text">No rank</Text>
                <Text className="percentage">#</Text>
              </Box>
            </Box>
          </Box>
          <Box className="border-left"></Box>
          <Box className="right-section">
            {documentsData.length > 0 ? (
              <CopyButton value={greeneId} timeout={2000}>
                {({ copied, copy }) => (
                  <Box className="greenie-id" onClick={copy}>
                    <Box className="icon-box">
                      <MdOutlineContentCopy size={'18px'} color="#17a672" />
                    </Box>

                    <Box>
                      <Text className="greenie-id-heading">Share Greenie ID </Text>
                      {copied ? <Text className="id">Copied</Text> : <Text className="id">{greeneId}</Text>}
                    </Box>
                  </Box>
                )}
              </CopyButton>
            ) : (
              <Box className="verify-id-bio-text">
                <Text className="text-subheading">Verify your identity </Text>
                <Text className="text-subheading">and get a {<MdVerified color="#8cf078" />} Greenie Check</Text>
              </Box>
            )}
          </Box>
        </Box>
        <Text className="bio-text">{profileData.bio}</Text>
      </section>
    </>
  );
};
