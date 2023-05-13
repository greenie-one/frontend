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
import TermsAndConditions from '../../assets/terms_and_conditions-greenie.pdf';
import PrivacyPolicy from '../../assets/Privacy Policy-Greenie.pdf';

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

  return (
    <>
      <Box>
        {state.loginStep === 1 && (
          <Box>
            <TextInput
              label="Email or Phone number"
              classNames={inputClasses}
              {...loginForm.getInputProps('emailPhoneGreenieId')}
            />
            <Text className="tearms-condition">
              By creating an account, you agree to our{' '}
              <a href={TermsAndConditions} download={'Terms and Conditions'}>
                Terms of Service
              </a>{' '}
              and
              <a href={PrivacyPolicy} download={'Privacy Policy'}>
                {' '}
                Privacy & Cookie Statement
              </a>
              .
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
      width: '350px',
      height: '46px',
      borderRadius: '6px',
      fontSize: '10px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },

  innerInput: {
    height: rem(54),
    paddingTop: rem(28),

    [`@media screen and (max-width: ${em(1024)})`]: {
      paddingTop: rem(8),
    },
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
      fontSize: '10px',
      lineHeight: '10px',
      paddingTop: '8px',
    },
  },
}));
