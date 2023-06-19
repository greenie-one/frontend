import '../styles/global.scss';
import { useProfileContext } from '../context/ProfileContext';
import {
  Text,
  Modal,
  Box,
  Button,
  Title,
  Divider,
  Select,
  TextInput,
  createStyles,
  em,
  rem,
  Checkbox,
} from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified, MdOutlineCalendarMonth, MdOutlineEdit, MdOutlineDelete } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { MonthPickerInput } from '@mantine/dates';
import linkedInImg from '../../Auth/assets/linkedIn-logo.png';
import { useState } from 'react';

const companies = [
  { value: 'Reliance Industries', label: 'Reliance Industries' },
  { value: 'Tata Consultancy Services', label: 'Tata Consultancy Services' },
  { value: 'Hindustan Unilever', label: 'Hindustan Unilever' },
  { value: 'Infosys', label: 'Infosys' },
  { value: 'ICICI Bank', label: 'ICICI Bank' },
  { value: 'HDFC Bank', label: 'HDFC Bank' },
  { value: 'Coal India', label: 'Coal India' },
  { value: 'Bharti Airtel', label: 'Bharti Airtel' },
  { value: 'Wipro', label: 'Wipro' },
  { value: 'Mahindra & Mahindra', label: 'Mahindra & Mahindra' },
];

const typeOfWork = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Internship', label: 'Intership' },
  { value: 'Contract', label: 'Contract' },
];
const modeOfWork = [
  { value: 'Work from office', label: 'Work From Office' },
  { value: 'Work from home', label: 'Work From Home' },
  { value: 'Hybrid', label: 'Hybrid' },
];

const companyTypes = [
  { value: 'Startup', label: 'Start-up' },
  { value: 'Registered', label: 'Registered' },
  { value: 'Unregistered', label: 'Unregistered' },
];

