import {
  Box,
  Text,
  TextInput,
  Chip,
  Group,
  CopyButton,
  Button,
  Modal,
  Title,
  createStyles,
  em,
  rem,
  Textarea,
} from '@mantine/core';
import level from '../assets/level.png';
import levelFilled from '../assets/levelFilled.png';
import medal from '../assets/medal.png';
import { MdVerified, MdOutlineEdit, MdOutlineContentCopy } from 'react-icons/md';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useProfileContext } from '../context/ProfileContext';
import { detailsFormStyles } from '../../Settings/styles/articleContentStyles';

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

export const BioSection = () => {
  const userLevel = 0;
  const greeneId = 'GRN788209';
  const screenSize = useMediaQuery('(min-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { classes: inputClasses } = inputStyles();
  const { classes: formStyle } = detailsFormStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const { profileData, profileForm, updateProfile, documentsData } = useProfileContext();

  const onClose = () => {
    profileForm.values.firstName = '';
    profileForm.values.lastName = '';
    profileForm.values.bio = '';
    profileForm.values.descriptionTags = [];
    close();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateProfile();
    onClose();
  };

  return (
    <section className="bio-section container">
      <Modal
        className="modal"
        size={'65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={onClose}
        title="Add Skills"
      >
        <form onSubmit={handleSubmit}>
          <Box className="input-section">
            <Title className="title">First Name</Title>
            <TextInput
              withAsterisk
              data-autofocus
              label="Your first name"
              classNames={inputClasses}
              {...profileForm.getInputProps('firstName')}
            />
          </Box>
          <Box className="input-section border-bottom">
            <Title className="title">Last Name</Title>
            <TextInput
              withAsterisk
              data-autofocus
              label="Your last name"
              classNames={inputClasses}
              {...profileForm.getInputProps('lastName')}
            />
          </Box>
          <Box className="input-section border-bottom">
            <Title className="title">Tell Us about yourself</Title>
            <Textarea
              withAsterisk
              data-autofocus
              label="Your bio"
              classNames={inputClasses}
              className={formStyle.textarea}
              minRows={8}
              {...profileForm.getInputProps('bio')}
            />
          </Box>
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
            <Button color="teal" type="submit">
              Save
            </Button>
          </Box>
        </form>
      </Modal>
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
            {profileData.descriptionTags.map((tag) => (
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
                    {copied ? (
                      <Text className="id">Copied</Text>
                    ) : (
                      <Text className="id">{greeneId}</Text>
                    )}
                  </Box>
                </Box>
              )}
            </CopyButton>
          ) : (
            <Box className="verify-id-bio-text">
              <Text className="text-subheading">Verify your identity </Text>
              <Text className="text-subheading">
                and get a {<MdVerified color="#8cf078" />} Greenie Check
              </Text>
            </Box>
          )}
        </Box>
      </Box>
      <Text className="bio-text">{profileData.bio}</Text>
    </section>
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

  bio: {
    height: '158px',
    paddingTop: '18px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid #D1D4DB',
    lineHeight: '19px',
    letterSpacing: '-0.02em',
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
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
