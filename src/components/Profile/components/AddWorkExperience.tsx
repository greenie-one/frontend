import { useState, useRef } from 'react';
import {
  Text,
  Modal,
  Box,
  Title,
  TextInput,
  createStyles,
  em,
  rem,
  Select,
  Checkbox,
  Button,
  Divider,
} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { MdOutlineCalendarMonth, MdOutlineDelete } from 'react-icons/md';
import { VscDebugRestart } from 'react-icons/vsc';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import '../styles/global.scss';
import { useProfileContext } from '../context/ProfileContext';
import { GrAdd } from 'react-icons/gr';
import linkedInImg from '../../Auth/assets/linkedIn-logo.png';
import { BsArrowLeft, BsCheckLg } from 'react-icons/bs';
import { FaExclamation } from 'react-icons/fa';
import { skillsAPIList } from '../../../assets/api/ApiList';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import uploadIcon from '../assets/upload.png';
import checkedIcon from '../assets/check.png';
import { workExperienceAPiList } from '../../../assets/api/ApiList';
import { CgSandClock } from 'react-icons/cg';

type Skill = {
  skillName: string;
  expertise: string;
};
type Document = {
  document: File | undefined;
  documentTag: string | null;
};

interface IWorkExperience {
  _id: string;
  image: string | null;
  designation: string;
  companyName: string;
  email: string;
  companyId: string;
  companyStartDate: string;
  companyEndDate: string;
  workMode: string;
  workType: string;
  isVerified: boolean;
  verifiedBy: [] | null;
  companyType: string;
}

const workType = [
  { value: 'Work from office', label: 'Work From Office' },
  { value: 'Work from home', label: 'Work From Home' },
  { value: 'Hybrid', label: 'Hybrid' },
];
const modeOfWork = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Internship', label: 'Intership' },
  { value: 'Contract', label: 'Contract' },
];

const companyTypes = [
  { value: 'Startup', label: 'Start-up' },
  { value: 'Registered', label: 'Registered' },
  { value: 'Unregistered', label: 'Unregistered' },
];

const skillRate = [
  { value: 'AMATEUR', label: 'Begineer/Novice' },
  { value: 'EXPERT', label: 'Intermediate' },
];
// const skillRate = [
//   { value: 'BEGINEER', label: 'Begineer/Novice' },
//   { value: 'INTERMEDIATE', label: 'Intermediate' },
//   { value: 'HIGHLY COMPETANT', label: 'Highly Competant' },
//   { value: 'ADVANCED', label: 'Advanced Proficiency' },
//   { value: 'EXPERT', label: 'Expert' },
//   { value: 'MASTER', label: 'Master - Pro(Global Recognition)' },
// ];

const documentType = [
  { value: 'Appointsment Letter', label: 'Appointsment Letter' },
  { value: 'Payment Slip', label: 'Payment Slip' },
  { value: 'Cerificate', label: 'Cerificate' },
];

