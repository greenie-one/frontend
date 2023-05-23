import { Box, Title, TextInput, createStyles, em, rem, Select, Button } from '@mantine/core';
import { useProfileContext } from '../context/ProfileContext';

const expertise = [
  { value: 'amateur', label: 'Amature' },
  { value: 'amateur', label: 'Amature' },
  { value: 'amateur', label: 'Amature' },
];

export const SkillModal = () => {
  const { classes: inputClasses } = inputStyles();
  const { skillForm } = useProfileContext();
  return (
    <form>
      <Box className="input-section border-bottom">
        <Title className="title">Skill name</Title>
        <TextInput
          data-autofocus
          label="Eg. Frontend, Back"
          classNames={inputClasses}
          {...skillForm.getInputProps('skillName')}
        />
      </Box>
      <Box className="input-section border-bottom">
        <Title className="title">Expertise</Title>
        <Select
          data={expertise}
          label="Select your expertise"
          classNames={inputClasses}
          {...skillForm.getInputProps('expertise')}
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
