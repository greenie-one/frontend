import { useState, useRef } from 'react';
import {
  Text,
  Box,
  Title,
  TextInput,
  Select,
  Checkbox,
  Button,
  Divider,
  Textarea,
  Modal,
  NumberInput,
  Tooltip,
} from '@mantine/core';
import pdfIcon from '../../assets/pdfIcon.png';
import { DateInput } from '@mantine/dates';
import { MdOutlineDelete } from 'react-icons/md';
import { VscDebugRestart } from 'react-icons/vsc';
import { GrAdd } from 'react-icons/gr';
import linkedInImg from '../../../../auth/assets/linkedIn-logo.png';
import { BsArrowLeft, BsCheckLg } from 'react-icons/bs';
import { skillsAPIList } from '../../../../../assets/api/ApiList';
import uploadIcon from '../../assets/upload.png';
import checkedIcon from '../../assets/check.png';
import { workExperienceAPiList } from '../../../../../assets/api/ApiList';
import { CgSandClock } from 'react-icons/cg';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { useNavigate } from 'react-router-dom';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../utils/functions/showNotification';
import { workType, modeOfWork, departments, companyTypes, skillRate } from '../../constants/SelectionOptions';
import axios from 'axios';
import { docDepotAPIList } from '../../../../../assets/api/ApiList';
import { MdRemoveCircle } from 'react-icons/md';
import { skillExpertiseDict } from '../../../constants/dictionaries';
import { Layout } from '../Layout';
import { UndertakingText } from '../UndertakingText';
import dayjs from 'dayjs';
import { IoInformationCircleSharp } from 'react-icons/io5';
import { CandidateFeedback } from '../../../../../utils/functions/CandidateFeedback';
import { feedbackExistCheck } from '../../../../../utils/functions/handleFeedbackProcess';