export const AddWorkExperience = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [experienceChecked, setExperienceChecked] = useState(false);
  const [documentsChecked, setDocumentsChecked] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [documents, setDocuments] = useState<Document[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [workExperienceData, setWorkExperienceData] = useState<IWorkExperience | null>(null);

  const {
    workExperienceForm,
    getWorkExperience,
    dispatchDetailsPage,
    detailsPage,
    skillForm,
    authTokens,
    getSkills,
    scrollToProfileNav,
    setSelectedCard,
    selectedSkills,
    setSelectedSkills,
  } = useProfileContext();
  const { classes: inputClasses } = inputStyles();
  const [active, setActive] = useState<number>(1);

  const handleCheck = () => {
    workExperienceForm.values.endDate = null;
    setExperienceChecked(!experienceChecked);
  };

  const handlePrevPage = () => {
    if (active < 4 && active > 0)
      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    if (active === 1) {
      dispatchDetailsPage({
        type: 'SET_SEE_ADD_WORK_EXPERIENCE',
        payload: !detailsPage.seeAddWorkExperience,
      });
      workExperienceForm.values.designation = '';
      workExperienceForm.values.companyId = '';
      workExperienceForm.values.companyName = '';
      workExperienceForm.values.companyType = '';
      workExperienceForm.values.linkedInUrl = '';
      workExperienceForm.values.workEmail = '';
      workExperienceForm.values.workType = '';
      workExperienceForm.values.modeOfwork = '';
      workExperienceForm.values.startDate = null;
      workExperienceForm.values.endDate = null;
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
      !workExperienceForm.validateField('companyId').hasError &&
      !workExperienceForm.validateField('startDate').hasError &&
      !workExperienceForm.validateField('workType').hasError &&
      !workExperienceForm.validateField('modeOfwork').hasError
    ) {
      try {
        notifications.show({
          id: 'load-data',
          title: 'Please wait !',
          message: 'We are adding your work experience.',
          loading: true,
          autoClose: 2200,
          withCloseButton: false,
          color: 'teal',
          sx: { borderRadius: em(8) },
        });
        workExperienceForm.clearErrors();
        const res = await axios.post(
          workExperienceAPiList.postWorkExperience,
          {
            designation: workExperienceForm.values.designation,
            companyType: workExperienceForm.values.companyType,
            email: workExperienceForm.values.workEmail,
            workMode: workExperienceForm.values.modeOfWork,
            workType: workExperienceForm.values.workType,
            companyName: workExperienceForm.values.companyName,
            companyId: workExperienceForm.values.companyId,
            companyStartDate: workExperienceForm.values.startDate,
            companyEndDate: workExperienceForm.values.endDate,
            isVerified: false,
          },
          {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          }
        );
        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        setWorkExperienceData(res.data);
        notifications.update({
          id: 'load-data',
          color: 'teal',
          title: 'Success !',
          message: 'New experience added to your profile.',
          icon: <BsCheckLg />,
          autoClose: 2000,
        });
        getWorkExperience();
        setActive(2);
      } catch (err: any) {
        if (err.response?.data?.code === 'GR0036') {
          notifications.update({
            id: 'load-data',
            title: 'Invalid date range',
            message: 'End date must be after start date.',
            autoClose: 2200,
            withCloseButton: false,
            color: 'red',
            icon: <FaExclamation />,
            sx: { borderRadius: em(8) },
          });
        }
        console.log(err.message);
      }
    }
  };

  const handleAddSkill = () => {
    if (!skillForm.validateField('skillName').hasError && !skillForm.validateField('expertise').hasError) {
      const newSkill: Skill = {
        skillName: skillForm.values.skillName,
        expertise: skillForm.values.expertise,
      };
      setSelectedSkills((prevSkills) => [...prevSkills, newSkill]);
      skillForm.values.skillName = '';
      skillForm.values.expertise = '';
    }
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
      if (selectedSkills.length < 1) {
        notifications.update({
          id: 'load-data',
          title: 'Error !',
          color: 'red',
          message: 'Please add atleast one skill.',
          icon: <FaExclamation />,
          autoClose: 2200,
        });
      }
      if (selectedSkills.length > 0) {
        for (const skill of selectedSkills) {
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
        setActive(3);
        skillForm.values.skillName = '';
        skillForm.values.expertise = '';
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleUploadDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const handleAddDocument = () => {
    const newDocument: Document = {
      document: selectedFile,
      documentTag: '',
    };
    setDocuments((prevDocument) => [...prevDocument, newDocument]);
    setSelectedFile(undefined);
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

  const handleSelectTag = (index: number, value: string | null) => {
    setDocuments((prevDocuments) => {
      const updatedDocuments = [...prevDocuments];
      updatedDocuments[index] = { ...updatedDocuments[index], documentTag: value };
      return updatedDocuments;
    });
  };

  const handleDocumentContinue = () => {
    if (documents.length > 0 && documentsChecked) {
      for (const document of documents) {
        if (document.documentTag === '') {
          notifications.show({
            id: 'load-data',
            title: 'Missing document tags !',
            message: 'Please select document tags for all the documents.',
            autoClose: 2200,
            withCloseButton: false,
            color: 'teal',
            sx: { borderRadius: em(8) },
          });
          return;
        }
        open();
      }
    }
  };

  const handleModalContinue = () => {
    scrollToProfileNav();
    dispatchDetailsPage({
      type: 'SET_SEE_ADD_WORK_EXPERIENCE',
      payload: !detailsPage.seeAddWorkExperience,
    });
    dispatchDetailsPage({
      type: 'SET_SEE_ALL_WORKEXPERIENCE',
      payload: !detailsPage.seeAllWorkExperience,
    });
    close();
  };

  const handleGoToVerification = () => {
    handleModalContinue();
    setSelectedCard(workExperienceData);
  };

  return (
    <section className="container add-work-experience">
      <Modal
        className="modal"
        size={isTablet ? '70%' : '50%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        centered
      >
        <Box className="experience-modal">
          <img src={checkedIcon} alt="Verified-Icon" />
          <Title className="title">Your Work Experience is added</Title>
          <Text className="sub-title">Let's get it verified</Text>
          <Box className="info-box">
            <Box className="designation-company-name">
              <Text className="designation">{workExperienceData?.designation}</Text>
              <Text className="company-name">{workExperienceData?.companyName}</Text>
            </Box>
            <Box className="buttons-wrapper">
              <Button leftIcon={<CgSandClock color="#FF7272" size={'16px'} />} className="pending">
                Pending
              </Button>
              <Button className="go-to-verfication" onClick={handleGoToVerification}>
                Go to verification
              </Button>
            </Box>
          </Box>
          <Button className="primaryBtn" onClick={handleModalContinue}>
            Continue
          </Button>
          <Box className="fact-box">
            <Text className="fact-heading">Did you know!</Text>
            <Text className="fact">Getting Work Experience verified increases your profile rating on Greenie</Text>
          </Box>
        </Box>
      </Modal>
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
      {active === 1 && (
        <Box>
          <Box className="input-section border-bottom">
            <Title className="title">Job title</Title>
            <TextInput
              label="Job title"
              classNames={inputClasses}
              data-autofocus
              withAsterisk
              {...workExperienceForm.getInputProps('designation')}
            />
          </Box>
          <Box className="input-section">
            <Title className="title">Company Type</Title>
            <Select
              withAsterisk
              data={companyTypes}
              label="Select company type"
              classNames={inputClasses}
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
              classNames={inputClasses}
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
              classNames={inputClasses}
            />
          </Box>
          <Box className="input-section">
            <Title className="title">Work email</Title>
            <TextInput
              withAsterisk
              label="Official Email"
              classNames={inputClasses}
              {...workExperienceForm.getInputProps('workEmail')}
            />
          </Box>
          <Box className="input-section border-bottom">
            <Title className="title">Company ID</Title>
            <TextInput
              withAsterisk
              label="Enter your unique company id"
              classNames={inputClasses}
              {...workExperienceForm.getInputProps('companyId')}
            />
          </Box>
          <Box className="input-section border-bottom">
            <Title className="title">Start Date</Title>
            <MonthPickerInput
              icon={<MdOutlineCalendarMonth />}
              label="Start date"
              withAsterisk
              classNames={inputClasses}
              {...workExperienceForm.getInputProps('startDate')}
            />
          </Box>
          <Box className="input-section border-bottom">
            <Title className="title">End Date</Title>
            <MonthPickerInput
              icon={<MdOutlineCalendarMonth />}
              label="End date"
              classNames={inputClasses}
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
          <Box className="input-section border-bottom">
            <Title className="title">Work Type</Title>
            <Box className="inner-input-section">
              <Select
                withAsterisk
                data={workType}
                label="Mode of Work"
                classNames={inputClasses}
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
                classNames={inputClasses}
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
            <Button type="submit" className="green-btn" onClick={handleExperienceContinue}>
              Save
            </Button>
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
            {selectedSkills.map((skill, index) => {
              const { expertise, skillName } = skill;
              return (
                <Box key={index} className="add-skill-box">
                  <Text className="add-skill-name">{skillName}</Text>
                  <Text className="add-skill-rate">{expertise}</Text>
                </Box>
              );
            })}
          </Box>
          {selectedSkills.length > 0 && <Divider color="#ebebeb" />}

          <Box className="btn-wrapper">
            <Button type="button" className="cancel-btn" variant="default" onClick={handlePrevPage}>
              Back
            </Button>
            <Button className="green-btn" onClick={handleSkillContinue}>
              Continue
            </Button>
          </Box>
        </form>
      )}
      {active === 3 && (
        <Box>
          <Box className="documents-input-box">
            <img src={uploadIcon} alt="upload icon" />
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleUploadDocument} />
            <Text className="add-document-heading">Add your work documents</Text>
            {typeof selectedFile === 'undefined' && (
              <Button className="add-document-sub-heading" onClick={() => fileInputRef.current?.click()}>
                Select document
              </Button>
            )}
            {typeof selectedFile !== 'undefined' && (
              <Box className="inpute-file-name-box">
                <Text className="label">File upload</Text>
                <Text className="input-file-name">{selectedFile.name}</Text>
                <Box className="icon-box">
                  <VscDebugRestart className="add-document-icon" onClick={() => fileInputRef.current?.click()} />
                  <MdOutlineDelete className="add-document-icon" onClick={() => setSelectedFile(undefined)} />
                </Box>
              </Box>
            )}
            {typeof selectedFile !== 'undefined' && (
              <Button className="add-document-sub-heading" onClick={handleAddDocument}>
                Add
              </Button>
            )}

            <Text className="limit">(max 5 MB)</Text>
          </Box>
          {documents.length > 0 && (
            <Box className="added-documents-wrapper">
              {documents.map(({ document, documentTag }, index) => {
                return (
                  <Box key={index}>
                    <Box className="added-documents">
                      <Text>{document?.name}</Text>
                      <Select
                        value={documentTag}
                        onChange={(value) => handleSelectTag(index, value)}
                        data={documentType}
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
            <Button className="green-btn" onClick={handleDocumentContinue} disabled={!documentsChecked}>
              Continue
            </Button>
          </Box>
        </Box>
      )}
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

  selectInput: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '19px',
    letterSpacing: '-0.02em',
    color: '#697082',
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
