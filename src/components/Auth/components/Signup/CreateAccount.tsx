import { isEmail } from '@mantine/form';
import { TextInput, createStyles, em, rem, Text, Button, Divider, Box } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import GoogleButton from '../GoogleButton';
import SignUpWithEmail from './SignUpWithEmail';
import '../../styles/global.scss';

const CreateAccount = () => {
  const {
    signupForm,
    signUpSteps,
    prevSingUpStep,
    isPhoneNumber,
    handleSignUp,
    inputValue,
    setInputValue,
  } = useAuthContext();

  const { classes: inputClasses } = inputStyles();

  return (
    <>
      {signUpSteps === 1 && (
        <TextInput
          label="Email or Phone number"
          classNames={inputClasses}
          {...signupForm.getInputProps('emailPhone')}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}

      {signUpSteps === 2 && (
        <Text className="disbledInput">
          {inputValue}
          <span className="changeBtn" onClick={() => prevSingUpStep()}>
            Change
          </span>
        </Text>
      )}
      {signUpSteps === 2 && isEmail(inputValue) && <SignUpWithEmail />}

      <Text className="tearms-condition">
        By creating an account, you agree to our <u>Terms of Service</u> and{' '}
        <u>Privacy & Cookie Statement</u>.
      </Text>
      <Button className="primaryBtn" onClick={handleSignUp}>
        {signUpSteps === 2 && isPhoneNumber(inputValue) ? 'Send OTP' : 'Agree & Join'}
      </Button>
      <Divider label="Or better yet" className="divider" labelPosition="center" />
      <GoogleButton />
    </>
  );
};

export default CreateAccount;

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
    },
  },
}));
