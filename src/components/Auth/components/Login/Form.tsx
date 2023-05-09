import {
  TextInput,
  createStyles,
  rem,
  Text,
  Button,
  Divider,
  PasswordInput,
  Flex,
  Box,
  em,
} from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import GoogleButton from '../GoogleButton';
import '../../styles/global.scss';

const Form = () => {
  const { classes: inputClasses } = inputStyles();
  const {
    loginForm,
    loginSteps,
    setInputValue,
    handleLogIn,
    nextResetPasswordStep,
    nextLoginStep,
    nextLoginWithOTPStep,
  } = useAuthContext();

  const handleForgotPassowrd = () => {
    nextResetPasswordStep();
    nextLoginStep();
    setInputValue('');
  };

  const handleLoginWithOTP = () => {
    nextLoginWithOTPStep();
    nextLoginStep();
  };
  return (
    <>
      <Box>
        {loginSteps === 1 && (
          <TextInput
            label="Email or Phone number"
            style={{ borderRadius: '1rem' }}
            classNames={inputClasses}
            {...loginForm.getInputProps('emailPhoneGreenieId').value}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
        {loginSteps === 2 && (
          <PasswordInput
            label="Enter Password"
            classNames={inputClasses}
            {...loginForm.getInputProps('password')}
          />
        )}
        {loginSteps === 2 && (
          <Flex direction={'row'} align={'center'} justify={'space-between'} mt={'6px'}>
            <Text
              fz="xs"
              fw={700}
              td="underline"
              style={{ cursor: 'pointer' }}
              onClick={handleLoginWithOTP}
            >
              Login using OTP
            </Text>
            <Text
              fz="xs"
              fw={700}
              td="underline"
              style={{ cursor: 'pointer' }}
              onClick={handleForgotPassowrd}
            >
              Forgot password?
            </Text>
          </Flex>
        )}

        <Button
          type="submit"
          fullWidth
          radius="xl"
          color="teal"
          style={{ margin: '1rem 0' }}
          onClick={handleLogIn}
        >
          {loginSteps === 1 ? 'Continue' : 'Login'}
        </Button>
        <Divider my="lg" label="Or better yet" fw={700} fz={'xl'} labelPosition="center" />
        <GoogleButton />
      </Box>
    </>
  );
};

export default Form;

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
