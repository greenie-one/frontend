import '../styles/global.scss';
import { useState } from 'react';
import { useProfileContext } from '../context/ProfileContext';
import {
  Text,
  Box,
  Button,
  Modal,
  createStyles,
  em,
  rem,
  Select,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';

const expertise = [
  { value: 'Amateur', label: 'Amature' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Expert', label: 'Expert' },
];

export const SeeAllSkills = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [updateId, setUpdateId] = useState<string>('');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { classes: inputClasses } = inputStyles();
  const { detailsPage, dispatchDetailsPage, skillData, deleteSkill, skillForm, updateSkill } =
    useProfileContext();

  const handleToggleSkillsDetails = (): void => {
    dispatchDetailsPage({
      type: 'SET_SEE_ALL_SKILLS',
      payload: !detailsPage.seeAllSkills,
    });
  };

  const openModal = (id: string) => {
    setUpdateId(id);
    open();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateSkill(updateId);
    close();
  };
  return (
    <section className="container">
      <Modal
        className="modal"
        size={'65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        title="Add Skills"
      >
        <form onSubmit={handleSubmit}>
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
              <Button color="teal" type="submit">
                Save
              </Button>
              <Button type="button" variant="default" onClick={close}>
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
      <Box className="see-all-header">
        <Box className="go-back-btn" onClick={handleToggleSkillsDetails}>
          <BsArrowLeft className="arrow-left-icon" size={'16px'} />
          <Text>Profile</Text>
          <AiOutlineRight className="arrow-right-icon" size={'16px'} />
        </Box>
        <Text>{`Skills (${skillData.length})`}</Text>
      </Box>
      <Box className="skills-card-wrapper">
        {skillData.map(({ _id, designation, skillRate, isVerified }, index) => {
          return (
            <Box className="skill-card" key={index}>
              <Box className="skill-card-header">
                <Text className="designation">{designation}</Text>
                {isVerified ? (
                  <Button
                    leftIcon={<MdVerified color="#8CF078" size={'16px'} />}
                    className="verified"
                  >
                    Verified
                  </Button>
                ) : (
                  <Button
                    leftIcon={<CgSandClock color="#FF7272" size={'16px'} />}
                    className="pending"
                  >
                    Pending
                  </Button>
                )}
              </Box>
              <Text className="skill-rate">{skillRate}</Text>
              <Box className="skill-btn-wrapper">
                {isVerified ? (
                  <Button className="view-details-btn">View details</Button>
                ) : (
                  <Button mt={'8px'} className="get-verified">
                    Get Verified
                  </Button>
                )}
                <Box className="button-wrappers">
                  <Box className="icon" onClick={() => deleteSkill(_id)}>
                    <RiDeleteBin6Line size={'22px'} className="btn" />
                  </Box>
                  <Box className="icon" onClick={() => openModal(_id)}>
                    <RiEdit2Line size={'22px'} className="btn" />
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </section>
  );
};

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: '10px',
    marginBottom: '10px',
  },

  icon: {
    marginTop: '16px',
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
