import { useState, useRef } from 'react';
import { Text, Box, Title, TextInput, Select, Checkbox, Button, Divider, Textarea } from '@mantine/core';
import pdfIcon from '../../assets/pdfIcon.png';
import { DateInput } from '@mantine/dates';
import { MdOutlineDelete, MdVerified } from 'react-icons/md';
import { VscDebugRestart } from 'react-icons/vsc';
import { useProfileContext } from '../../context/ProfileContext';
import { GrAdd } from 'react-icons/gr';
import linkedInImg from '../../../../auth/assets/linkedIn-logo.png';
import { BsArrowLeft, BsCheckLg } from 'react-icons/bs';
import { skillsAPIList } from '../../../../../assets/api/ApiList';
import uploadIcon from '../../assets/upload.png';
import checkedIcon from '../../assets/check.png';
import tcsLogo from '../../assets/tscLogo.png';
import { workExperienceAPiList } from '../../../../../assets/api/ApiList';
import { CgSandClock } from 'react-icons/cg';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { HttpClient, Result } from '../../../../../utils/generic/httpClient';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../utils/functions/showNotification';
import {
  workType,
  modeOfWork,
  departments,
  companyTypes,
  skillRate,
  documentTags,
} from '../../constants/SelectionOptions';
import { APIError } from '../../../../../utils/generic/httpClient';
import axios from 'axios';
import { docDepotAPIList } from '../../../../../assets/api/ApiList';

