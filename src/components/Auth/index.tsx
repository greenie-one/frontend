import { Box, Tabs, createStyles, em } from '@mantine/core';
import { Login } from './components/Login/Login';
import { Navbar } from '../common/Navbar';
import { AuthInfo } from './components/AuthInfo';
import { useAuthContext } from './context/AuthContext';
import ForgotPassword from './components/Login/ForgotPassword';
import LoginWithOTP from './components/Login/LoginWithOTP';
import './styles/global.scss';
import SignUpStepOne from './components/Signup/SignUpStepOne';
import SignUpStepTwo from './components/Signup/SignUpStepTwo';
import SignUpStepThree from './components/Signup/SignUpStepThree';
import SignUpStepFour from './components/Signup/SignUpStepFour';
import SignUpStepFive from './components/Signup/SignUpStepFive';

export const Auth = () => {
  const { classes } = useStyles();
  const { isPhoneNumber, state, signupForm, isValidEmail, loginForm } = useAuthContext();
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
              {signUpStep === 3 && isPhoneNumber(signupForm.values.emailPhone) ? (
                <Box></Box>
              ) : signUpStep < 4 ? (
                <Tabs.List className="tabList" position="center">
                  <Tabs.Tab className="tabBtn" value="signup">
                    Create new account
                  </Tabs.Tab>
                  <Tabs.Tab className="tabBtn" value="login">
                    Log in {loginStep}
                  </Tabs.Tab>
                </Tabs.List>
              ) : (
                <Box></Box>
              )}

              <Tabs.Panel value="signup">
                {signUpStep === 1 && <SignUpStepOne />}
                {signUpStep === 2 && <SignUpStepTwo />}
                {signUpStep === 3 && <SignUpStepThree />}
                {signUpStep === 4 && <SignUpStepFour />}
                {signUpStep === 5 && <SignUpStepFive />}
              </Tabs.Panel>
              <Tabs.Panel value="login">
                <Login />
              </Tabs.Panel>
            </Tabs>
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
