import { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
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
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useAuthContext } from '../../context/AuthContext';
import { authApiList } from '../../../../assets/api/ApiList';

import GoogleButton from '../Google/GoogleButton';
import { FaExclamation } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import { BsCheckLg } from 'react-icons/bs';
import '../../styles/global.scss';

const LoginStepTwo = () => {
  const navigate = useNavigate();
  const { classes: inputClasses } = inputStyles();
  const {
    loginForm,
    state,
    dispatch,
    isValidEmail,
    isPhoneNumber,
    setValidationId,
    setForceRender,
  } = useAuthContext();

  const [authTokens, setAuthTokens] = useLocalStorage({ key: 'auth-tokens' });
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginWithPhoneNo = () => {
    loginForm.setFieldValue('emailPhoneGreenieId', '');
    dispatch({ type: 'PREVLOGINSTEP' });
  };

  const handleForgotPassowrd = () => {
    loginForm.setFieldValue('emailPhoneGreenieId', '');
    dispatch({ type: 'NEXTRESETPASSWRDSTEP' });
    dispatch({ type: 'NEXTLOGINSTEP' });
  };

  const handleChangeButton = () => {
    dispatch({ type: 'RESETLOGINSTEP' });
  };

  const handleEmailLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isLoading) {
      return Promise.resolve(null);
    }

    if (!loginForm.validateField('password').hasError) {
      loginForm.clearErrors();
      setIsLoading(true);

      try {
        notifications.show({
          id: 'load-data',
          title: 'Loading...',
          message: 'Please wait while we log you in...',
          loading: true,
          autoClose: false,
          withCloseButton: false,
          sx: { borderRadius: em(8) },
        });

        const res = await axios.post(authApiList.login, {
          email: loginForm.values.emailPhoneGreenieId,
          password: loginForm.values.password,
        });

        if (res.data) {
          setValidationId(res.data?.validationId);
          const resp = await axios.post(authApiList.validateOtp, {
            validationId: res.data?.validationId,
            otp: '123456',
          });

          if (resp.data) {
            setAuthTokens(resp.data);
            setForceRender((prev) => !prev);

            setTimeout(() => {
              notifications.update({
                id: 'load-data',
                title: 'Success !',
                message: 'You have been logged in successfully.',
                autoClose: 2200,
                withCloseButton: false,
                color: 'teal',
                icon: <BsCheckLg />,
                sx: { borderRadius: em(8) },
              });
            }, 1100);
          }
        }
      } catch (err: any) {
        if (err.response?.data?.code === 'GR0011') {
          loginForm.setFieldValue('password', '');

          notifications.update({
            id: 'load-data',
            title: 'Error !',
            message: 'Invalid Credentials. Please try again.',
            autoClose: 2200,
            withCloseButton: false,
            color: 'red',
            icon: <FaExclamation />,
            sx: { borderRadius: em(8) },
          });
        }
        if (err.response?.data?.code === 'GRA0012') {
          loginForm.setFieldValue('password', '');

          notifications.update({
            id: 'load-data',
            title: 'Error !',
            message: 'Invalid Credentials. Please try again.',
            autoClose: 2200,
            withCloseButton: false,
            color: 'red',
            icon: <FaExclamation />,
            sx: { borderRadius: em(8) },
          });
        }
        if (err.response?.data?.code === 'GRA0008') {
          loginForm.setFieldValue('password', '');

          notifications.update({
            id: 'load-data',
            title: 'Error !',
            message: 'User not found. Please create an account first.',
            autoClose: 2200,
            withCloseButton: false,
            color: 'red',
            icon: <FaExclamation />,
            sx: { borderRadius: em(8) },
          });

          dispatch({ type: 'PREVLOGINSTEP' });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const sendLoginOTP = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isLoading) {
      return Promise.resolve(null);
    }

    if (state.loginStep === 2) {
      loginForm.clearErrors();
      setIsLoading(true);

      try {
        notifications.show({
          id: 'load-data',
          title: 'Sending...',
          message: 'Please wait while we send you an OTP.',
          loading: true,
          autoClose: false,
          withCloseButton: false,
          sx: { borderRadius: em(8) },
        });

        const res = await axios.post(authApiList.login, {
          mobileNumber: loginForm.values.emailPhoneGreenieId,
        });

        if (res.data) {
          setValidationId(res.data?.validationId);
          setTimeout(() => {
            notifications.update({
              id: 'load-data',
              title: 'Success !',
              message: 'An OTP has been sent to your mobile number.',
              autoClose: 2200,
              withCloseButton: false,
              color: 'teal',
              icon: <BsCheckLg />,
              sx: { borderRadius: em(8) },
            });
          }, 1100);

          dispatch({ type: 'NEXTLOGINSTEP' });
        }
      } catch (err: any) {
        if (err.response?.data?.code === 'GR0011') {
          notifications.update({
            id: 'load-data',
            title: 'Error !',
            message: 'Invalid Credentials. Please try again.',
            autoClose: 2200,
            withCloseButton: false,
            color: 'red',
            icon: <FaExclamation />,
            sx: { borderRadius: em(8) },
          });
        }
        if (err.response?.data?.code === 'GR0008') {
          notifications.update({
            id: 'load-data',
            title: 'Error !',
            message: 'User not found. Please create an account first.',
            autoClose: 2200,
            withCloseButton: false,
            color: 'red',
            icon: <FaExclamation />,
            sx: { borderRadius: em(8) },
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {state.loginStep === 2 && isValidEmail(loginForm.values.emailPhoneGreenieId) && (
        <Box>
          <PasswordInput
            label="Enter Password"
            classNames={inputClasses}
            {...loginForm.getInputProps('password')}
          />
          <Flex direction={'row'} align={'center'} justify={'space-between'} mt={'6px'}>
            <Text className="loginLink" onClick={handleLoginWithPhoneNo}>
              Login using Phone Number
            </Text>
            <Text className="loginLink" onClick={handleForgotPassowrd}>
              Forgot password?
            </Text>
          </Flex>
          <Button type="submit" className="primaryBtn" onClick={handleEmailLogin}>
            Login
          </Button>
          <Divider label="Or better yet" className="divider" labelPosition="center" />
          <GoogleButton />
        </Box>
      )}

      {state.loginStep === 2 && isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
        <Box>
          <Flex
            direction={'row'}
            className="tabTopBox"
            onClick={() => dispatch({ type: 'PREVLOGINSTEP' })}
          >
            <BsArrowLeft size={'15px'} />
            <Text className="tabHeading">Login using OTP</Text>
          </Flex>
          <Text className="disbledInput">
            {loginForm.values.emailPhoneGreenieId}
            <span className="changeBtn" onClick={handleChangeButton}>
              Change
            </span>
          </Text>
          <Text className="profileTextBold">
            A one-time passowrd (OTP) will be sent to your registered phone number for verification
          </Text>
          <Button type="submit" onClick={sendLoginOTP} className="primaryBtn">
            Send OTP
          </Button>
        </Box>
      )}
    </>
  );
};

export default LoginStepTwo;

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
