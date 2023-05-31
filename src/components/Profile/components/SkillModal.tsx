import React, { useState } from 'react';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { useLocalStorage } from '@mantine/hooks';
import { Box, Title, TextInput, createStyles, em, rem, Select, Button } from '@mantine/core';
import { useProfileContext } from '../context/ProfileContext';
import ApiList from '../../../assets/api/ApiList';
import { FaExclamation } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs';

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};
interface ISkillModalPropsType {
  closeModal: () => void;
  getSkillsFn: () => Promise<void>;
}

const expertise = [
  { value: 'amateur', label: 'Amature' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'expert', label: 'Expert' },
];

export const SkillModal: React.FC<ISkillModalPropsType> = ({
  closeModal,
  getSkillsFn,
}): JSX.Element => {
  const { classes: inputClasses } = inputStyles();
  const { skillForm } = useProfileContext();
  const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens>({ key: 'auth-tokens' });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postSkill = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isLoading) {
      return Promise.resolve(null);
    }

    skillForm.validateField('skillName');
    if (skillForm.validateField('skillName').hasError) {
      return;
    }

    setIsLoading(true);
    try {
      notifications.show({
        id: 'load-data',
        title: 'Please wait !',
        message: 'We are adding your skill.',
        loading: true,
        autoClose: false,
        withCloseButton: false,
        color: 'teal',
        sx: { borderRadius: em(8) },
      });

      const res = await axios.post(
        ApiList.postSkill,
        {
          designation: skillForm.values.skillName,
          isVerified: false,
          skillRate: 0,
          user: 'GRN788209',
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        }
      );

      if (res.data) {
        await getSkillsFn();

        notifications.update({
          id: 'load-data',
          color: 'teal',
          title: 'Success !',
          message: 'New skill added to your profile.',
          icon: <BsCheckLg />,
          autoClose: 2000,
        });

        skillForm.setFieldValue('skillName', '');
        skillForm.setFieldValue('expertise', '');
        closeModal();
      }
    } catch (err: any) {
      console.error('Error in posting skill: ', err);

      notifications.update({
        id: 'load-data',
        color: 'teal',
        title: 'Error !',
        message: 'Something went wrong! Please check browser console for more info.',
        icon: <FaExclamation />,
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form>
      <Box className="input-section border-bottom">
        <Title className="title">Skill name</Title>
        <TextInput
          withAsterisk
          data-autofocus
          label="Eg. Frontend, Backend"
          classNames={inputClasses}
          {...skillForm.getInputProps('skillName')}
        />
      </Box>
      <Box className="input-section border-bottom">
        <Title className="title">Expertise</Title>
        <Select
          withAsterisk
          data={expertise}
          label="Select your expertise"
          classNames={inputClasses}
          {...skillForm.getInputProps('expertise')}
        />
      </Box>
      <Box className="location-wrapper">
        <Box className="btn-wrapper">
          <Button color="teal" type="submit" onClick={postSkill}>
            Save
          </Button>
          <Button type="button" variant="default" onClick={closeModal}>
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
};

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: '10px',
    marginBottom: '10px',
  },

  input: {
    height: '58px',
    paddingTop: '18px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid #D1D4DB',
    lineHeight: '19px',
    letterSpacing: '-0.02em',
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      height: '46px',
      borderRadius: '6px',
      fontSize: '10px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },

  innerInput: {
    height: rem(54),
    paddingTop: rem(28),

    [`@media screen and (max-width: ${em(1024)})`]: {
      paddingTop: rem(8),
    },
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: '12px',
    paddingLeft: '14px',
    paddingTop: '7px',
    lineHeight: '14.52px',
    letterSpacing: '-0.02em',
    zIndex: 1,
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      fontSize: '10px',
      lineHeight: '10px',
      paddingTop: '8px',
    },
  },
}));