export const AddExperience = () => {
  const [experienceChecked, setExperienceChecked] = useState(false);
  const [documentsChecked, setDocumentsChecked] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [workExperienceId, setworkExperienceId] = useState<string>('');
  const { authClient } = useGlobalContext();
  const authToken = authClient.getAccessToken();
  const backgroundStyle = {
    backgroundImage: `url(${tcsLogo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const {
    workExperienceForm,
    getWorkExperience,
    skillForm,
    getSkills,
    scrollToTop,
    setSelectedExperience,
    selectedSkills,
    setSelectedSkills,
    setCandidateActivePage,
    workExperienceData,
  } = useProfileContext();
  const [active, setActive] = useState<number>(1);

  const handleCheck = () => {
    workExperienceForm.values.endDate = '';
    setExperienceChecked(!experienceChecked);
  };

  const handlePrevPage = () => {
    if (active < 4 && active > 0)
      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    if (active === 1) {
      setCandidateActivePage('Profile');
      workExperienceForm.values.designation = '';
      workExperienceForm.values.companyId = '';
      workExperienceForm.values.companyName = '';
      workExperienceForm.values.companyType = '';
      workExperienceForm.values.linkedInUrl = '';
      workExperienceForm.values.workEmail = '';
      workExperienceForm.values.workType = '';
      workExperienceForm.values.modeOfWork = '';
      workExperienceForm.values.startDate = '';
      workExperienceForm.values.endDate = '';
    }
    if (active === 2) {
      setActive(1);
    }
    if (active === 3) {
      setActive(2);
    }
  };

  const handleExperienceContinue = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !workExperienceForm.validateField('designation').hasError &&
      !workExperienceForm.validateField('companyType').hasError &&
      !workExperienceForm.validateField('companyName').hasError &&
      !workExperienceForm.validateField('workEmail').hasError &&
      !workExperienceForm.validateField('startDate').hasError &&
      !workExperienceForm.validateField('workType').hasError &&
      !workExperienceForm.validateField('modeOfwork').hasError &&
      !workExperienceForm.validateField('department').hasError
    ) {
      showLoadingNotification({ title: 'Please wait !', message: 'We are adding your work experience.' });
      workExperienceForm.clearErrors();
      const requestBody: ExperienceRequestBody = {
        designation: workExperienceForm.values.designation,
        companyType: workExperienceForm.values.companyType,
        email: workExperienceForm.values.workEmail,
        workMode: workExperienceForm.values.modeOfWork,
        department: workExperienceForm.values.department,
        workType: workExperienceForm.values.workType,
        companyName: workExperienceForm.values.companyName,
        companyId: workExperienceForm.values.companyId,
        companyStartDate: workExperienceForm.values.startDate,
        isVerified: false,
        reasonForLeaving: workExperienceForm.values.reasonForLeaving,
      };
      if (workExperienceForm.values.endDate !== '') {
        requestBody.companyEndDate = workExperienceForm.values.endDate;
      }
      const res: Result<createExperience, APIError> = await HttpClient.callApiAuth(
        {
          url: `${workExperienceAPiList.postWorkExperience}`,
          method: 'POST',
          body: requestBody,
        },
        authClient
      );
      if (res.ok) {
        setworkExperienceId(res.value.workExperienceId);
        setSelectedExperience(workExperienceData[workExperienceData.length - 1]);
        showSuccessNotification({ title: 'Success !', message: 'New experience added to your profile.' });
        getWorkExperience();
        setActive(2);
        scrollToTop();
      } else {
        showErrorNotification(res.error.code);
      }
    }
  };

  const handleAddSkill = () => {
    if (
      !skillForm.validateField('skillName').hasError &&
      !skillForm.validateField('expertise').hasError &&
      workExperienceId !== null
    ) {
      const newSkill: Skill = {
        skillName: skillForm.values.skillName,
        expertise: skillForm.values.expertise,
        workExperience: workExperienceId,
      };
      setSelectedSkills((prevSkills: Skill[]) => [...prevSkills, newSkill]);
      skillForm.values.skillName = '';
      skillForm.values.expertise = '';
    }
  };

  const handleSkillContinue = async () => {
    if (selectedSkills.length < 1) {
      showErrorNotification('NO_SKILL');
    }
    if (selectedSkills.length > 0) {
      showLoadingNotification({ title: 'Please wait !', message: 'We are adding your skill' });

      for (const skill of selectedSkills) {
        const requestBody: SkillRequestBody = {
          skillName: skill.skillName,
          expertise: skill.expertise,
          workExperience: skill.workExperience,
        };
        const res = await HttpClient.callApiAuth(
          {
            url: `${skillsAPIList.postSkill}`,
            method: 'POST',
            body: requestBody,
          },
          authClient
        );
        if (res.ok) {
          showSuccessNotification({ title: 'Success !', message: 'New skills added to your profile.' });

          setActive(3);
        }
      }

      getSkills();
      scrollToTop();
      skillForm.values.skillName = '';
      skillForm.values.expertise = '';
    }
  };

  const handleUploadDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleAddDocument = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('document', selectedFile);
      try {
        const res = await axios.post(`${docDepotAPIList.uploadDocument}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (res.data) {
          const resp: Result<UpdateDocumentResponseType> = await HttpClient.callApiAuth(
            {
              url: `${docDepotAPIList.addDocument}`,
              method: 'POST',
              body: {
                name: selectedFile.name,
                type: 'work',
                private_url: res.data.url,
              },
            },
            authClient
          );
          if (resp.ok) {
            showSuccessNotification({ title: 'Success !', message: 'Document added successfully !' });
            const newDocument: string = selectedFile.name;
            setDocuments((prevDocument) => [...prevDocument, newDocument]);
            setSelectedFile(null);
          } else {
            showErrorNotification(resp.error.code);
          }
        }
      } catch (error: unknown) {
        showErrorNotification('GR0000');
      }
    }
  };

  const handleRemoveDocument = (index: number) => {
    if (index < 0 || index >= documents.length) {
      return;
    }
    setDocuments((prevDocuments) => {
      const newDocuments = [...prevDocuments];
      newDocuments.splice(index, 1);
      return newDocuments;
    });
  };

  const handleDocumentContinue = () => {
    setActive(4);
  };

  const handleModalContinue = () => {
    scrollToTop();
    setCandidateActivePage('All Experiences');
    close();
  };

  const handleGoToVerification = () => {
    handleModalContinue();
    // setSelectedExperience(workExperienceId);
  };

  return (
    <section className="container add-work-experience">
      {active < 4 && (
        <>
          <Box className="see-all-header">
            <Box className="go-back-btn" onClick={handlePrevPage}>
              <BsArrowLeft className="arrow-left-icon" size={'16px'} />
              {active === 1 && <Text>Add Work Experience</Text>}
              {active === 2 && <Text>Add Skills</Text>}
              {active === 3 && <Text>Upload work document</Text>}
            </Box>
          </Box>
          <Box className="progress-bar-wrapper">
            <Box className="progress-bar" bg={'#9fe870'}></Box>
            <Box className="progress-bar" bg={active === 2 || active === 3 ? '#9fe870' : '#F3F3F3'}></Box>
            <Box className="progress-bar" bg={active === 3 ? '#9fe870' : '#F3F3F3'}></Box>
          </Box>
          <Text className="step-identifier">Step {active}/3</Text>
        </>
      )}
      {active === 1 && (
        <Box>
          <Box className="input-section">
            <Title className="title">Job title</Title>
            <TextInput
              label="Job title"
              className="inputClass"
              data-autofocus
              withAsterisk
              {...workExperienceForm.getInputProps('designation')}
            />
          </Box>
          <Divider mb={'10px'} color="#e1e1e1" />
          <Box className="input-section">
            <Title className="title">Company Type</Title>
            <Select
              withAsterisk
              data={companyTypes}
              label="Select company type"
              className="inputClass"
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
              {...workExperienceForm.getInputProps('companyType')}
            />
          </Box>
          <Box className="input-section">
            <Title className="title">Company name</Title>
            <TextInput
              withAsterisk
              {...workExperienceForm.getInputProps('companyName')}
              label="Enter your company name"
              className="inputClass"
            />
          </Box>
          <Box className="input-section">
            <Title className="title">
              <img src={linkedInImg} className="linked-in" alt="linkedIn logo" />
              LinkedIn Url
            </Title>
            <TextInput
              {...workExperienceForm.getInputProps('linkedInUrl')}
              label="Paste the LinkedIn company page link"
              className="inputClass"
            />
          </Box>
          <Box className="input-section">
            <Title className="title">Department</Title>
            <Select
              {...workExperienceForm.getInputProps('department')}
              withAsterisk
              data={departments}
              label="Select department"
              className="inputClass"
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
            <Title className="title">Salary (CTC)</Title>
            <TextInput
              {...workExperienceForm.getInputProps('salary')}
              withAsterisk
              label="Enter your CTC in Rs."
              className="inputClass"
            />
          </Box>

          <Box className="input-section">
            <Title className="title">Work email</Title>
            <TextInput
              label="Previous work email"
              className="inputClass"
              {...workExperienceForm.getInputProps('workEmail')}
            />
          </Box>

          <Box className="input-section">
            <Title className="title">Company ID</Title>
            <TextInput
              label="Enter your unique company id"
              className="inputClass"
              {...workExperienceForm.getInputProps('companyId')}
            />
          </Box>
          <Box className="input-section">
            <Title className="title">Reason for leaving</Title>
            <Textarea
              {...workExperienceForm.getInputProps('reasonForLeaving')}
              label="Write down the reason for leaving"
              className="text-area-input"
            />
          </Box>
          <Divider mb={'10px'} color="#e1e1e1" />

          <Box className="input-section">
            <Title className="title">Start Date</Title>
            <DateInput
              label="Start date"
              className="inputClass"
              withAsterisk
              {...workExperienceForm.getInputProps('startDate')}
            />
          </Box>
          <Divider mb={'10px'} color="#e1e1e1" />
          <Box className="input-section">
            <Title className="title">End Date</Title>
            <DateInput
              label="End date"
              className="inputClass"
              disabled={experienceChecked}
              {...workExperienceForm.getInputProps('endDate')}
            />

            <Checkbox
              checked={experienceChecked}
              onChange={handleCheck}
              className="checkbox"
              color="teal"
              label="I currently work here"
            />
          </Box>
          <Divider mb={'10px'} color="#e1e1e1" />
          <Box className="input-section">
            <Title className="title">Work Type</Title>
            <Box className="inner-input-section">
              <Select
                withAsterisk
                data={workType}
                label="Mode of Work"
                className="inputClass"
                {...workExperienceForm.getInputProps('modeOfWork')}
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
              <Select
                withAsterisk
                data={modeOfWork}
                label="Select work type"
                className="inputClass"
                {...workExperienceForm.getInputProps('workType')}
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
          </Box>
          <Box className="btn-wrapper">
            <Button variant="default" className="cancel-btn" onClick={handlePrevPage}>
              Back
            </Button>
            {workExperienceForm.values.endDate || experienceChecked !== false ? (
              <Button type="submit" className="green-btn" onClick={handleExperienceContinue}>
                Save
              </Button>
            ) : (
              <Button type="submit" disabled className="disabled-btn">
                Save
              </Button>
            )}
          </Box>
        </Box>
      )}
      {active === 2 && (
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
            {selectedSkills.map((skill: Skill, index: number) => {
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
          {selectedSkills.length > 0 && <Divider color="#ebebeb" />}

          <Box className="btn-wrapper">
            <Button type="button" className="cancel-btn" variant="default" onClick={handlePrevPage}>
              Back
            </Button>
            {selectedSkills.length > 0 ? (
              <Button className="green-btn" onClick={handleSkillContinue}>
                Continue
              </Button>
            ) : (
              <Button disabled className="disabled-btn">
                Continue
              </Button>
            )}
          </Box>
        </form>
      )}
      {active === 3 && (
        <Box>
          <Box className="documents-input-box">
            <img src={uploadIcon} alt="upload icon" />
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleUploadDocument} />
            <Text className="add-document-heading">Add your work documents</Text>
            {selectedFile === null && (
              <Button className="add-document-sub-heading" onClick={() => fileInputRef.current?.click()}>
                Select document
              </Button>
            )}
            {selectedFile !== null && (
              <Box className="inpute-file-name-box">
                <Text className="label">File upload</Text>
                <Text className="input-file-name">{selectedFile?.name.substring(0, 15)}...</Text>
                <Box className="icon-box">
                  <VscDebugRestart className="add-document-icon" onClick={() => fileInputRef.current?.click()} />
                  <MdOutlineDelete className="add-document-icon" onClick={() => setSelectedFile(null)} />
                </Box>
              </Box>
            )}
            {selectedFile !== null && (
              <Button className="add-document-sub-heading" onClick={handleAddDocument}>
                Add
              </Button>
            )}

            <Text className="limit">(max 5 MB)</Text>
          </Box>
          {documents.length > 0 && (
            <Box className="added-documents-wrapper">
              {documents.map((document, index) => {
                return (
                  <Box key={index}>
                    <Box className="added-documents">
                      <Text>{document}</Text>
                      <Select
                        data={documentTags}
                        className="inputClass"
                        label={'Select document type'}
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
                      <Box className="add-document-icon">
                        <BsCheckLg color="#17a672" size={'16px'} />
                        <Text color="#17a672">Added</Text>
                      </Box>
                      <Box className="add-document-icon" onClick={() => handleRemoveDocument(index)}>
                        <MdOutlineDelete size={'18px'} color="#697082" />
                        <Text color="#697082">Remove</Text>
                      </Box>
                    </Box>
                    {index < documents.length - 1 && <Divider />}
                  </Box>
                );
              })}
            </Box>
          )}

          <Box className="checkbox-box">
            <Checkbox
              checked={documentsChecked}
              onChange={() => setDocumentsChecked(!documentsChecked)}
              className="checkbox"
              color="teal"
            />
            <Text className="tearms-conditions">
              I understand that during the sign-up process and while using this website, I may be required to provide
              certain personal information, including but not limited to my name, email address, contact details, and
              any other information deemed necessary for registration and website usage.
            </Text>
          </Box>

          <Box className="btn-wrapper">
            <Button type="button" className="cancel-btn" variant="default" onClick={handlePrevPage}>
              Back
            </Button>
            {documentsChecked ? (
              <Button className="green-btn" onClick={handleDocumentContinue}>
                Continue
              </Button>
            ) : (
              <Button className="disabled-btn" disabled>
                Continue
              </Button>
            )}
          </Box>
        </Box>
      )}
      {active === 4 && (
        <Box className="experience-congrats-screen">
          <img src={checkedIcon} alt="Chekced Icon" className="checked-icon" />
          <Title className="main-heading">Your Work Experience is added.</Title>
          <Text className="main-sub-heading">Let's get it verified</Text>
          <Box className="experience-details">
            <Box className="company-logo" style={backgroundStyle}>
              <MdVerified className="verified-icon" color="#17a672" size="22px" />
            </Box>
            <Box className="experience-details-text-box">
              <Text className="designation">{workExperienceData[workExperienceData.length - 1].designation}</Text>
              <Text className="company-name">{workExperienceData[workExperienceData.length - 1].companyName}</Text>
              {workExperienceData[0].isVerified ? (
                <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
                  Verified
                </Button>
              ) : (
                <Button leftIcon={<CgSandClock size={'16px'} />} className="pending">
                  Pending
                </Button>
              )}
            </Box>
          </Box>
          <Box className="docs-box">
            <Title className="heading">With documents</Title>
            <Box className="docs-wrapper">
              {documents.map((document, index) => {
                return (
                  <Box className="folder" key={index}>
                    <img src={pdfIcon} alt="folder-image" />
                    <Text className="folder-text">{document?.substring(0, 10)}...</Text>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box className="docs-box">
            <Title className="heading">Skills</Title>
            <Box className="add-skills-wrapper">
              {selectedSkills.map((skill: Skill, index: number) => {
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
          </Box>
          <Box>
            <Button className="green-btn btn" onClick={handleGoToVerification}>
              Go to verification
            </Button>
            <Button className="cancel-btn btn">Cancel</Button>
          </Box>
        </Box>
      )}
    </section>
  );
};
