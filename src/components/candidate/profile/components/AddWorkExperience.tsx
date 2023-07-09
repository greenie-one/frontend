import { useState, useRef } from 'react';
import { Text, Modal, Box, Title, TextInput, Select, Checkbox, Button, Divider, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { MdOutlineDelete } from 'react-icons/md';
import { VscDebugRestart } from 'react-icons/vsc';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import '../styles/global.scss';
import { useProfileContext } from '../context/ProfileContext';
import { GrAdd } from 'react-icons/gr';
import linkedInImg from '../../../auth/assets/linkedIn-logo.png';
import { BsArrowLeft, BsCheckLg } from 'react-icons/bs';
import { skillsAPIList } from '../../../../assets/api/ApiList';
import uploadIcon from '../assets/upload.png';
import checkedIcon from '../assets/check.png';
import { workExperienceAPiList } from '../../../../assets/api/ApiList';
import { CgSandClock } from 'react-icons/cg';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { HttpClient, Result } from '../../../../utils/generic/httpClient';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';

type Document = {
  document: File | undefined;
  documentTag: string | null;
};

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
  { value: 'Startup', label: 'Start-up (Funded)' },
  { value: 'Early Stage Startup', label: 'Early Stage Startup' },
  { value: 'Startup (Profitable)', label: 'Startup (Profitable)' },
  {
    value: 'Startup (Unicorn, Not Profitable)',
    label: 'Startup (Unicorn, Not Profitable)',
  },
  { value: 'Family Owned Business', label: 'Family Owned Business' },
  { value: 'Private Limited (India)', label: 'Private Limited (India)' },
  { value: 'Partnership (LLP/LLC)', label: 'Partnership (LLP/LLC)' },
  { value: 'Public Limited Company', label: 'Public Limited Company' },
];

const skillRate = [
  { value: 'BEGINEER', label: 'Begineer/Novice' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'HIGHLY COMPETANT', label: 'Highly Competant' },
  { value: 'ADVANCED', label: 'Advanced Proficiency' },
  { value: 'EXPERT', label: 'Expert' },
  { value: 'MASTER', label: 'Master - Pro(Global Recognition)' },
];

const documentTags = [
  { value: 'Appointsment Letter', label: 'Appointsment Letter' },
  { value: 'Payment Slip', label: 'Payment Slip' },
  { value: 'Cerificate', label: 'Cerificate' },
  { value: 'Other', label: 'Other' },
];

const departments = [
  { value: 'HR', label: 'Human Resources' },
  { value: 'Finance', label: 'Finance and Accounting' },
  { value: 'Sales', label: 'Sales and Marketing' },
  { value: 'Operations', label: 'Operations' },
  { value: 'IT', label: 'Information Technology' },
  { value: 'CustomerService', label: 'Customer Service' },
  { value: 'R&D', label: 'Research and Development' },
  { value: 'Production', label: 'Production or Manufacturing' },
  { value: 'SupplyChain', label: 'Supply Chain or Logistics' },
  { value: 'Administration', label: 'Administration' },
  { value: 'Legal', label: 'Legal and Compliance' },
  { value: 'QA', label: 'Quality Assurance' },
  { value: 'ProjectManagement', label: 'Project Management' },
  { value: 'Procurement', label: 'Procurement or Purchasing' },
  { value: 'PR', label: 'Public Relations' },
  { value: 'Training', label: 'Training and Development' },
  { value: 'Facilities', label: 'Facilities Management' },
  { value: 'RiskManagement', label: 'Risk Management' },
  { value: 'BusinessDevelopment', label: 'Business Development' },
  { value: 'StrategicPlanning', label: 'Strategic Planning' },
  { value: 'CorporateCommunications', label: 'Corporate Communications' },
  { value: 'InternalAudit', label: 'Internal Audit' },
  { value: 'HealthSafety', label: 'Health and Safety' },
  {
    value: 'Sustainability',
    label: 'Sustainability or Corporate Social Responsibility',
  },
  { value: 'DataAnalytics', label: 'Data Analytics or Business Intelligence' },
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
  const { authClient } = useGlobalContext();

  const {
    workExperienceForm,
    getWorkExperience,
    dispatchDetailsPage,
    detailsPage,
    skillForm,
    getSkills,
    scrollToTop,
    scrollToProfileNav,
    setSelectedCard,
    selectedSkills,
    setSelectedSkills,
  } = useProfileContext();
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
      showLoadingNotification({
        title: 'Please wait !',
        message: 'We are adding your work experience.',
      });
      workExperienceForm.clearErrors();
      const res: Result<any> = await HttpClient.callApiAuth(
        {
          url: `${workExperienceAPiList.postWorkExperience}`,
          method: 'POST',
          body: {
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
        },
        authClient
      );
      if (res.ok) {
        setWorkExperienceData(res.value);
        showSuccessNotification({
          title: 'Success !',
          message: 'New experience added to your profile.',
        });
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
      workExperienceData !== null
    ) {
      const newSkill: ISkill = {
        skillName: skillForm.values.skillName,
        expertise: skillForm.values.expertise,
        workExperience: workExperienceData?._id,
      };
      setSelectedSkills((prevSkills) => [...prevSkills, newSkill]);
      skillForm.values.skillName = '';
      skillForm.values.expertise = '';
    }
  };

  const handleSkillContinue = async () => {
    if (selectedSkills.length < 1) {
      showErrorNotification('NO_SKILL');
    }
    if (selectedSkills.length > 0) {
      showLoadingNotification({
        title: 'Please wait !',
        message: 'We are adding your skill',
      });
      for (const skill of selectedSkills) {
        const res = await HttpClient.callApiAuth(
          {
            url: `${skillsAPIList.postSkill}`,
            method: 'POST',
            body: { skillName: skill.skillName, expertise: skill.expertise },
          },
          authClient
        );
        if (res.ok) {
          showSuccessNotification({
            title: 'Success !',
            message: 'New skills added to your profile.',
          });

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
      updatedDocuments[index] = {
        ...updatedDocuments[index],
        documentTag: value,
      };
      return updatedDocuments;
    });
  };

  const handleDocumentContinue = () => {
    if (documents.length > 0 && documentsChecked) {
      for (const document of documents) {
        if (document.documentTag === '') {
          showLoadingNotification({
            title: 'Please wait !',
            message: 'Adding your documents',
          });
          showErrorNotification('MISSING_TAGS');
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
            <TextInput withAsterisk label="Enter your CTC in Rs." className="inputClass" />
          </Box>

          <Box className="input-section">
            <Title className="title">Work email</Title>
            <TextInput
              withAsterisk
              label="Previous work email"
              className="inputClass"
              {...workExperienceForm.getInputProps('workEmail')}
            />
          </Box>

          <Box className="input-section">
            <Title className="title">Company ID</Title>
            <TextInput
              withAsterisk
              label="Enter your unique company id"
              className="inputClass"
              {...workExperienceForm.getInputProps('companyId')}
            />
          </Box>
          <Box className="input-section">
            <Title className="title">Reason for leaving</Title>
            <Textarea label="Write down the reason for leaving" className="text-area-input" />
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
                        data={documentTags}
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
            <Button
              className={documentsChecked ? 'green-btn' : 'disabled-btn'}
              onClick={handleDocumentContinue}
              disabled={!documentsChecked}
            >
              Continue
            </Button>
          </Box>
        </Box>
      )}
    </section>
  );
};
