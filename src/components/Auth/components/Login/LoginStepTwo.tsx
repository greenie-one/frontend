import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createStyles, rem, Text, Button, Divider, PasswordInput, Flex, Box, em } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import { authApiList } from '../../../../assets/api/ApiList';
import { useProfileContext } from '../../../Profile/context/ProfileContext';
import GoogleButton from '../Google/GoogleButton';
import { BsArrowLeft } from 'react-icons/bs';
import '../../styles/global.scss';

import { useGlobalContext } from '../../../../context/GlobalContext';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';
import { HttpClient, Result } from '../../../../utils/generic/httpClient';

const LoginStepTwo = () => {
  const navigate = useNavigate();
  const { classes: inputClasses } = inputStyles();
  const { loginForm, state, dispatch, isValidEmail, isPhoneNumber, setValidationId, setForceRender } = useAuthContext();
  const { authClient } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const {} = useProfileContext();

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
      showLoadingNotification({
        title: 'Loading...',
        message: 'Please wait while we log you in...',
      });
      const res: Result<any> = await HttpClient.callApi({
        url: `${authApiList.login}`,
        method: 'POST',
        body: { email: loginForm.values.emailPhoneGreenieId, password: loginForm.values.password },
      });
      if (res.ok) {
        setValidationId(res.value.validationId);
        const resp = await HttpClient.callApi({
          url: `${authApiList.validateOtp}`,
          method: 'POST',
          body: { validationId: res.value.validationId, otp: '123456' },
        });
        if (resp.ok) {
          showSuccessNotification({
            title: 'Success !',
            message: 'You have been logged in successfully.',
          });
          authClient.setTokens(resp.value.accessToken, resp.value.refreshToken);
          setForceRender((prev) => !prev);
          navigate('/profile');
          loginForm.setFieldValue('password', '');
          dispatch({ type: 'PREVLOGINSTEP' });
        } else {
          showErrorNotification(resp.error.code);
          dispatch({ type: 'PREVLOGINSTEP' });
          loginForm.setFieldValue('password', '');
        }
      } else {
        showErrorNotification(res.error.code);
      }
      setIsLoading(false);
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
      showLoadingNotification({ title: 'Sending...', message: 'Please wait while we send you an OTP.' });
      const res = await HttpClient.callApi({
        url: `${authApiList.login}`,
        method: 'POST',
        body: { mobileNumber: `${loginForm.values.emailPhoneGreenieId}` },
      });
      if (res.ok) {
        setValidationId(res.value);
        showSuccessNotification({
          title: 'Success !',
          message: 'An OTP has been sent to your mobile number.',
        });
        dispatch({ type: 'NEXTLOGINSTEP' });
      } else {
        showErrorNotification(res.error.code);
      }
    }
  };

  return (
    <>
      {state.loginStep === 2 && isValidEmail(loginForm.values.emailPhoneGreenieId) && (
        <Box>
          <PasswordInput label="Enter Password" classNames={inputClasses} {...loginForm.getInputProps('password')} />
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
          <Flex direction={'row'} className="tabTopBox" onClick={() => dispatch({ type: 'PREVLOGINSTEP' })}>
            <BsArrowLeft size={'15px'} />
            <Text className="tabHeading">Login using OTP</Text>
          </Flex>
          <Text className="disabledInput">
            {loginForm.values.emailPhoneGreenieId}
            <Button unstyled className="changeBtn" onClick={handleChangeButton}>
              Change
            </Button>
          </Text>
          <Text className="profileTextBold" mb={'2rem'}>
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