export const AddExperience = () => {
  const navigate = useNavigate();
  const [experienceChecked, setExperienceChecked] = useState(false);
  const [documentsChecked, setDocumentsChecked] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFilesList, setSelectedFilesList] = useState<Array<File>>([]);
  const [experienceId, setExperienceId] = useState<string>('');
  const [feedbackOverCB, setFeedbackOverCB] = useState<() => void>(() => false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { authClient, setForceRender, deleteWorkExperience, workExperienceForm, skillForm, scrollToTop } =
    useGlobalContext();
  const authToken = authClient.getAccessToken();
  const [feedbackModalOpened, { open: feedbackModalOpen, close: feedbackModalClose }] = useDisclosure();

  const [checked, setChecked] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [active, setActive] = useState<number>(1);

  const handleRemoveSkills = (_id: number) => {
    const newSkillsList = selectedSkills.filter((skill, id) => id !== _id);
    setSelectedSkills(newSkillsList);
  };

  const handleCTC = (event: React.FormEvent<HTMLInputElement>) => {
    const inputElement = event.target as typeof event.target & {
      value: string;
    };
    const currentValue = inputElement.value;
    if (!currentValue) {
      return;
    }
    const lastInput = currentValue.slice(-1);

    const isDigit = lastInput.charCodeAt(0) >= 48 && lastInput.charCodeAt(0) <= 57;
    const isComma = lastInput.charCodeAt(0) === 44;

    if (!(isDigit || isComma)) {
      inputElement.value = currentValue.toString().slice(0, -1);
    }

    workExperienceForm.setFieldValue('salary', inputElement.value);
  };

  const handleCheck = () => {
    workExperienceForm.setFieldValue('dateOfLeaving', '');
    workExperienceForm.setFieldValue('description', '');
    workExperienceForm.clearFieldError('description');

    setExperienceChecked(!experienceChecked);
  };

  const handlePrevPage = () => {
    if (active < 4 && active > 0) scrollToTop();
    if (active === 1) {
      workExperienceForm.reset();
      navigate('/candidate/profile');
    }
    if (active === 2) {
      setActive(1);
    }
    if (active === 3) {
      setActive(2);
    }
  };

  const checkOptionalErrors = () => {
    let hasErrors = false;

    if (Number(workExperienceForm.values.salary) < 0) {
      workExperienceForm.setFieldError('salary', 'Invalid CTC! Please enter a valid value.');
      hasErrors = true;
    }

    if (!experienceChecked) {
      if (workExperienceForm.values.dateOfLeaving === '') {
        workExperienceForm.setFieldError('dateOfLeaving', 'This field is required! Please enter a valid value.');
        hasErrors = true;
      }

      if (workExperienceForm.values.description === '') {
        workExperienceForm.setFieldError('description', 'This field is required! Please enter a valid value.');
        hasErrors = true;
      }
    }

    return hasErrors;
  };

  const handleExperienceContinue = async () => {
    if (workExperienceForm.validate().hasErrors) {
      checkOptionalErrors();
      return;
    }

    if (checkOptionalErrors()) {
      return;
    }

    setActive(2);
    scrollToTop();
  };

  const createNewExperience = async () => {
    showLoadingNotification({ title: 'Please wait !', message: 'We are adding your work experience.' });

    let newExperienceRequestBody: Record<string, string> = {};
    Object.keys(workExperienceForm.values).forEach((key) => {
      if (workExperienceForm.values[key] !== '') {
        if (key === 'salary') {
          newExperienceRequestBody = { ...newExperienceRequestBody, [key]: String(workExperienceForm.values[key]) };
        } else {
          newExperienceRequestBody = { ...newExperienceRequestBody, [key]: workExperienceForm.values[key] };
        }
      }
    });

    const res = await HttpClient.callApiAuth<createExperience>(
      {
        url: `${workExperienceAPiList.postWorkExperience}`,
        method: 'POST',
        body: newExperienceRequestBody,
      },
      authClient
    );

    if (res.ok) {
      return res.value.id;
    } else {
      showErrorNotification(res.error.code);
      setActive(1);
      throw new Error(res.error.code);
    }
  };

  const handleAddSkill = () => {
    if (skillForm.validate().hasErrors) {
      return;
    }

    const currentSkill = skillForm.values;

    for (const skill of selectedSkills) {
      if (JSON.stringify(skill) === JSON.stringify(currentSkill)) {
        return;
      }
    }

    setSelectedSkills((prevSkills: Skill[]) => [...prevSkills, currentSkill]);
    skillForm.reset();
  };

  const handleSkillContinue = () => {
    if (selectedSkills.length < 1) {
      showErrorNotification('NO_SKILL');
      return;
    }

    setActive(3);
    skillForm.setFieldValue('skillName', '');
    skillForm.setFieldValue('expertise', '');
  };

  const addSkillsToExperience = async (experienceId: string) => {
    for (const skill of selectedSkills) {
      const res = await HttpClient.callApiAuth(
        {
          url: `${skillsAPIList.postSkill}`,
          method: 'POST',
          body: {
            ...skill,
            workExperience: experienceId,
          },
        },
        authClient
      );
      if (!res.ok) {
        showErrorNotification(res.error.code);
        setActive(2);
        throw new Error(res.error.code);
      }
    }
  };

  const handleUploadDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInputTarget = event.target as typeof event.target & {
      files: Array<File>;
    };
    showLoadingNotification({ title: 'Please wait !', message: 'Please wait while we add your document' });

    if (fileInputTarget.files && fileInputTarget.files[0]) {
      if (fileInputTarget.files[0].size > 5 * 1024 * 1024) {
        showErrorNotification('SIZE_EXCEEDS');
      } else {
        setSelectedFile(fileInputTarget.files[0]);
        showSuccessNotification({ title: 'File selected ', message: '' });
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddDocument = async () => {
    showLoadingNotification({ title: 'Please Wait !', message: 'Please wait while we add your documents' });
    if (selectedFile) {
      setSelectedFilesList((current) => [...current, selectedFile]);
      showSuccessNotification({ title: 'Success !', message: 'Document added successfully !' });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        setSelectedFile(null);
      }
    }
  };

  const handleRemoveDocument = async (index: number) => {
    setSelectedFilesList((current) => {
      return current.filter((file, fileIndex) => fileIndex !== index);
    });
  };

  const createAddDocumentRequest = async (document: File, responseData: any, experienceId: string) => {
    const documentRequestBody = {
      name: document.name,
      type: 'work',
      privateUrl: responseData.url,
      workExperience: experienceId,
    };

    const res = await HttpClient.callApiAuth<UpdateDocumentResponseType>(
      {
        url: `${docDepotAPIList.addDocument}`,
        method: 'POST',
        body: documentRequestBody,
      },
      authClient
    );
    if (!res.ok) {
      showErrorNotification(res.error.code);
      throw new Error(res.error.code);
    }
  };

  const addDocumentsToExperience = async (experienceId: string) => {
    for (const documents of selectedFilesList) {
      const formData = new FormData();
      formData.append('document', documents);

      try {
        const res = await axios.post(`${docDepotAPIList.uploadDocument}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (res.data) {
          await createAddDocumentRequest(documents, res.data, experienceId);
        }
      } catch (error: unknown) {
        showErrorNotification('GR0000');
        setActive(3);
        throw new Error(String(error));
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
          setSelectedFile(null);
        }
      }
    }
  };

  const handleFinish = async () => {
    let experienceId;
    try {
      experienceId = await createNewExperience();
      if (!experienceId) {
        return;
      }

      setExperienceId(experienceId);

      await addSkillsToExperience(experienceId);
      await addDocumentsToExperience(experienceId);
      showSuccessNotification({ title: 'Success', message: 'Work experience added successfully.' });
      setActive(4);
    } catch (err: unknown) {
      console.error('~ AddExperience.tsx ~ handleFinish(): ', err);

      if (experienceId) {
        deleteWorkExperience(experienceId);
      }
    }
  };

  const handleGoToVerification = () => {
    setForceRender((current) => !current);
    scrollToTop();
    navigate(`/candidate/profile/experience/${experienceId}/verify`);
    workExperienceForm.reset();
    setSelectedSkills([]);
    setSelectedFilesList([]);
  };

  const handleProfilePage = () => {
    setForceRender((current) => !current);

    navigate('/candidate/profile');
    workExperienceForm.reset();
    setSelectedSkills([]);
    setSelectedFilesList([]);
  };

  const handleFeedback = async (onFeedbackOver: () => void) => {
    setFeedbackOverCB(onFeedbackOver);
    const feedbackGiven = await feedbackExistCheck('add_work_exp', authClient);

    if (!feedbackGiven) {
      feedbackModalOpen();
    }
  };

  return (
    <>
      <Modal
        radius={'lg'}
        className="modal"
        size={'60%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        centered
      >
        <Box className="disclaimer-modal">
          <Title className="disclaimer-heading">Undertaking</Title>
          <Text className="disclaimer-subHeading">Verifying Work experience on Greenie</Text>

          <Box className="checkbox-box">
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} className="checkbox" color="teal" />
            <Text className="terms-conditions">
              I have read the undertaking and i authorise Greenie to collect information on my behalf.
            </Text>
          </Box>
          <UndertakingText />
          <Button className="primaryBtn" disabled={!checked} onClick={handleGoToVerification}>
            I Agree
          </Button>
        </Box>
      </Modal>
      <Layout>
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
              <Text className="limit">
                All your information is <strong>secured</strong> and <strong>encrypted</strong> . It is only visible to
                individuals you <strong>authorise</strong>.{' '}
              </Text>
            </>
          )}
          {active === 1 && (
            <Box sx={{ marginTop: '3rem' }}>
              <Box className="input-section">
                <Title className="title">Job title</Title>
                <TextInput
                  label="Job title"
                  className="inputClass"
                  data-autofocus
                  withAsterisk
                  {...workExperienceForm.getInputProps('designation')}
                  maxLength={30}
                />
              </Box>
              <Divider mb={'10px'} color="#e1e1e1" />
              <Box className="input-section">
                <Title className="title">Company name</Title>
                <TextInput
                  withAsterisk
                  {...workExperienceForm.getInputProps('companyName')}
                  label="Enter your company name"
                  className="inputClass"
                  maxLength={30}
                />
              </Box>
              <Box className="input-section">
                <Title className="title">Company Type</Title>
                <Select
                  clearable
                  searchable
                  nothingFound="No options"
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
                <Title className="title">
                  <img src={linkedInImg} className="linked-in" alt="linkedIn logo" />
                  LinkedIn Url
                </Title>
                <TextInput
                  withAsterisk
                  {...workExperienceForm.getInputProps('linkedInUrl')}
                  label="Paste the LinkedIn company page link"
                  className="inputClass"
                  type="url"
                />
              </Box>
              <Box className="input-section">
                <Title className="title">Department</Title>
                <Select
                  clearable
                  searchable
                  nothingFound="No options"
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
                <NumberInput
                  onInput={(e) => handleCTC(e)}
                  withAsterisk
                  hideControls
                  label="Enter your CTC in Rs."
                  parser={(value) => value.replace(/\\s?|(,*)/g, '')}
                  formatter={(value) =>
                    !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : ''
                  }
                  className="inputClass"
                />
              </Box>
              <Box className="input-section">
                <Box sx={{ display: 'flex', gap: '0.1rem', alignItems: 'center' }} className="title">
                  Work email
                  <Tooltip
                    multiline
                    withArrow
                    width={300}
                    transitionProps={{ duration: 200 }}
                    label="Use a business email that has been associated with your professional roles, If you enter a personal email then make sure it was used for business communication"
                  >
                    <span>
                      <IoInformationCircleSharp size={18} color="#17a672" />
                    </span>
                  </Tooltip>
                </Box>
                <TextInput
                  withAsterisk
                  label="Official work email"
                  className="inputClass"
                  {...workExperienceForm.getInputProps('email')}
                  type="email"
                />
              </Box>

              <Box className="input-section">
                <Title className="title">Company ID</Title>
                <TextInput
                  label="Enter your unique company Id"
                  className="inputClass"
                  {...workExperienceForm.getInputProps('companyId')}
                  maxLength={10}
                />
              </Box>

              <Divider mb={'10px'} color="#e1e1e1" />

              <Box className="input-section">
                <Title className="title">Start Date</Title>
                <DateInput
                  maxDate={new Date()}
                  label="Start date"
                  className="inputClass"
                  withAsterisk
                  {...workExperienceForm.getInputProps('dateOfJoining')}
                />
              </Box>
              <Divider mb={'10px'} color="#e1e1e1" />
              <Box className="input-section">
                <Title className="title">End Date</Title>
                <DateInput
                  maxDate={new Date()}
                  minDate={dayjs(workExperienceForm.values.dateOfJoining).add(1, 'day').toDate()}
                  withAsterisk={!experienceChecked}
                  label="End date"
                  className="inputClass"
                  disabled={experienceChecked}
                  {...workExperienceForm.getInputProps('dateOfLeaving')}
                />

                <Checkbox
                  checked={experienceChecked}
                  onChange={handleCheck}
                  className="checkbox"
                  color="teal"
                  label="I currently work here"
                />
              </Box>
              <Box className="input-section">
                <Title className="title">Reason for leaving</Title>
                <Textarea
                  withAsterisk={!experienceChecked}
                  disabled={experienceChecked}
                  {...workExperienceForm.getInputProps('description')}
                  label="Write down the reason for leaving"
                  className="text-area-input"
                  maxLength={300}
                />
              </Box>
              <Divider mb={'10px'} color="#e1e1e1" />
              <Box className="input-section">
                <Title className="title">Work Type</Title>
                <Box className="inner-input-section">
                  <Select
                    clearable
                    searchable
                    nothingFound="No options"
                    withAsterisk
                    data={workType}
                    label="Mode of Work"
                    className="inputClass"
                    {...workExperienceForm.getInputProps('workMode')}
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
                    clearable
                    searchable
                    nothingFound="No options"
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
                <Button type="button" className="green-btn" onClick={handleExperienceContinue}>
                  Save
                </Button>
              </Box>
            </Box>
          )}
          {active === 2 && (
            <Box sx={{ marginTop: '3rem' }}>
              <Box className="input-section">
                <Title className="title">Skill name</Title>
                <TextInput
                  withAsterisk
                  data-autofocus
                  label="Eg. Frontend, Backend"
                  className="inputClass"
                  {...skillForm.getInputProps('skillName')}
                  maxLength={50}
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
                      <button className="remove-skills-btn" type="button" onClick={() => handleRemoveSkills(index)}>
                        <MdRemoveCircle />
                      </button>
                      <Text className="add-skill-name">{skillName.substring(0, 15)}</Text>
                      {expertise && <Text className="add-skill-rate">{skillExpertiseDict[expertise]}</Text>}
                    </Box>
                  );
                })}
              </Box>
              {selectedSkills.length > 0 && <Divider color="#ebebeb" />}

              <Box className="btn-wrapper">
                <Button type="button" className="cancel-btn" variant="default" onClick={() => setActive(3)}>
                  Skip
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
            </Box>
          )}

          {active === 3 && (
            <Box className="experience-add-documents">
              <Box className="documents-input-box">
                <img src={uploadIcon} alt="upload icon" />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept=".pdf"
                  onChange={handleUploadDocument}
                />
                <Text className="add-document-heading">Add your work documents</Text>
                {selectedFile === null && (
                  <Button className="add-document-sub-heading" onClick={() => fileInputRef.current?.click()}>
                    Select document
                  </Button>
                )}
                {selectedFile !== null && (
                  <Box className="inpute-file-name-box">
                    <Text className="label">File upload</Text>
                    <Text className="input-file-name">{selectedFile?.name}</Text>
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

                <Text className="limit">
                  (Only add <strong>.pdf</strong> files of size less than <strong>5 MB</strong>)
                </Text>
              </Box>
              {selectedFilesList.length > 0 && (
                <Box className="added-documents-wrapper">
                  {selectedFilesList.map((file, index) => {
                    return (
                      <Box key={index}>
                        <Box className="added-documents">
                          <Text className="document-name">
                            <span>{index + 1}</span> {file.name}
                          </Text>
                          <Select
                            disabled
                            data={[{ value: 'work', label: 'Work Experience' }]}
                            className="inputClass"
                            label={'Document type'}
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
                            value={'work'}
                          />
                          <Box className="documents-actions">
                            <Box className="added-box">
                              <BsCheckLg />
                              <Text className="added-text">Added</Text>
                            </Box>
                            <Box className="add-document-icon" onClick={() => handleRemoveDocument(index)}>
                              <MdOutlineDelete size={'18px'} color="#697082" />
                              <Text className="remove-text" color="#697082">
                                Remove
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                        {index < selectedFilesList.length - 1 && <Divider />}
                      </Box>
                    );
                  })}
                </Box>
              )}

              {selectedFilesList.length > 0 && (
                <Box className="checkbox-box">
                  <Checkbox
                    checked={documentsChecked}
                    onChange={() => setDocumentsChecked(!documentsChecked)}
                    className="checkbox"
                    color="teal"
                  />
                  <Text className="terms-conditions">
                    I hereby affirm that the documents uploaded pertain directly to my stated work experience and do not
                    violate any policies set forth by Greenie. I understand these documents will be stored securely and
                    encrypted in the "Doc Depot", which I can access, modify, or delete as needed. I acknowledge that
                    the information provided will be used exclusively for its intended purpose
                  </Text>
                </Box>
              )}

              <Box className="btn-wrapper">
                <Button type="button" className="cancel-btn" variant="default" onClick={handleFinish}>
                  Skip
                </Button>
                {documentsChecked ? (
                  <Button className="green-btn" onClick={handleFinish}>
                    Finish
                  </Button>
                ) : (
                  <Button className="disabled-btn" disabled>
                    Finish
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
                <Box className="experience-details-text-box">
                  <Text className="designation">{workExperienceForm.values.designation}</Text>
                  <Text className="company-name">{workExperienceForm.values.designation.companyName}</Text>
                  <Button leftIcon={<CgSandClock size={'16px'} />} className="pending">
                    Pending
                  </Button>
                </Box>
              </Box>
              <Box className="docs-box">
                <Title className="heading">With documents</Title>
                <Box className="docs-wrapper">
                  {selectedFilesList.map((file, index) => {
                    return (
                      <Box className="folder" key={index}>
                        <img src={pdfIcon} alt="folder-image" />
                        <Text className="folder-text">{file.name.substring(0, 10)}...</Text>
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
                        {expertise && <Text className="add-skill-rate">{skillExpertiseDict[expertise]}</Text>}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box className="congrats-btns-wrapper">
                <Button className="green-btn btn" onClick={() => handleFeedback(open)}>
                  Go to Verification
                </Button>
                <Button className="cancel-btn btn" onClick={() => handleFeedback(handleProfilePage)}>
                  Go to Profile
                </Button>
              </Box>
            </Box>
          )}
        </section>
      </Layout>
      <CandidateFeedback
        feedback="add_work_exp"
        opened={feedbackModalOpened}
        close={feedbackModalClose}
        onFeedbackOver={feedbackOverCB}
      />
    </>
  );
};