export const SeeAllExperiences = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { classes: inputClasses } = inputStyles();
  const [checked, setChecked] = useState(false);
  const [updateId, setUpdateId] = useState<string>('');
  const {
    dispatchDetailsPage,
    detailsPage,
    workExperienceData,
    deleteWorkExperience,
    updateWorkExperience,
    workExperienceForm,
  } = useProfileContext();

  const handleToggleWorkExperienceDetails = (): void => {
    dispatchDetailsPage({
      type: 'SET_SEE_ALL_WORKEXPERIENCE',
      payload: !detailsPage.seeAllWorkExperience,
    });
  };

  const onClose = () => {
    close();
    workExperienceForm.setFieldValue('designation', '');
    workExperienceForm.setFieldValue('companyType', '');
    workExperienceForm.setFieldValue('companyName', '');
    workExperienceForm.setFieldValue('linkedInUrl', '');
    workExperienceForm.setFieldValue('workEmail', '');
    workExperienceForm.setFieldValue('companyId', '');
    workExperienceForm.setFieldValue('startDate', null);
    workExperienceForm.setFieldValue('endDate', null);
    workExperienceForm.setFieldValue('workType', '');
    workExperienceForm.setFieldValue('modeOfWork', '');
  };

  const openModal = (id: string) => {
    setUpdateId(id);
    open();
  };

  const handleCheck = () => {
    workExperienceForm.values.endDate = null;
    setChecked(!checked);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateWorkExperience(updateId);
    onClose();
  };

  return (
    <section className="container">
      <Modal
        className="modal"
        size={'65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={onClose}
        title="Add work experience"
      >
        <form onSubmit={handleSubmit}>
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
              {...workExperienceForm.getInputProps('companyType')}
            />
          </Box>
          <Box className="input-section">
            <Title className="title">Company name</Title>
            <Select
              withAsterisk
              data={companies}
              label="Search by company website"
              classNames={inputClasses}
              {...workExperienceForm.getInputProps('companyName')}
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
              withAsterisk
              classNames={inputClasses}
              {...workExperienceForm.getInputProps('endDate')}
            />

            <Checkbox
              checked={checked}
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
                data={modeOfWork}
                label="Mode of Work"
                classNames={inputClasses}
                {...workExperienceForm.getInputProps('modeOfWork')}
              />
              <Select
                withAsterisk
                data={typeOfWork}
                label="Select work type"
                classNames={inputClasses}
                {...workExperienceForm.getInputProps('workType')}
              />
            </Box>
          </Box>
          <Box className="btn-wrapper">
            <Button color="teal" type="submit">
              Save
            </Button>
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Modal>
      <Box className="see-all-header">
        <Box className="go-back-btn" onClick={handleToggleWorkExperienceDetails}>
          <BsArrowLeft className="arrow-left-icon" size={'16px'} />
          <Text>Profile</Text>
          <AiOutlineRight className="arrow-right-icon" size={'16px'} />
        </Box>
        <Text>{`Work Experience (${workExperienceData.length})`}</Text>
      </Box>
      <Box>
        {workExperienceData.map(
          (
            {
              _id,
              designation,
              companyType,
              companyName,
              companyStartDate,
              companyEndDate,
              isVerified,
              companyId,
              workMode,
              workType,
              email,
              verifiedBy,
            },
            index
          ) => {
            return (
              <>
                <Box key={index} className="see-all-card experience-see-all-card">
                  <Box className="see-all-card-header">
                    <Box className="header-content">
                      <Box className="company-logo"></Box>
                      <Box className="see-all-card-header-text-box">
                        <Text className="designation">{designation}</Text>
                        <Text className="companyName">{companyName}</Text>
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
                    </Box>
                    <Box className="button-wrappers">
                      {!isVerified && <Button className="get-verified">Get Verified</Button>}

                      <Box className="icon" onClick={() => deleteWorkExperience(_id)}>
                        <MdOutlineDelete size={'22px'} className="btn" />
                      </Box>
                      <Box className="icon" onClick={() => openModal(_id)}>
                        <MdOutlineEdit size={'22px'} className="btn" />
                      </Box>
                    </Box>
                  </Box>
                  <Divider my="sm" color="#e1e1e1" />
                  <Box className="see-all-info-wrapper">
                    <Box>
                      <Text className="see-all-heading">Company ID</Text>
                      <Text className="detail">{companyId}</Text>
                    </Box>
                    <Box>
                      <Text className="see-all-heading">Company type</Text>
                      <Text className="detail">{companyType}</Text>
                    </Box>
                    <Box>
                      <Text className="see-all-heading">Work Type</Text>
                      <Text className="detail">{workType}</Text>
                    </Box>
                    <Box>
                      <Text className="see-all-heading">Mode of Work</Text>
                      <Text className="detail">{workMode}</Text>
                    </Box>
                    <Box>
                      <Text className="see-all-heading">Employment since</Text>
                      <Text className="detail">
                        {companyStartDate?.toString().substring(0, 4)}-
                        {companyEndDate?.toString().substring(0, 4)}
                      </Text>
                    </Box>
                    <Box>
                      <Text className="see-all-heading">Work Email</Text>
                      <Text className="detail">{email}</Text>
                    </Box>
                  </Box>

                  {isVerified && (
                    <Box>
                      <Divider my="sm" color="#e1e1e1" />
                      <Box className="see-all-peer-verification">
                        <Title className="see-all-heading">Peer Verification</Title>
                        <Title className="see-all-heading">Verified By</Title>
                        <Box className="verified-by-box">
                          {verifiedBy?.map(
                            ({ verifierName, verifierDesignation, description }, index) => {
                              return (
                                <Box className="verifier-card" key={index}>
                                  <Box className="verifiedByImg"></Box>
                                  <Text className="verifier-name">{verifierName}</Text>
                                  <Text className="verifier-designation">
                                    {verifierDesignation}
                                  </Text>
                                  <Text className="view-details">View details</Text>
                                </Box>
                              );
                            }
                          )}
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              </>
            );
          }
        )}
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
