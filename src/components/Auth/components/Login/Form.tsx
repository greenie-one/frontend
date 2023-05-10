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
  const { loginForm, state, dispatch, isValidEmail, isPhoneNumber } = useAuthContext();

  const handleForgotPassowrd = () => {
    dispatch({ type: 'NEXTRESETPASSWRDSTEP' });
    dispatch({ type: 'NEXTLOGINSTEP' });
  };

  const handleLogin = () => {
    if (isValidEmail(loginForm.values.emailPhoneGreenieId)) {
      dispatch({ type: 'NEXTLOGINSTEP' });
    }
    if (isPhoneNumber(loginForm.values.emailPhoneGreenieId)) {
      handleLoginWithOTP();
    }
  };

  const handleLoginWithOTP = () => {
    dispatch({ type: 'NEXTLOGINWITHOTPSTEP' });
    dispatch({ type: 'NEXTLOGINSTEP' });
  };

  const handleClick = () => {
    dispatch({ type: 'RESETLOGINSTEP' });
  };
  return (
    <>
      <Box>
        {state.loginStep === 1 && (
          <Box>
            <TextInput
              label="Email or Phone number"
              style={{ borderRadius: '1rem' }}
              classNames={inputClasses}
              {...loginForm.getInputProps('emailPhoneGreenieId')}
            />
            <Text className="tearms-condition">
              By creating an account, you agree to our <u>Terms of Service</u> and{' '}
              <u>Privacy & Cookie Statement</u>.
            </Text>
          </Box>
        )}
        {state.loginStep === 2 && isValidEmail(loginForm.values.emailPhoneGreenieId) && (
          <Box>
            <PasswordInput
              label="Enter Password"
              classNames={inputClasses}
              {...loginForm.getInputProps('password')}
            />
            <Flex direction={'row'} align={'center'} justify={'space-between'} mt={'6px'}>
              <Text className="loginLink" onClick={handleLoginWithOTP}>
                Login using OTP
              </Text>
              <Text className="loginLink" onClick={handleForgotPassowrd}>
                Forgot password?
              </Text>
            </Flex>
          </Box>
        )}
        {state.loginStep < 3 && (
          <Box>
            {' '}
            <Button type="submit" className="primaryBtn" onClick={handleLogin}>
              {state.loginStep === 1 ? 'Continue' : 'Login'}
            </Button>
            <Divider label="Or better yet" className="divider" labelPosition="center" />
            <GoogleButton />
          </Box>
        )}
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
