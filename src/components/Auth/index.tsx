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
import './styles/global.scss';

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
        <Box className="authInfo">
          <AuthInfo />
        </Box>
        <Box className="authRight">
          <Box className="authRightContainer">
            {signUpSteps < 3 && loginSteps < 3 && resetPasswordStep < 1 && (
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
            {(signUpSteps === 3 && isEmail(inputValue) && <Profile />) ||
              (signUpSteps === 3 && isPhoneNumber(inputValue) && <OTPTab />) ||
              (signUpSteps === 4 && isPhoneNumber(inputValue) && <Profile />) ||
              (resetPasswordStep > 0 && <ForgotPassword />) ||
              (loginWithOTPSteps > 0 && <LoginWithOTP />)}
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
