import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../../context/GlobalContext';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';
import { HttpClient, Result } from '../../../../utils/generic/httpClient';

import { Text, Button, Flex, Box, TextInput, createStyles, em } from '@mantine/core';

import { useAuthContext } from '../../context/AuthContext';
import { authApiList } from '../../../../assets/api/ApiList';

import { BsArrowLeft } from 'react-icons/bs';
import '../../styles/global.scss';

const LoginStepThree = () => {
  const navigate = useNavigate();
  const { loginForm, state, dispatch, isPhoneNumber, validationId, resendOtp, setForceRender } = useAuthContext();
  const { classes: inputClasses } = inputStyles();
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const [isLoading, setIsLoading] = useState(false);
  const { authClient } = useGlobalContext();

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
    }, 1000);

    if (secondsRemaining === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const handleMobileLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isLoading) {
      return Promise.resolve(null);
    }

    if (!loginForm.validateField('otp').hasError) {
      showLoadingNotification({
        title: 'Loading...',
        message: 'Please wait while we log you in...',
      });

      const res: Result<any> = await HttpClient.callApi({
        url: `${authApiList.validateOtp}`,
        method: 'POST',
        body: { validationId, otp: loginForm.values.otp },
      });
      if (res.ok) {
        authClient.setTokens(res.value.accessToken, res.value.refreshToken);
        showSuccessNotification({
          title: 'Success !',
          message: 'You have been logged in successfully.',
        });
        setForceRender((prev) => !prev);
        navigate('/profile');
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
          <TextInput classNames={inputClasses} maxLength={6} pattern="[0-9]{6}" {...loginForm.getInputProps('otp')} />

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

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: '24px',
    marginTop: '24px',
  },

  input: {
    width: '458px',
    height: '68px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid #D1D4DB',
    lineHeight: '19px',
    letterSpacing: '24px',
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      width: '350px',
      height: '46px',
      borderRadius: '6px',
      fontSize: '12px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },
}));
