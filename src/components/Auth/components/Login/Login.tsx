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
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import GoogleButton from '../GoogleButton';
import '../../styles/InputStyles.scss';

export const Login = () => {
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
    <Box className="authRightContainer">
      {loginSteps === 1 && (
        <TextInput
          label="Email or Phone number"
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
      <Text ta={'center'} mt={'sm'}>
        Not one Greenie yet?{' '}
        <u>
          <Link to={'/'}>Create a new Account</Link>
        </u>
      </Text>
    </Box>
  );
};

const inputStyles = createStyles((theme) => ({
  root: {
    marginTop: '2rem',
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

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
}));
