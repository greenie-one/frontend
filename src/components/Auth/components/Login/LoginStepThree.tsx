import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Text, Button, Flex, Box, TextInput, createStyles, em } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useAuthContext } from '../../context/AuthContext';
import { authApiList } from '../../../../assets/api/ApiList';

import { FaExclamation } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import { BsCheckLg } from 'react-icons/bs';
import '../../styles/global.scss';

const LoginStepThree = () => {
  const navigate = useNavigate();
  const { loginForm, state, dispatch, isPhoneNumber, validationId, resendOtp, setForceRender } = useAuthContext();
  const { classes: inputClasses } = inputStyles();

  const [authTokens, setAuthTokens] = useLocalStorage({ key: 'auth-tokens' });
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const [isLoading, setIsLoading] = useState(false);

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

        const res = await axios.post(authApiList.validateOtp, {
          validationId,
          otp: loginForm.values.otp,
        });

        if (res.data) {
          setAuthTokens(res.data);

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

          setForceRender((prev) => !prev);
        }
      } catch (err: any) {
        loginForm.setFieldValue('otp', '');

        if (err.response?.data?.code === 'GR0004') {
          notifications.update({
            id: 'load-data',
            title: 'Error !',
            message: 'Invalid OTP. Please try again.',
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
