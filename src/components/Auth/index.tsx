import { Box, Tabs, createStyles, em } from '@mantine/core';
import { Login } from './components/Login/Login';
import { Navbar } from '../common/Navbar';
import { AuthInfo } from './components/AuthInfo';
import { useAuthContext } from './context/AuthContext';

import SignUpStepOne from './components/Signup/SignUpStepOne';
import SignUpStepTwo from './components/Signup/SignUpStepTwo';
import SignUpStepThree from './components/Signup/SignUpStepThree';
import './styles/global.scss';
import Profile from './components/Signup/Profile';
import LoginStepOne from './components/Login/LoginStepOne';
import LoginStepTwo from './components/Login/LoginStepTwo';
import LoginStepThree from './components/Login/LoginStepThree';
import LoginWithOTP from './components/Login/LoginWithOTP';
import ForgotPassword from './components/Login/ForgotPassword';

export const Auth = () => {
  const { classes } = useStyles();

  const { isPhoneNumber, state, loginForm } = useAuthContext();
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
            <Tabs defaultValue="signup" color="dark">
              {loginStep === 2 && isPhoneNumber(loginForm.values.emailPhoneGreenieId)}
              {signUpStep < 3 && loginStep < 3 ? (
                loginStep === 2 && isPhoneNumber(loginForm.values.emailPhoneGreenieId) ? (
                  <Box></Box>
                ) : (
                  <Tabs.List className="tabList" position="center">
                    <Tabs.Tab className="tabBtn" value="signup">
                      Create new account
                    </Tabs.Tab>
                    <Tabs.Tab className="tabBtn" value="login">
                      Log in
                    </Tabs.Tab>
                  </Tabs.List>
                )
              ) : (
                <Box></Box>
              )}

              <Tabs.Panel value="signup">
                <form>
                  {signUpStep === 1 && <SignUpStepOne />}
                  {signUpStep === 2 && <SignUpStepTwo />}
                  {signUpStep === 3 && <SignUpStepThree />}
                  {signUpStep === 4 && <Profile />}
                </form>
              </Tabs.Panel>
              <Tabs.Panel value="login">
                {loginStep === 1 && <LoginStepOne />} {loginStep === 2 && <LoginStepTwo />}
                {loginStep === 3 && <LoginStepThree />}
              </Tabs.Panel>
            </Tabs>
            {loginWithOTPStep > 0 && <LoginWithOTP />}
            {resetPasswordStep > 0 && <ForgotPassword />}
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
