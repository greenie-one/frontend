import { useState } from 'react';
import { TextInput, createStyles, rem, Text, Button, Box, Flex, em, Chip } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import { BsArrowLeft } from 'react-icons/bs';
import linkedInLogo from '../../assets/linkedIn-logo.png';
import '../../styles/global.scss';

const skillSetOne = [
  'Team Player',
  'Energetic',
  'Optimistic',
  'Self Initiator',
  'hardworking',
  'Prodigy',
  'Lone Wolf',
  'Micro Planner',
  'Jack of all trade',
];

const Profile = () => {
  const { classes: inputClasses } = inputStyles();
  const [active, setActive] = useState(1);
  const { dispatch } = useAuthContext();

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleGoBack = () => {
    if (active === 1) {
      dispatch({ type: 'PREVSIGNUPSTEP' });
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
      <Box className="progress-bar-wrapper">
        <Box className="progress-bar" bg={'#9fe870'}></Box>
        <Box
          className="progress-bar"
          bg={active === 2 || active === 3 ? '#9fe870' : '#F3F3F3'}
        ></Box>
        <Box className="progress-bar" bg={active === 3 ? '#9fe870' : '#F3F3F3'}></Box>
      </Box>

      {active === 1 && (
        <Box>
          <Text className="steps">{`Steps ${active}`}/3</Text>
          <Text className="profileText">What should we call you?</Text>
          <TextInput label="First Name" classNames={inputClasses} />
          <TextInput label="Last Name" classNames={inputClasses} />
          <Button className="primaryBtn" onClick={nextStep}>
            Continue
          </Button>
        </Box>
      )}

      {active === 2 && (
        <Box>
          <Text className="steps">{`Steps ${active}`}/3</Text>
          <Box
            my={'lg'}
            style={{
              width: '100%',
              height: '147px',
              backgroundColor: '#F3F3F3',
              borderRadius: '1rem',
            }}
          ></Box>
          <Text className="profileText" align="center">
            Help us create a better experience for you
          </Text>
          <Button className="secondaryBtn" onClick={nextStep}>
            Connect your
            <span>
              <img src={linkedInLogo} alt="linkedIn logo" />
            </span>
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
        </Box>
      )}

      {active === 3 && (
        <Box>
          <Text className="steps">{`Steps ${active}`}/3</Text>
          <Box
            mx={'auto'}
            style={{
              width: '148px',
              height: '148px',
              backgroundColor: '#F3F3F3',
              borderRadius: '20px',
              marginBottom: '16px',
            }}
          ></Box>
          <Text className="profileText" align="center">
            Introduce yourself in 3 words
          </Text>
          <Box className="skills-box">
            <Box className="skill-wrapper">
              {skillSetOne.map((skill) => (
                <Chip key={skill} variant="filled" color="teal" size={'xs'}>
                  {skill}
                </Chip>
              ))}
            </Box>
          </Box>

          <Button className="secondaryBtn" onClick={nextStep}>
            Take me to my Greenie Profile
          </Button>
        </Box>
      )}
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
