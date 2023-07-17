import { Text, Box, Title, TextInput, Select, Button, Divider } from '@mantine/core';
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';
import { skillsAPIList } from '../../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import {
  showErrorNotification,
  showSuccessNotification,
  showLoadingNotification,
} from '../../../../../utils/functions/showNotification';
import { HttpClient, Result } from '../../../../../utils/generic/httpClient';
import { skillRate } from '../../constants/SelectionOptions';
import { Navbar } from '../Navbar';
import { useNavigate } from 'react-router-dom';

export const AddSkills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Skill[]>([]);
  const { authClient, skillForm, scrollToTop, setForceRender } = useGlobalContext();

  const handleAddSkill = () => {
    if (!skillForm.validateField('skillName').hasError && !skillForm.validateField('expertise').hasError) {
      const newSkill: Skill = {
        skillName: skillForm.values.skillName,
        expertise: skillForm.values.expertise,
        workExperience: '',
      };
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      skillForm.values.skillName = '';
      skillForm.values.expertise = '';
    }
  };

  const handleProfilePage = () => {
    scrollToTop();
    navigate('/candidate/profile');
  };

  const handleSkillContinue = async () => {
    showLoadingNotification({
      title: 'Wait !',
      message: 'We are adding your skill.',
    });

    if (skills.length < 1) {
      showErrorNotification('NO_SKILL');
    }
    if (skills.length > 0) {
      for (const skill of skills) {
        const requestBody: SkillRequestBody = {
          skillName: skill.skillName,
          expertise: skill.expertise,
          workExperience: skill.workExperience,
        };
        const res: Result<createSkill> = await HttpClient.callApiAuth(
          {
            url: `${skillsAPIList.postSkill}`,
            method: 'POST',
            body: requestBody,
          },
          authClient
        );
        if (res.ok) {
          showSuccessNotification({
            title: 'Success !',
            message: 'Skills have been added successfully !',
          });
        } else {
          showErrorNotification(res.error.code);
        }
      }
      scrollToTop();
      setForceRender((prev) => !prev);
      setSkills([]);
      skillForm.values.skillName = '';
      skillForm.values.expertise = '';
      handleProfilePage();
    }
  };
  return (
    <>
      <Navbar />{' '}
      <main className="profile">
        <section className="container add-work-experience">
          <Box className="see-all-header">
            <Box className="go-back-btn" onClick={handleProfilePage}>
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
                className="inputClass"
                {...skillForm.getInputProps('skillName')}
              />
            </Box>
            <Box className="input-section">
              <Title className="title">Expertise</Title>
              <Select
                withAsterisk
                data={skillRate}
                label="Select your expertise"
                className="inputClass"
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
                    {expertise === 'AMATEUR' && <Text className="add-skill-rate">Amature</Text>}
                    {expertise === 'BEGINNER' && <Text className="add-skill-rate">Beginner</Text>}
                    {expertise === 'HIGHLY_COMPETENT' && <Text className="add-skill-rate">Highly Competent</Text>}
                    {expertise === 'EXPERT' && <Text className="add-skill-rate">Expert</Text>}
                    {expertise === 'SUPER_SPECIALIST' && <Text className="add-skill-rate">Super Specialist</Text>}
                    {expertise === 'MASTER' && <Text className="add-skill-rate">Master</Text>}
                  </Box>
                );
              })}
            </Box>
            {skills.length > 0 && <Divider color="#ebebeb" />}

            <Box className="location-wrapper">
              <Box className="btn-wrapper">
                <Button type="button" className="cancel-btn" variant="default" onClick={handleProfilePage}>
                  Back
                </Button>
                {skills.length > 0 ? (
                  <Button className="green-btn" onClick={handleSkillContinue}>
                    Continue
                  </Button>
                ) : (
                  <Button disabled className="disabled-btn">
                    Continue
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </section>
      </main>{' '}
    </>
  );
};
