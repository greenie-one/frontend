import { Box, Title, TextInput, createStyles, em, rem, Select, Checkbox } from '@mantine/core';
import { useState } from 'react';
import { useProfileContext } from '../context/ProfileContext';

import '../styles/global.scss';
export const WorkExperienceModal = () => {
  const { classes: inputClasses } = inputStyles();
  const [checked, setChecked] = useState(false);
  const { workExperienceForm } = useProfileContext();
  return (
    <form>
      <Box className="input-section border-bottom">
        <Title className="title">Job title</Title>
        <TextInput
          label="Job title"
          classNames={inputClasses}
          data-autofocus
          {...workExperienceForm.getInputProps('jobTitle')}
        />
      </Box>
      <Box className="input-section">
        <Title className="title">Company name</Title>
        <Select
          data={[
            { value: 'react', label: 'React' },
            { value: 'ng', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'vue', label: 'Vue' },
          ]}
          {...workExperienceForm.getInputProps('companyName')}
          label="Search by company website"
          classNames={inputClasses}
        />
      </Box>
      <Box className="input-section">
        <Title className="title">Work email</Title>
        <TextInput
          label="Official Email"
          classNames={inputClasses}
          {...workExperienceForm.getInputProps('workEmail')}
        />
      </Box>
      <Box className="input-section border-bottom">
        <Title className="title">Company ID</Title>
        <TextInput
          label="Enter your unique company id"
          classNames={inputClasses}
          {...workExperienceForm.getInputProps('companyId')}
        />
      </Box>
      <Box className="input-section border-bottom">
        <Title className="title">Start Date</Title>
        <Box className="inner-input-section">
          <Select
            data={[
              { value: 'january', label: 'January' },
              { value: 'january', label: 'January' },
              { value: 'january', label: 'January' },
            ]}
            label="From month"
            classNames={inputClasses}
            {...workExperienceForm.getInputProps('startDate.startMonth')}
          />
          <Select
            data={[
              { value: '2023', label: '2023' },
              { value: '2023', label: '2023' },
              { value: '2023', label: '2023' },
              { value: '2023', label: '2023' },
              { value: '2023', label: '2023' },
            ]}
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
              data={[
                { value: 'january', label: 'January' },
                { value: 'january', label: 'January' },
                { value: 'january', label: 'January' },
              ]}
              label="From month"
              classNames={inputClasses}
              {...workExperienceForm.getInputProps('endDate.endMonth')}
            />
            <Select
              disabled={checked}
              data={[
                { value: '2023', label: '2023' },
                { value: '2023', label: '2023' },
                { value: '2023', label: '2023' },
                { value: '2023', label: '2023' },
                { value: '2023', label: '2023' },
              ]}
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
            data={[
              { value: 'work from office', label: 'Work From Office' },
              { value: 'work from home', label: 'Work From Home' },
              { value: 'Hybrid', label: 'Hybrid' },
            ]}
            label="Mode of Work"
            classNames={inputClasses}
            {...workExperienceForm.getInputProps('workType.modeOfWork')}
          />
          <Select
            data={[
              { value: 'full-time', label: 'Full-time' },
              { value: 'part-time', label: 'Part-time' },
              { value: 'internship', label: 'Intership' },
              { value: 'contract', label: 'Contract' },
            ]}
            label="Select work type"
            classNames={inputClasses}
            {...workExperienceForm.getInputProps('workType.workType')}
          />
        </Box>
      </Box>
    </form>
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
