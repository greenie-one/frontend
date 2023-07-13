import { useEffect, useState } from 'react';
import { Text, Button, Flex, Box, TextInput } from '@mantine/core';

import { useGlobalContext } from '../../../../context/GlobalContext';
import { useAuthContext } from '../../context/AuthContext';

import { HttpClient } from '../../../../utils/generic/httpClient';
import { authApiList } from '../../../../assets/api/ApiList';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';

import { BsArrowLeft } from 'react-icons/bs';
import '../../styles/global.scss';

const LoginStepThree = () => {
  const { authClient } = useGlobalContext();
  const { loginForm, state, dispatch, isPhoneNumber, validationId, resendOtp, setForceRender } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
    }, 1000);

    if (secondsRemaining === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const handleMobileLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) {
      return Promise.resolve(null);
    }

    if (!loginForm.validateField('otp').hasError) {
      showLoadingNotification({
        title: 'Loading...',
        message: 'Please wait while we log you in...',
      });

      const requestBody: ValidateOtpBody = {
        validationId,
        otp: loginForm.values.otp as string,
      };
      const res = await HttpClient.callApi<AuthTokens>({
        url: `${authApiList.validateOtp}`,
        method: 'POST',
        body: requestBody,
      });

      if (res.ok) {
        authClient.setTokens(res.value.accessToken, res.value.refreshToken);
        showSuccessNotification({
          title: 'Success !',
          message: 'You have been logged in successfully.',
        });

        setForceRender((prev) => !prev);
        // navigate('/profile');
      } else {
        showErrorNotification(res.error.code);
      }
      loginForm.setFieldValue('otp', '');
      setIsLoading(false);
    }
  };

  return (
    <>
      {state.loginStep === 3 && isPhoneNumber(loginForm.values.emailPhoneGreenieId) && state.resetPasswordStep < 1 && (
        <Box>
          <Flex direction={'row'} className="tabTopBox" onClick={() => dispatch({ type: 'PREVLOGINSTEP' })}>
            <BsArrowLeft size={'15px'} />
            <Text className="tabHeading">Login using OTP</Text>
          </Flex>
          <Text className="profileTextBold">Enter the one-time passowrd sent to your phone number</Text>
          <TextInput className="inputClass" maxLength={6} pattern="[0-9]{6}" {...loginForm.getInputProps('otp')} />

          {secondsRemaining === 0 ? (
            <Button compact color="gray" variant="subtle" onClick={resendOtp} className="resendLink">
              Resend
            </Button>
          ) : (
            <Text fw={'light'} fz={'xs'} my={'md'}>
              Resend{' '}
              <Text fw={'600'} span>
                after {secondsRemaining}s
              </Text>
            </Text>
          )}

          <Button type="submit" className="primaryBtn" onClick={handleMobileLogin}>
            Verify & Login
          </Button>
        </Box>
      )}
    </>
  );
};

export default LoginStepThree;
