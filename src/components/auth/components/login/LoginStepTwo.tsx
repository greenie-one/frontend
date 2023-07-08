import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Button, Divider, PasswordInput, Flex, Box } from '@mantine/core';

import { useGlobalContext } from '../../../../context/GlobalContext';
import { useAuthContext } from '../../context/AuthContext';
import GoogleButton from '../google/GoogleButton';

import { HttpClient } from '../../../../utils/generic/httpClient';
import { authApiList } from '../../../../assets/api/ApiList';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';

import { BsArrowLeft } from 'react-icons/bs';
import '../../styles/global.scss';

const LoginStepTwo = () => {
  const { authClient, inputStyles } = useGlobalContext();
  const { loginForm, state, dispatch, isValidEmail, isPhoneNumber, setValidationId, setForceRender } = useAuthContext();

  const { classes: inputClasses } = inputStyles();
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

  const handleEmailLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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

      const requestBody: LoginRequestBody = {
        email: loginForm.values.emailPhoneGreenieId,
        password: loginForm.values.password,
      };
      const res = await HttpClient.callApi<LoginResponse>({
        url: `${authApiList.login}`,
        method: 'POST',
        body: requestBody,
      });

      if (res.ok) {
        setValidationId(res.value?.validationId);

        const requestBody: ValidateOtpBody = {
          validationId: res.value?.validationId,
          otp: loginForm.values.otp as string,
        };
        const resp = await HttpClient.callApi<AuthTokens>({
          url: `${authApiList.validateOtp}`,
          method: 'POST',
          body: requestBody,
        });

        if (resp.ok) {
          loginForm.setFieldValue('password', '');
          authClient.setTokens(resp.value.accessToken, resp.value.refreshToken);
          setForceRender((prev) => !prev);

          showSuccessNotification({
            title: 'Success !',
            message: 'You have been logged in successfully.',
          });

          // navigate('/profile');
          // dispatch({ type: 'PREVLOGINSTEP' });
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

  const sendLoginOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) {
      return Promise.resolve(null);
    }

    if (state.loginStep === 2) {
      loginForm.clearErrors();
      setIsLoading(true);

      showLoadingNotification({ title: 'Sending...', message: 'Please wait while we send you an OTP.' });

      const requestBody: LoginRequestBody = { mobileNumber: `${loginForm.values.emailPhoneGreenieId}` };
      const res = await HttpClient.callApi<LoginResponse>({
        url: `${authApiList.login}`,
        method: 'POST',
        body: requestBody,
      });

      if (res.ok) {
        setValidationId(res.value?.validationId);
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
