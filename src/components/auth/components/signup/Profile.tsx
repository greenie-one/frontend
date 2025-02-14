import { useState, useRef } from 'react';
import { TextInput, Text, Button, Box, Flex, Chip, Group } from '@mantine/core';

import { useGlobalContext } from '../../../../context/GlobalContext';
import { useAuthContext } from '../../context/AuthContext';

import { profileAPIList } from '../../../../assets/api/ApiList';
import { HttpClient } from '../../../../utils/generic/httpClient';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';

import { BsArrowLeft } from 'react-icons/bs';
import profileIllustration from '../../assets/profileillustration.png';
import '../../styles/global.scss';

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

const Profile = () => {
  const { authClient } = useGlobalContext();
  const { profileForm, dispatch, setForceRender } = useAuthContext();

  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const handleGoBack = () => {
    if (active === 1) {
      dispatch({ type: 'PREVSIGNUPSTEP' });
    } else {
      prevStep();
    }
  };

  const nextStep = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (
      active === 1 &&
      !profileForm.validateField('firstName').hasError &&
      !profileForm.validateField('lastName').hasError
    ) {
      profileForm.clearErrors();
      setActive((current) => (current < 4 ? current + 1 : current));
    }

    if (active === 2) {
      setActive((current) => (current < 4 ? current + 1 : current));
    }
  };

  const submitProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) {
      return Promise.resolve(null);
    }

    if (active === 2) {
      setIsLoading(true);
      profileForm.clearErrors();

      showLoadingNotification({
        title: 'Adding Profile Details...',
        message: 'Please wait while we add your profile details.',
      });

      const requestBody: ProfileFormType = profileForm.values;
      const res = await HttpClient.callApiAuth(
        {
          url: `${profileAPIList.createProfile}`,
          method: 'POST',
          body: requestBody,
        },
        authClient
      );

      if (res.ok) {
        showSuccessNotification({
          title: 'Success !',
          message: 'Your profile details have been added successfully.',
        });
        setForceRender((prev) => !prev);
      } else {
        showErrorNotification(res.error.code);
      }
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box className="progress-bar-wrapper">
        <Box className="progress-bar" bg={'#9fe870'}></Box>
        <Box className="progress-bar" bg={active === 2 ? '#9fe870' : '#F3F3F3'}></Box>
      </Box>
      {active !== 1 && (
        <>
          <Flex className="tabTopBox" onClick={handleGoBack}>
            <BsArrowLeft size={'16px'} />
            <Text className="tabHeading">Go Back</Text>
          </Flex>
        </>
      )}

      {active === 1 && (
        <Box>
          <Text className="steps">{`Steps ${active}`}/2</Text>
          <Text className="profileText">Enter Name As Per Aadhar Card</Text>
          <TextInput
            label="First Name"
            className="inputClass"
            {...profileForm.getInputProps('firstName')}
            ref={firstNameRef}
            maxLength={20}
            minLength={3}
          />
          <TextInput
            label="Last Name"
            className="inputClass"
            {...profileForm.getInputProps('lastName')}
            ref={lastNameRef}
            maxLength={20}
            minLength={3}
          />
          <Button type="submit" className="primaryBtn" onClick={nextStep}>
            Continue
          </Button>
        </Box>
      )}

      {active === 2 && (
        <Box>
          <Text className="steps">{`Steps ${active}`}/2</Text>
          <Box className="profile-box">
            <img className="profileIllustration" src={profileIllustration} alt="" />
          </Box>

          <Text className="profileText" align="center">
            Introduce yourself in 3 words
          </Text>

          <Box className="skills-box">
            <Chip.Group multiple {...profileForm.getInputProps('descriptionTags')}>
              <Group className="skill-wrapper">
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

          <Button
            className="secondaryBtn"
            onClick={submitProfile}
            type="submit"
            disabled={profileForm.values.descriptionTags.length !== 3}
          >
            Take me to my Greenie Profile
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
