import { Text, Box, Title, TextInput, createStyles, em, rem, Select, Button, Divider } from '@mantine/core';
import { useState } from 'react';
import { BsArrowLeft, BsCheckLg } from 'react-icons/bs';
import { useProfileContext } from '../context/ProfileContext';
import { GrAdd } from 'react-icons/gr';
import { FaExclamation } from 'react-icons/fa';
import { notifications } from '@mantine/notifications';
import { skillsAPIList } from '../../../assets/api/ApiList';
import axios from 'axios';

type Skill = {
  skillName: string;
  expertise: string;
};

const skillRate = [
  { value: 'BEGINEER', label: 'Begineer/Novice' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'HIGHLY COMPETANT', label: 'Highly Competant' },
  { value: 'ADVANCED', label: 'Advanced Proficiency' },
  { value: 'EXPERT', label: 'Expert' },
  { value: 'MASTER', label: 'Master - Pro(Global Recognition)' },
];

export const AddSkills = () => {
  const { detailsPage, dispatchDetailsPage, getSkills, skillForm, authTokens, scrollToTop } = useProfileContext();
  const [skills, setSkills] = useState<Skill[]>([]);
  const { classes: inputClasses } = inputStyles();

  const handleAddSkill = () => {
    if (!skillForm.validateField('skillName').hasError && !skillForm.validateField('expertise').hasError) {
      const newSkill: Skill = {
        skillName: skillForm.values.skillName,
        expertise: skillForm.values.expertise,
      };
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      skillForm.values.skillName = '';
      skillForm.values.expertise = '';
    }
  };

  const handleAddSkillPage = () => {
    scrollToTop();
    dispatchDetailsPage({ type: 'SET_SEE_ADD_SKILLS', payload: !detailsPage.seeAddSkills });
  };

  const handleSkillContinue = async () => {
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
      if (skills.length < 1) {
        notifications.update({
          id: 'load-data',
          title: 'Error !',
          color: 'red',
          message: 'Please add atleast one skill.',
          icon: <FaExclamation />,
          autoClose: 2200,
        });
      }
      if (skills.length > 0) {
        for (const skill of skills) {
          const res = await axios.post(skillsAPIList.postSkill, skill, {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          });
        }
        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        notifications.update({
          id: 'load-data',
          color: 'teal',
          title: 'Success !',
          message: 'New skills added to your profile.',
          icon: <BsCheckLg />,
          autoClose: 2000,
        });
        getSkills();
        setSkills([]);
        skillForm.values.skillName = '';
        skillForm.values.expertise = '';
        handleAddSkillPage();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <section className="container add-work-experience">
      <Box className="see-all-header">
        <Box className="go-back-btn" onClick={handleAddSkillPage}>
          <BsArrowLeft className="arrow-left-icon" size={'16px'} />
          <Text>Add Skills</Text>
        </Box>
      </Box>
      <form>
        <Box className="input-section">
          <Title className="title">Skill name</Title>
          <TextInput
            withAsterisk
            data-autofocus
            label="Eg. Frontend, Backend"
            classNames={inputClasses}
            {...skillForm.getInputProps('skillName')}
          />
        </Box>
        <Box className="input-section">
          <Title className="title">Expertise</Title>
          <Select
            withAsterisk
            data={skillRate}
            label="Select your expertise"
            classNames={inputClasses}
            {...skillForm.getInputProps('expertise')}
            styles={() => ({
              item: {
                '&[data-selected]': {
                  '&, &:hover': {
                    backgroundColor: '#17a672',
                    color: 'white',
                  },
                },
              },
            })}
          />
        </Box>
        <Box className="input-section">
          <Box></Box>
          <Button className="add-skill-btn" onClick={handleAddSkill} leftIcon={<GrAdd />}>
            Add Skill
          </Button>
        </Box>

        <Divider color="#ebebeb" />
        <Box className="add-skills-wrapper">
          {skills.map((skill, index) => {
            const { expertise, skillName } = skill;
            return (
              <Box key={index} className="add-skill-box">
                <Text className="add-skill-name">{skillName}</Text>
                <Text className="add-skill-rate">
                  {expertise === 'AMATEUR' && 'Amature'}
                  {expertise === 'EXPERT' && 'Expert'}
                </Text>
              </Box>
            );
          })}
        </Box>
        {skills.length > 0 && <Divider color="#ebebeb" />}

        <Box className="location-wrapper">
          <Box className="btn-wrapper">
            <Button type="button" className="cancel-btn" variant="default" onClick={handleAddSkillPage}>
              Back
            </Button>
            <Button className="green-btn" onClick={handleSkillContinue}>
              Continue
            </Button>
          </Box>
        </Box>
      </form>
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
