import { Box, Tabs, createStyles, rem, em } from '@mantine/core';
import { Signup } from './components/Signup/Signup';
import { Login } from './components/Login/Login';
import { Navbar } from '../common/Navbar';
import { AuthInfo } from './components/AuthInfo';
import { useAuthContext } from './context/AuthContext';
import Profile from './components/Signup/Profile';
import OTPTab from './components/Signup/OTPTab';
import ForgotPassword from './components/Login/ForgotPassword';
import LoginWithOTP from './components/Login/LoginWithOTP';

export const Auth = () => {
  const { classes } = useStyles();
  const {
    signUpSteps,
    isEmail,
    isPhoneNumber,
    inputValue,
    loginSteps,
    resetPasswordStep,
    loginWithOTPSteps,
  } = useAuthContext();

  return (
    <>
      <Box className={classes.authNav}>
        <Navbar />
      </Box>

      <Box className={classes.root}>
        <Box className={classes.auth_left}>
          <AuthInfo />
        </Box>
        <Box className={classes.auth_right}>
          {signUpSteps < 3 && loginSteps < 3 && resetPasswordStep < 1 && (
            <Tabs defaultValue="signup">
              <Tabs.List position="center">
                <Tabs.Tab value="signup">Create new account</Tabs.Tab>
                <Tabs.Tab value="login"> Log in </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="signup">
                <Signup />
              </Tabs.Panel>
              <Tabs.Panel value="login">
                <Login />
              </Tabs.Panel>
            </Tabs>
          )}
          {(signUpSteps === 3 && isEmail(inputValue) && <Profile />) ||
            (signUpSteps === 3 && isPhoneNumber(inputValue) && <OTPTab />) ||
            (signUpSteps === 4 && isPhoneNumber(inputValue) && <Profile />) ||
            (resetPasswordStep > 0 && <ForgotPassword />) ||
            (loginWithOTPSteps > 0 && <LoginWithOTP />)}
        </Box>
      </Box>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    [`@media screen and (max-width: ${em(1024)})`]: {
      gridTemplateColumns: '1fr',
    },
  },
  greenie: {
    fontSize: rem(22.5),
    fontWeight: 700,
    color: '#FFFFFF',

    [`@media screen and (max-width: ${em(1024)})`]: {
      display: 'none',
    },
  },
  verified: {
    fontSize: rem(17),
    color: '#9FE870',
    marginInlineStart: '0.25rem',
    display: 'inline-grid',
    placeItems: 'center',
    transform: 'translateY(2px)',
    [`@media screen and (max-width: ${em(1024)})`]: {
      display: 'none',
    },
  },
  authNav: {
    [`@media screen and (min-width: ${em(768)})`]: {
      display: 'none',
    },
  },
  auth_right: {
    height: '100dvh',
    maxWidth: '458px',
    paddingTop: '8rem',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',

    [`@media screen and (max-width: ${em(1024)})`]: {
      paddingTop: '0rem',
      paddingInline: '2rem',
    },
  },
  auth_left: {
    backgroundColor: '#17A672',
    paddingInline: '5.5rem',
    paddingTop: '6rem',
    borderRadius: rem(20),
    margin: rem(20),

    [`@media screen and (max-width: ${em(1400)})`]: {
      paddingInline: '3.5rem',
      paddingTop: '4rem',
    },

    [`@media screen and (max-width: ${em(1024)})`]: {
      backgroundColor: 'transparent',
      paddingInline: '1rem',
      paddingTop: '8rem',
    },
    [`@media screen and (max-width: ${em(768)})`]: {
      backgroundColor: 'transparent',
      paddingInline: '1rem',
      paddingTop: '5rem',
    },
  },

  authLeftHeading: {
    fontSize: rem(45),
    lineHeight: rem(60),
    letterSpacing: em(-0.02),
    fontWeight: 700,
    color: '#FFFFFF',
    marginBottom: '1rem',

    [`@media screen and (max-width: ${em(1400)})`]: {
      fontSize: rem(40),
      lineHeight: rem(45),
    },
    [`@media screen and (max-width: ${em(1024)})`]: {
      color: '#191819',
      fontSize: rem(30),
      lineHeight: rem(40),
      margin: '0 auto',
      maxWidth: '414px',
    },
  },
  authLeftText: {
    fontWeight: 400,
    fontSize: '0.95rem',
    lineHeight: rem(22),
    color: '#FFFFFF',
    marginBottom: '2rem',

    [`@media screen and (max-width: ${em(1024)})`]: {
      display: 'none',
    },
  },
  authLeftTestimonial: {
    background: '#FFFFFF',
    boxShadow: ' 0px 4px 34px rgba(0, 0, 0, 0.1)',
    borderRadius: rem(20),
    padding: '1.25rem',
    [`@media screen and (max-width: ${em(1024)})`]: {
      display: 'none',
    },
  },
  testimonial: {
    display: 'grid',
    gridTemplateColumns: '0.15fr 0.75fr',
  },
  testimonialHeading: {
    fontSize: '1rem',
    fontWeight: 400,
    marginBottom: '1rem',
  },
  testimonialImage: {
    border: '2px solid black',
    borderRadius: rem(20),
    height: '89px',
    width: '85px',
  },
  testimonialTextBox: {
    fontSize: '0.75rem',
    marginLeft: '1rem',
    marginTop: '0.5rem',
    color: '#697082',
  },
}));
