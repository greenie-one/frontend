import { useEffect, useState } from 'react';
import { TextInput, createStyles, em, Text, Button, Flex, Box } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { useAuthContext } from '../../context/AuthContext';
import { authApiList } from '../../../../assets/api/ApiList';

import { BsArrowLeft } from 'react-icons/bs';
import '../../styles/global.scss';
import { useGlobalContext } from '../../../../context/GlobalContext';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';
import { HttpClient, Result } from '../../../../utils/generic/httpClient';

const SignUpStepThree = () => {
  const { signupForm, state, dispatch, isPhoneNumber, isValidEmail, validationId, resendOtp, setForceRender } =
    useAuthContext();
  const { classes: inputClasses } = inputStyles();
  const { signUpStep } = state;
  const { authClient } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
    }, 1000);

    if (secondsRemaining === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const VerifyOTP = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isLoading) {
      return Promise.resolve(null);
    }

    if (signUpStep === 3 && !signupForm.validateField('otp').hasError) {
      setIsLoading(true);
      signupForm.clearErrors();
      showLoadingNotification({ title: 'Creating your account', message: 'Please wait while we create your account.' });

      const res: Result<any> = await HttpClient.callApi({
        url: `${authApiList.validateOtp}`,
        method: 'POST',
        body: { validationId, otp: signupForm.values.otp },
      });
      if (res.ok) {
        authClient.setTokens(res.value.accessToken, res.value.refreshToken);
        dispatch({ type: 'NEXTSIGNUPSTEP' });
        setForceRender((prev) => !prev);
        showSuccessNotification({ title: 'Success !', message: 'Your account has been successfully created.' });
      } else {
        showErrorNotification(res.error.code);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      {(signUpStep === 3 && isValidEmail(signupForm.values.emailPhone) && (
        <Box>
          <Flex className="tabTopBox" onClick={() => dispatch({ type: 'PREVSIGNUPSTEP' })}>
            <BsArrowLeft size={'15px'} />
            <Text className="tabHeading">Change Password</Text>
          </Flex>
          <Text className="profileTextBold">Enter the one-time password sent to your email address</Text>
          <TextInput classNames={inputClasses} maxLength={6} pattern="[0-9]{6}" {...signupForm.getInputProps('otp')} />

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

          <Button type="submit" className="primaryBtn" onClick={VerifyOTP}>
            Verify
          </Button>
        </Box>
      )) ||
        (signUpStep === 3 && isPhoneNumber(signupForm.values.emailPhone) && (
          <Box>
            <Flex className="tabTopBox" onClick={() => dispatch({ type: 'PREVSIGNUPSTEP' })}>
              <BsArrowLeft size={'15px'} />
              <Text className="tabHeading">Login with phone number</Text>
            </Flex>
            <Text className="profileTextBold">Enter the one-time password sent to your phone number</Text>
            <TextInput
              classNames={inputClasses}
              maxLength={6}
              pattern="[0-9]{6}"
              {...signupForm.getInputProps('otp')}
            />

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

            <Button type="submit" className="primaryBtn" onClick={VerifyOTP}>
              Verify
            </Button>
          </Box>
        ))}
    </>
  );
};

export default SignUpStepThree;

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
      fontSize: '14px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },
}));
