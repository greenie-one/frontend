import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Text,
  Chip,
  Group,
  CopyButton,
  Title,
  TextInput,
  Divider,
  Textarea,
  Rating,
} from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import axios from 'axios';

import { useGlobalContext } from '../../../../../context/GlobalContext';
import { profileAPIList } from '../../../../../assets/api/ApiList';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../utils/functions/showNotification';
import { HttpClient, Result } from '../../../../../utils/generic/httpClient';
import { getStars } from '../../../../../utils/functions/getStars';

import { MdVerified, MdOutlineEdit, MdOutlineContentCopy } from 'react-icons/md';
import emptyProfile from '../../assets/emptyProfile.png';
import medal from '../../assets/medal.png';

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
  const { authClient, setForceRender, forceRender, profileData, profileForm, updateProfile, IDs } = useGlobalContext();
  const authToken = authClient.getAccessToken();

  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

  //-------------profile photo------------------------
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    showLoadingNotification({ title: 'Wait !', message: 'Please wait while we update your profile picture' });

    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 5 * 1024 * 1024) {
        showErrorNotification('SIZE_EXCEEDS');
        return;
      }

      const formData = new FormData();
      formData.append('profilePicture', event.target.files[0]);

      const res = await axios.post(`${profileAPIList.updateProfilePicture}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });

      const resp: Result<UpdateResponse> = await HttpClient.callApiAuth(
        {
          url: `${profileAPIList.updateProfile}`,
          method: 'PATCH',
          body: { profilePic: res.data.url },
        },
        authClient
      );

      if (resp.ok) {
        showSuccessNotification({ title: 'Success !', message: 'Profile picture is updated !' });
        setForceRender((prev) => !prev);

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        showErrorNotification(resp.error.code);
      }
    }
  };

  //----------------Bio section-----------------------------------

  const greeneId = profileData?.greenieId ?? '';
  const screenSize = useMediaQuery('(min-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);

  const onClose = () => {
    profileForm.setFieldValue('firstName', '');
    profileForm.setFieldValue('lastName', '');
    profileForm.setFieldValue('bio', '');
    profileForm.setFieldValue('descriptionTags', []);
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

  useEffect(() => {
    setProfileImage(profileData.profilePic);
  }, [profileData.profilePic, forceRender]);

  return (
    <>
      <Modal
        size={'65%'}
        radius={'lg'}
        opened={opened}
        className="modal"
        onClose={onClose}
        fullScreen={isMobile}
        title="Update Profile"
      >
        <form onSubmit={handleSubmit}>
          <Box className="input-section">
            <Title className="title">First Name</Title>
            <TextInput
              withAsterisk
              minLength={3}
              maxLength={20}
              className="inputClass"
              label="Your first name"
              placeholder={profileData.firstName}
              {...profileForm.getInputProps('firstName')}
            />
          </Box>

          <Box className="input-section">
            <Title className="title">Last Name</Title>
            <TextInput
              withAsterisk
              minLength={3}
              maxLength={20}
              label="Your last name"
              className="inputClass"
              placeholder={profileData.lastName}
              {...profileForm.getInputProps('lastName')}
            />
          </Box>
          <Divider mb={'10px'} />

          <Box className="input-section">
            <Title className="title">Tell Us about yourself</Title>
            <Textarea
              withAsterisk
              maxLength={150}
              label="Your bio"
              className="text-area-input"
              placeholder={profileData.bio}
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
        <Box className="cover-photo"></Box>

        <Box className="profile-photo">
          {profileImage ? (
            <img src={profileImage} alt="Profile picture" className="profile-image" />
          ) : (
            <img src={emptyProfile} alt="emptyProfile" className="profile-image" />
          )}

          <Button leftIcon={<MdOutlineEdit />} className="edit-btn" onClick={openFileInput}>
            Change Picture
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
            {profileData?.firstName} {profileData?.lastName}
          </Text>
          {IDs?.length > 0 && <MdVerified className="name-verified" />}
        </Box>

        <Box className="chips">
          <Chip.Group>
            <Group>
              {profileData?.descriptionTags?.map((tag: string) => (
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
              <Text className="level-heading">Level {getStars()}</Text>
              <Box className="level-wrapper">
                <Rating defaultValue={0} value={getStars()} readOnly />
              </Box>
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
            {IDs?.length > 0 ? (
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

        <Box className="bio-text">
          <Text> {profileData.bio}</Text>
        </Box>
      </section>
    </>
  );
};
