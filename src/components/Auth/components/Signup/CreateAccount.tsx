import { TextInput, createStyles, rem, Text, Button, Divider, Box } from '@mantine/core';
import { isEmail } from '@mantine/form';
import { useAuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import GoogleButton from '../GoogleButton';
import SignUpWithEmail from './SignUpWithEmail';
import '../../styles/InputStyles.scss';

const CreateAccount = () => {
  const { classes: inputClasses } = inputStyles();
  const {
    signupForm,
    signUpSteps,
    prevSingUpStep,
    isPhoneNumber,
    handleSignUp,
    inputValue,
    setInputValue,
  } = useAuthContext();

  return (
    <Box className="authRightContainer">
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
        <Text
          fz={'sm'}
          mb={'md'}
          color="4C4C4C"
          className="disbledInput"
          p={'sm'}
          style={{ border: '1px solid #D1D4DB', borderRadius: '2px', background: '#FFFFFF' }}
        >
          {inputValue}
          <span className="changeBtn" onClick={() => prevSingUpStep()}>
            Change
          </span>
        </Text>
      )}
      {signUpSteps === 2 && isEmail(inputValue) && <SignUpWithEmail />}

      <Text fz={{ sm: 'sm', md: 'md' }} mb={'md'} color="4C4C4C">
        By creating an account, you agree to our <u>Terms of Service</u> and{' '}
        <u>Privacy & Cookie Statement</u>.
      </Text>
      <Button fullWidth radius="xl" color="teal" onClick={handleSignUp}>
        {signUpSteps === 2 && isPhoneNumber(inputValue) ? 'Send OTP' : 'Agree & Join'}
      </Button>
      <Divider my="lg" label="Or better yet" fw={700} fz={'xl'} labelPosition="center" />
      <GoogleButton />
      <Text ta={'center'} mt={'sm'}>
        Aleady on Greenie?{' '}
        <u>
          <Link to={'/'}>Log In</Link>
        </u>
      </Text>
    </Box>
  );
};

export default CreateAccount;

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
  },

  Button: {
    margin: '2rem 0',
  },
}));
