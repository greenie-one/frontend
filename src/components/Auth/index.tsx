import { Box, Tabs, createStyles, em } from '@mantine/core';
import { useAuthContext } from './context/AuthContext';
import { Navbar } from '../common/Navbar';
import { AuthInfo } from './components/AuthInfo';

import SignUpStepOne from './components/Signup/SignUpStepOne';
import SignUpStepTwo from './components/Signup/SignUpStepTwo';
import SignUpStepThree from './components/Signup/SignUpStepThree';

import LoginStepOne from './components/Login/LoginStepOne';
import LoginStepTwo from './components/Login/LoginStepTwo';
import LoginStepThree from './components/Login/LoginStepThree';

import Profile from './components/Signup/Profile';
import ForgotPassword from './components/Login/ForgotPassword';
import './styles/global.scss';

export const Auth = () => {
  const { classes } = useStyles();

  const { isPhoneNumber, state, loginForm } = useAuthContext();

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
              {state.loginStep === 2 && isPhoneNumber(loginForm.values.emailPhoneGreenieId)}
              {state.signUpStep < 3 && state.loginStep < 3 ? (
                state.loginStep === 2 &&
                isPhoneNumber(loginForm.values.emailPhoneGreenieId) ? null : (
                  <Tabs.List className="tabList" position="center">
                    <Tabs.Tab className="tabBtn" value="signup">
                      Create new account
                    </Tabs.Tab>
                    <Tabs.Tab className="tabBtn" value="login">
                      Log in
                    </Tabs.Tab>
                  </Tabs.List>
                )
              ) : null}

              <Tabs.Panel value="signup">
                <form>
                  {state.signUpStep === 1 && <SignUpStepOne />}
                  {state.signUpStep === 2 && <SignUpStepTwo />}
                  {state.signUpStep === 3 && <SignUpStepThree />}
                  {state.signUpStep === 4 && <Profile />}
                </form>
              </Tabs.Panel>

              <Tabs.Panel value="login">
                {state.signUpStep !== 4 ? (
                  <form>
                    {state.loginStep === 1 && <LoginStepOne />}
                    {state.loginStep === 2 && <LoginStepTwo />}
                    {state.loginStep === 3 && <LoginStepThree />}
                    {state.signUpStep === 4 && <Profile />}
                  </form>
                ) : (
                  <form>{state.signUpStep === 4 && <Profile />}</form>
                )}
              </Tabs.Panel>
            </Tabs>

            <form>{state.resetPasswordStep > 0 && <ForgotPassword />}</form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100vh',
    [`@media screen and (max-width: ${em(1024)})`]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      height: '90vh',
    },
  },

  authNav: {
    [`@media screen and (min-width: ${em(768)})`]: {
      display: 'none',
    },
  },
}));
