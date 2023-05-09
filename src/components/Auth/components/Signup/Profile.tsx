import { useState } from 'react';
import { TextInput, createStyles, rem, Text, Button, Stepper, Box, Flex, em } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import IntroButton from './IntroButton';
import { BsArrowLeft } from 'react-icons/bs';
import linkedInLogo from '../../assets/linkedIn-logo.png';
import '../../styles/global.scss';
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
    <Box>
      <Flex className="tabTopBox" onClick={handleGoBack}>
        <BsArrowLeft size={'16px'} />
        <Text className="tabHeading">Go Back</Text>
      </Flex>
      <Stepper active={active} size="xs" color="#8CF078">
        <Stepper.Step>
          <Text className="steps">{`Steps ${active + 1}`}/3</Text>
          <Text className="profileText">What should we call you?</Text>
          <TextInput label="First Name" classNames={inputClasses} />
          <TextInput label="Last Name" classNames={inputClasses} />
          <Button className="primaryBtn" onClick={nextStep}>
            Continue
          </Button>
        </Stepper.Step>
        <Stepper.Step>
          <Text className="steps">{`Steps ${active + 1}`}/3</Text>
          <Box
            my={'lg'}
            style={{
              width: '100%',
              height: '100px',
              backgroundColor: '#F3F3F3',
              borderRadius: '1rem',
            }}
          ></Box>
          <Text className="profiletext" align="center">
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
          <Text className="steps">{`Steps ${active + 1}`}/3</Text>
          <Box
            mx={'auto'}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#F3F3F3',
              borderRadius: '1rem',
            }}
          ></Box>
          <Text className="profileText" align="center">
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
    marginBottom: '16px',
  },

  input: {
    width: '458px',
    height: '68px',
    paddingTop: '18px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid #D1D4DB',
    lineHeight: '19px',
    letterSpacing: '-0.02em',
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      width: '310px',
      height: '46px',
      borderRadius: '6px',
      fontSize: '10px',
      lineHeight: '12px',
      border: '5px solid black',
      margin: '0 auto',
    },
  },

  // for password field
  innerInput: {
    height: rem(54),
    paddingTop: rem(18),
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
      fontSize: '8px',
      lineHeight: '10px',
      paddingLeft: '11.54px',
    },
  },
}));
