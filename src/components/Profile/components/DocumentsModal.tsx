import { Box, Title, TextInput, createStyles, em, rem, Select, Button } from '@mantine/core';
import { useProfileContext } from '../context/ProfileContext';

const documentsType = [
  {
    value: 'pan',
    label: 'Pan Card',
  },
  { value: 'aadhar', label: 'Adhar Card' },
];

export const DocumentsModal = () => {
  const { classes: inputClasses } = inputStyles();
  return (
    <form>
      <Box className="input-section border-bottom">
        <Title className="title">Your Name</Title>
        <TextInput withAsterisk data-autofocus label="Enter your name" classNames={inputClasses} />
      </Box>
      <Box className="input-section">
        <Title className="title">Select Document</Title>
        <Select
          withAsterisk
          data={documentsType}
          label="Select your document"
          classNames={inputClasses}
        />
      </Box>
      <Box className="input-section  border-bottom">
        <Title className="title">Your Card Number</Title>
        <TextInput
          withAsterisk
          data-autofocus
          label="Enter your card number"
          classNames={inputClasses}
        />
      </Box>
      <Box className="location-wrapper">
        <Box className="btn-wrapper">
          <Button color="teal" type="submit">
            Save
          </Button>
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
