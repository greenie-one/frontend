import { useState } from 'react';
import { TextInput, createStyles, rem, Text, Button, Stepper, Box, Flex } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import IntroButton from './IntroButton';
import { BsArrowLeft } from 'react-icons/bs';
import linkedInLogo from '../../assets/linkedIn-logo.png';
const skillSetOne = ['Team Player', 'Energetic', 'Optimistic', 'Self Initiator', 'hardworking'];

const skillSetTwo = ['Prodigy', 'Lone Wolf', 'Micro Planner', 'Jack of all trade'];

const Profile = () => {
  const { classes: inputClasses } = inputStyles();
  const [active, setActive] = useState(0);
  const { prevSingUpStep } = useAuthContext();

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleGoBack = () => {
    if (active === 0) {
      prevSingUpStep();
    } else {
      prevStep();
    }
  };
  return (
    <Box className="authRightContainer">
      <Flex direction={'row'} align={'center'} mb={'sm'} onClick={handleGoBack}>
        <BsArrowLeft size={'15px'} />
        <Text fw={'bold'} fz={'xs'} ml={'xs'} style={{ cursor: 'pointer' }}>
          Go Back
        </Text>
      </Flex>
      <Stepper active={active} size="xs" color="#8CF078" mb={'sm'}>
        <Stepper.Step>
          <Text mb={'lg'} fz={'xs'}>
            {`Steps ${active + 1}`}/3
          </Text>
          <Text fs={'sm'} my={'lg'}>
            What should we call you?
          </Text>
          <TextInput label="First Name" classNames={inputClasses} />
          <TextInput label="Last Name" classNames={inputClasses} />
          <Button fullWidth radius="xl" color="teal" onClick={nextStep}>
            Continue
          </Button>
        </Stepper.Step>
        <Stepper.Step>
          <Text fz={'xs'}>{`Steps ${active + 1}`}/3</Text>
          <Box
            my={'lg'}
            style={{
              width: '100%',
              height: '100px',
              backgroundColor: '#F3F3F3',
              borderRadius: '1rem',
            }}
          ></Box>
          <Text fw={'600'} fz={'xs'} align="center">
            Help us create a better experience for you
          </Text>
          <Button fullWidth radius="xl" my={'lg'} fw={'600'} variant="default" onClick={nextStep}>
            Connect your{' '}
            <span style={{ width: '22px', marginInline: '0.15rem' }}>
              <img src={linkedInLogo} alt="linkedIn logo" />
            </span>{' '}
            LinkedIn Account
          </Button>
          <Text
            fz={'xs'}
            align="center"
            color="#4C4C4C"
            onClick={nextStep}
            style={{ cursor: 'pointer' }}
          >
            Skip for now
          </Text>
        </Stepper.Step>
        <Stepper.Step>
          <Text fz={'xs'}>{`Steps ${active + 1}`}/3</Text>
          <Box
            my={'lg'}
            mx={'auto'}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#F3F3F3',
              borderRadius: '1rem',
            }}
          ></Box>
          <Text fw={'600'} fz={'xs'} align="center">
            Introduce yourself in 3 words
          </Text>
          <Box className="skills-box">
            <Box className="skill-wrapper">
              {skillSetOne.map((skill) => (
                <IntroButton key={skill} label={skill} />
              ))}
            </Box>

            <Box className="skill-wrapper">
              {skillSetTwo.map((skill) => (
                <IntroButton key={skill} label={skill} />
              ))}
            </Box>
          </Box>

          <Button fullWidth radius="xl" my={'lg'} fw={'500'} variant="default" onClick={nextStep}>
            Take me to my Greenie Profile
          </Button>
        </Stepper.Step>
      </Stepper>
    </Box>
  );
};

export default Profile;

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: rem(16),
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  // for password field
  innerInput: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
    color: '#4C4C4C',
  },

  Button: {
    margin: '2rem 0',
  },
}));
