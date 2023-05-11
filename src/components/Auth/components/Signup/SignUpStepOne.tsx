import { TextInput, createStyles, em, rem, Text, Button, Divider, Box } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import GoogleButton from '../GoogleButton';
import '../../styles/global.scss';

const SignUpStepOne = () => {
  const { signupForm, state, dispatch, isPhoneNumber, isValidEmail } = useAuthContext();
  const { signUpStep } = state;

  const { classes: inputClasses } = inputStyles();
  return (
    <>
      {signUpStep === 1 && (
        <Box>
          <TextInput
            label="Email or Phone number"
            classNames={inputClasses}
            {...signupForm.getInputProps('emailPhone')}
          />
          <Text className="tearms-condition">
            By creating an account, you agree to our <u>Terms of Service</u> and{' '}
            <u>Privacy & Cookie Statement</u>.
          </Text>
          <Button onClick={() => dispatch({ type: 'NEXTSIGNUPSTEP' })} className="primaryBtn">
            Agree & Join
          </Button>
          <Divider label="Or better yet" className="divider" labelPosition="center" />
          <GoogleButton />
        </Box>
      )}
    </>
  );
};

export default SignUpStepOne;

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
