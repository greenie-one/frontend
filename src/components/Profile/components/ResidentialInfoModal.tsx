import {
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
import { useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';

const states = [
  { value: 'andhra pradesh', label: 'Andhra Pradesh' },
  { value: 'arunachal pradesh', label: 'Arunachal Pradesh' },
  { value: 'assam', label: 'Assam' },
];

const countries = [
  { value: 'india', label: 'India' },
  { value: 'india', label: 'India' },
  { value: 'india', label: 'India' },
  { value: 'india', label: 'India' },
  { value: 'india', label: 'India' },
  { value: 'india', label: 'India' },
  { value: 'india', label: 'India' },
];

const months = [
  { value: 'january', label: 'January' },
  { value: 'january', label: 'January' },
  { value: 'january', label: 'January' },
];

const years = [
  { value: '2023', label: '2023' },
  { value: '2023', label: '2023' },
  { value: '2023', label: '2023' },
  { value: '2023', label: '2023' },
  { value: '2023', label: '2023' },
];

export const ResidentialInfoModal = () => {
  const { classes: inputClasses } = inputStyles();
  const [checked, setChecked] = useState(false);

  const handleLocation = () => {
    // API To be used
    // should use navigator?
  };
  return (
    <form>
      <Box className="input-section">
        <Title className="title">Address Line 1</Title>
        <TextInput data-autoFocus label="Job title" classNames={inputClasses} />
      </Box>
      <Box className="input-section ">
        <Title className="title">Address Line 2</Title>
        <TextInput label="Job title" classNames={inputClasses} />
      </Box>
      <Box className="input-section ">
        <Title className="title">Landmark</Title>
        <TextInput label="Job title" classNames={inputClasses} />
      </Box>
      <Box className="input-section ">
        <Title className="title">Pincode</Title>
        <TextInput label="Job title" maxLength={6} pattern="[0-9]" classNames={inputClasses} />
      </Box>
      <Box className="input-section border-bottom">
        <Title className="title">State/Country</Title>
        <Box className="inner-input-section">
          <Select data={states} label="Select state" classNames={inputClasses} />
          <Select data={countries} label="Select country" classNames={inputClasses} />
        </Box>
      </Box>
      <Box className="input-section">
        <Title className="title">Start Date</Title>
        <Box className="inner-input-section">
          <Select data={months} label="From month" classNames={inputClasses} />
          <Select data={years} label="From year" classNames={inputClasses} />
        </Box>
      </Box>
      <Box className="input-section border-bottom">
        <Title className="title">End Date</Title>
        <Box className="inner-input-box">
          <Box className="inner-input-section">
            <Select data={months} label="From month" classNames={inputClasses} />
            <Select disabled={checked} data={years} label="From year" classNames={inputClasses} />
          </Box>
          <Checkbox
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            className="checkbox"
            color="teal"
            label="I currently live here"
          />
        </Box>
      </Box>
      <Box className="location-wrapper">
        <Button
          leftIcon={<IoLocationOutline size={'22px'} />}
          className="location-btn"
          variant="default"
          onClick={handleLocation}
        >
          Find my current location
        </Button>
        <Box className="map"></Box>
        <Box className="btn-wrapper">
          <Button color="teal">Save</Button>
          <Button variant="default">Cancel</Button>
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
