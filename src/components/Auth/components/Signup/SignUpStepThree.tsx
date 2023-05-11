import { TextInput, createStyles, em, rem, Text, Button, Divider, Flex, Box } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { useAuthContext } from '../../context/AuthContext';
import GoogleButton from '../GoogleButton';
import '../../styles/global.scss';

const SignUpStepThree = () => {
  const { signupForm, state, dispatch, isPhoneNumber, isValidEmail } = useAuthContext();
  const { signUpStep } = state;
  const { classes: inputClasses } = inputStyles();
  return (
    <>
      {(signUpStep === 3 && isValidEmail(signupForm.values.emailPhone) && (
        <Box>
          <Text className="disbledInput">
            {signupForm.values.emailPhone}
            <span className="changeBtn" onClick={() => dispatch({ type: 'PREVSIGNUPSTEP' })}>
              Change
            </span>
          </Text>
          <Text className="tearms-condition">
            By creating an account, you agree to our <u>Terms of Service</u> and{' '}
            <u>Privacy & Cookie Statement</u>.
          </Text>
          <Button onClick={() => dispatch({ type: 'NEXTSIGNUPSTEP' })} className="primaryBtn">
            Send OTP
          </Button>
          <Divider label="Or better yet" className="divider" labelPosition="center" />
          <GoogleButton />
        </Box>
      )) ||
        (signUpStep === 3 && isPhoneNumber(signupForm.values.emailPhone) && (
          <Box>
            <Flex className="tabTopBox" onClick={() => dispatch({ type: 'PREVSIGNUPSTEP' })}>
              <BsArrowLeft size={'15px'} />
              <Text className="tabHeading">Reset Password</Text>
            </Flex>
            <Text className="profileTextBold">
              Enter the one-time password sent to your phone number
            </Text>
            <input className="otpInput" maxLength={4} type="text" pattern="[0-9]{4}" />
            <Text fw={'light'} fz={'xs'} my={'md'}>
              Resend{' '}
              <Text fw={'600'} span>
                after 30s
              </Text>
            </Text>
            <Button className="primaryBtn" onClick={() => dispatch({ type: 'NEXTSIGNUPSTEP' })}>
              Verify
            </Button>
          </Box>
        ))}
    </>
  );
};

export default SignUpStepThree;

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: '24px',
    marginTop: '24px',
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
    },
  },
}));
