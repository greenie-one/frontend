import { Box, Tabs, createStyles, em } from '@mantine/core';
import { useAuthContext } from './context/AuthContext';
import { Navbar } from '../common/Navbar';
import { AuthInfo } from './components/AuthInfo';

import SignUpStepOne from './components/signup/SignUpStepOne';
import SignUpStepTwo from './components/signup/SignUpStepTwo';
import SignUpStepThree from './components/signup/SignUpStepThree';

import LoginStepOne from './components/login/LoginStepOne';
import LoginStepTwo from './components/login/LoginStepTwo';
import LoginStepThree from './components/login/LoginStepThree';

import Profile from './components/signup/Profile';
import ForgotPassword from './components/login/ForgotPassword';
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
                state.loginStep === 2 && isPhoneNumber(loginForm.values.emailPhoneGreenieId) ? null : (
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

const useStyles = createStyles(() => ({
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
