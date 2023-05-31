import { useState } from 'react';
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
} from '@mantine/core';
import noData from '../assets/noData.png';
import { Link } from 'react-router-dom';
import { MdOutlineEdit } from 'react-icons/md';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import '../styles/global.scss';
import { WorkExperienceCard } from '../components/WorkExperienceCard';
import { useProfileContext } from '../context/ProfileContext';

const companyName = [
  { value: 'reliance_industries', label: 'Reliance Industries' },
  { value: 'tata_consultancy_services', label: 'Tata Consultancy Services' },
  { value: 'hindustan_unilever', label: 'Hindustan Unilever' },
  { value: 'infosys', label: 'Infosys' },
  { value: 'icici_bank', label: 'ICICI Bank' },
  { value: 'hdfc_bank', label: 'HDFC Bank' },
  { value: 'coal_india', label: 'Coal India' },
  { value: 'bharti_airtel', label: 'Bharti Airtel' },
  { value: 'wipro', label: 'Wipro' },
  { value: 'mahindra_and_mahindra', label: 'Mahindra & Mahindra' },
];
const months = [
  { value: 'january', label: 'January' },
  { value: 'february', label: 'February' },
  { value: 'march', label: 'March' },
  { value: 'april', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'June' },
  { value: 'july', label: 'July' },
  { value: 'august', label: 'August' },
  { value: 'september', label: 'September' },
  { value: 'october', label: 'October' },
  { value: 'november', label: 'November' },
  { value: 'december', label: 'December' },
];

const years = [
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' },
  { value: '2015', label: '2015' },
  { value: '2014', label: '2014' },
  { value: '2013', label: '2013' },
];
const workType = [
  { value: 'work from office', label: 'Work From Office' },
  { value: 'work from home', label: 'Work From Home' },
  { value: 'Hybrid', label: 'Hybrid' },
];
const modeOfWork = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'internship', label: 'Intership' },
  { value: 'contract', label: 'Contract' },
];

export const Experience = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const { workExperienceData, workExperienceForm, addWorkExperience } = useProfileContext();
  const { classes: inputClasses } = inputStyles();
  const [checked, setChecked] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addWorkExperience();
  };

  return (
    <section className="experience-section container">
      <Modal
        className="modal"
        size={'65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
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
              {...workExperienceForm.getInputProps('jobTitle')}
            />
          </Box>
          <Box className="input-section">
            <Title className="title">Company name</Title>
            <Select
              withAsterisk
              data={companyName}
              {...workExperienceForm.getInputProps('companyName')}
              label="Search by company website"
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
            <Box className="inner-input-section">
              <Select
                withAsterisk
                data={months}
                label="From month"
                classNames={inputClasses}
                {...workExperienceForm.getInputProps('startDate.startMonth')}
              />
              <Select
                withAsterisk
                data={years}
                label="From year"
                classNames={inputClasses}
                {...workExperienceForm.getInputProps('startDate.startYear')}
              />
            </Box>
          </Box>
          <Box className="input-section border-bottom">
            <Title className="title">End Date</Title>
            <Box className="inner-input-box">
              <Box className="inner-input-section">
                <Select
                  withAsterisk
                  data={months}
                  label="From month"
                  classNames={inputClasses}
                  {...workExperienceForm.getInputProps('endDate.endMonth')}
                />
                <Select
                  withAsterisk
                  disabled={checked}
                  data={years}
                  label="From year"
                  classNames={inputClasses}
                  {...workExperienceForm.getInputProps('endDate.endYear')}
                />
              </Box>
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                className="checkbox"
                color="teal"
                label="I currently work here"
              />
            </Box>
          </Box>
          <Box className="input-section border-bottom">
            <Title className="title">Work Type</Title>
            <Box className="inner-input-section">
              <Select
                withAsterisk
                data={workType}
                label="Mode of Work"
                classNames={inputClasses}
                {...workExperienceForm.getInputProps('workType.modeOfWork')}
              />
              <Select
                withAsterisk
                data={modeOfWork}
                label="Select work type"
                classNames={inputClasses}
                {...workExperienceForm.getInputProps('workType.workType')}
              />
            </Box>
          </Box>
          <Box className="btn-wrapper">
            <Button color="teal" type="submit">
              Save
            </Button>
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
          </Box>
        </form>
      </Modal>
      <Box className="header">
        <Box>
          <Text className="heading">{`Work Experience (${workExperienceData.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>
        <Box className="header-links">
          {workExperienceData.length > 0 && (
            <Link className="link" to={'/'}>
              See all documents
            </Link>
          )}

          <Button leftIcon={<MdOutlineEdit />} onClick={open} className="edit-btn">
            Edit Section
          </Button>
        </Box>
      </Box>

      {workExperienceData.length === 0 ? (
        <Box className="no-data-wrapper">
          {' '}
          <img className="no-data" src={noData} alt="No data" />
        </Box>
      ) : (
        <Carousel
          withIndicators={false}
          slideSize="33.30%"
          slideGap={24}
          slidesToScroll={1}
          align="start"
          styles={{ control: { display: 'none' } }}
          breakpoints={[
            { maxWidth: 'xs', slideSize: '80%' },
            { maxWidth: 'md', slideSize: '50%' },
          ]}
        >
          {workExperienceData.map(
            (
              {
                designation,
                companyName,
                companyStartDate,
                companyEndDate,
                isVerified,
                verifiedBy,
                description,
              },
              index
            ) => {
              return (
                <Carousel.Slide key={index}>
                  <WorkExperienceCard
                    position={designation}
                    companyName={companyName}
                    isVerified={isVerified}
                    companyStartYear={companyStartDate}
                    companyEndYear={companyEndDate}
                    verifierName={verifiedBy}
                    verifierTestimonial={description}
                  />
                </Carousel.Slide>
              );
            }
          )}
        </Carousel>
      )}
      {workExperienceData.length > 0 && <Button className="see-all-btn">See All</Button>}
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
