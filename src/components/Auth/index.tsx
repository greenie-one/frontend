import { Box, Tabs, createStyles, em } from '@mantine/core';
import { Signup } from './components/Signup/Signup';
import { Login } from './components/Login/Login';
import { Navbar } from '../common/Navbar';
import { AuthInfo } from './components/AuthInfo';
import { useAuthContext } from './context/AuthContext';
import Profile from './components/Signup/Profile';
import OTPTab from './components/Signup/OTPTab';
import ForgotPassword from './components/Login/ForgotPassword';
import LoginWithOTP from './components/Login/LoginWithOTP';
import './styles/global.scss';

export const Auth = () => {
  const { classes } = useStyles();
  const { isPhoneNumber, state, signupForm, isEmail, loginForm } = useAuthContext();
  const { signUpStep, loginStep, loginWithOTPStep, resetPasswordStep } = state;

  return (
    <>
      <Box className={classes.authNav}>
        <Navbar />
      </Box>

      <Box className={classes.root}>
        <Box className="authInfo">
          <AuthInfo />
        </Box>
        <Box className="authRight">
          <Box className="authRightContainer">
            {signUpStep < 3 && loginStep < 3 && resetPasswordStep < 1 && loginWithOTPStep < 1 && (
              <Tabs defaultValue="signup" color="dark">
                <Tabs.List className="tabList" position="center">
                  <Tabs.Tab className="tabBtn" value="signup">
                    Create new account
                  </Tabs.Tab>
                  <Tabs.Tab className="tabBtn" value="login">
                    Log in
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="signup">
                  <Signup />
                </Tabs.Panel>
                <Tabs.Panel value="login">
                  <Login />
                </Tabs.Panel>
              </Tabs>
            )}
            {(signUpStep === 3 && isEmail(signupForm.values.emailPhone) && <Profile />) ||
              (signUpStep === 3 && isPhoneNumber(signupForm.values.emailPhone) && <OTPTab />) ||
              (loginStep === 2 && isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
                <LoginWithOTP />
              )) ||
              (signUpStep === 4 && isPhoneNumber(signupForm.values.emailPhone) && <Profile />) ||
              (resetPasswordStep > 0 && <ForgotPassword />) ||
              (loginWithOTPStep > 0 && <LoginWithOTP />)}
          </Box>
        </Box>
      </Box>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    height: '100vh',
    [`@media screen and (max-width: ${em(1024)})`]: {
      gridTemplateColumns: '1fr',
    },
  },

  authNav: {
    [`@media screen and (min-width: ${em(768)})`]: {
      display: 'none',
    },
  },
}));
