import { Text, Box, Title, TextInput, Select, Button, Divider } from '@mantine/core';
import { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';
import { skillsAPIList } from '../../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import {
  showErrorNotification,
  showSuccessNotification,
  showLoadingNotification,
} from '../../../../../utils/functions/showNotification';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { skillRate } from '../../constants/SelectionOptions';
import { useNavigate } from 'react-router-dom';
import { MdRemoveCircle } from 'react-icons/md';
import { skillExpertiseDict } from '../../../constants/dictionaries';
import { Layout } from '../Layout';
import { AiOutlinePlus } from 'react-icons/ai';
import noData from '../../assets/noData.png';

export const AddSkills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [workExperienceSelect, setWorkExperienceSelect] = useState<Array<Record<string, string>>>([]);

  const { authClient, skillForm, scrollToTop, setForceRender, workExperienceData } = useGlobalContext();

  const handleRemoveSkills = (_id: number) => {
    const newSkillsList = skills.filter((skill, id) => id !== _id);
    setSkills(newSkillsList);
  };

  const handleAddSkill = () => {
    if (!skillForm.validate().hasErrors) {
      if (skillForm.values.workExperience !== '') {
        setSkills((prevSkills) => [
          ...prevSkills,
          {
            ...skillForm.values,
          },
        ]);
      } else {
        setSkills((prevSkills) => [
          ...prevSkills,
          {
            skillName: skillForm.values.skillName,
            expertise: skillForm.values.expertise,
          },
        ]);
      }

      skillForm.setFieldValue('skillName', '');
      skillForm.setFieldValue('expertise', '');
      skillForm.setFieldValue('workExperience', '');
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
      return;
    }
    for (const skill of skills) {
      const requestBody: SkillRequestBody = skill;
      const res = await HttpClient.callApiAuth<createSkill>(
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

    setForceRender((prev) => !prev);
    setSkills([]);
    skillForm.reset();
    handleProfilePage();
  };

  const handleAddWorkExperiencePage = () => {
    navigate('/candidate/profile/experience/addExperience');
    scrollToTop();
  };

  useEffect(() => {
    setWorkExperienceSelect([]);

    workExperienceData.forEach((experience) => {
      setWorkExperienceSelect((current) => [
        ...current,
        {
          value: experience.id,
          label: `${experience.companyName} (${experience.designation})`,
        },
      ]);
    });
  }, [workExperienceData.length]);

  return (
    <>
      <Layout>
        {workExperienceSelect.length > 0 ? (
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
                  maxLength={30}
                />
              </Box>
              <Box className="input-section">
                <Title className="title">Expertise</Title>
                <Select
                  clearable
                  searchable
                  nothingFound="No options"
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
                <Title className="title">Work Experience</Title>
                <Select
                  clearable
                  searchable
                  nothingFound="No options"
                  className="inputClass"
                  label="Select work experience"
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
                  data={workExperienceSelect}
                  {...skillForm.getInputProps('workExperience')}
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
                      <button className="remove-skills-btn" type="button" onClick={() => handleRemoveSkills(index)}>
                        <MdRemoveCircle />
                      </button>
                      <Text className="add-skill-name">{skillName}</Text>
                      {expertise && <Text className="add-skill-rate">{skillExpertiseDict[expertise]}</Text>}
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
        ) : (
          <section className="container add-work-experience">
            <Box className="see-all-header">
              <Box className="go-back-btn" onClick={handleProfilePage}>
                <BsArrowLeft className="arrow-left-icon" size={'16px'} />
                <Text>Profile</Text>
              </Box>
            </Box>
            <Box className="no-data-wrapper">
              <img className="no-data" src={noData} alt="No data" />
              <Title
                style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  width: 'min(100%, 40ch)',
                  marginBlock: '1rem 2rem',
                  textAlign: 'center',
                  color: '#697082',
                  lineHeight: '1.5',
                }}
              >
                It seems you haven't added any work experience! Please add at-least one experience first.
              </Title>
              <Button leftIcon={<AiOutlinePlus />} onClick={handleAddWorkExperiencePage} className="add-records">
                Add Experience Now
              </Button>
            </Box>
          </section>
        )}
      </Layout>
    </>
  );
};
