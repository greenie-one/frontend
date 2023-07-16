import { useState, useEffect } from 'react';
import { TextInput, Text, Button, Box, Flex, PasswordInput } from '@mantine/core';

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

const ForgotPassword = () => {
  const { OtpInputStyles, inputStyles } = useGlobalContext();
  const { loginForm, state, dispatch, isPhoneNumber, isValidEmail } = useAuthContext();

  const { classes: inputClasses } = inputStyles();
  const { classes: otpInputClasses } = OtpInputStyles();

  const [validateOTPId, setValidateOTP] = useState<string>('');
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

  const handleClick = () => {
    if (state.resetPasswordStep === 1) {
      dispatch({ type: 'PREVRESETPASSWORDSTEP' });
      dispatch({ type: 'RESETLOGINSTEP' });
    } else {
      dispatch({ type: 'PREVRESETPASSWORDSTEP' });
    }
  };

  const handleNextStep = () => {
    if (!loginForm.validateField('emailPhoneGreenieId').hasError) {
      dispatch({ type: 'NEXTRESETPASSWORDSTEP' });
    }
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginForm.validateField('emailPhoneGreenieId').hasError) {
      showLoadingNotification({
        title: 'Sending OTP...',
        message: 'Please wait while we send OTP to your email.',
      });

      const reqestBody: ForgotPasswordBody = {
        email: loginForm.values.emailPhoneGreenieId,
      };
      const res = await HttpClient.callApi<ForgotPasswordResponse>({
        url: `${authApiList.forgotpasswordOtp}`,
        method: 'POST',
        body: reqestBody,
      });

      if (res.ok) {
        showSuccessNotification({
          title: 'Success !',
          message: 'An OTP has been sent to your email.',
        });

        setValidateOTP(res.value.validationId);
        dispatch({ type: 'NEXTRESETPASSWORDSTEP' });
      } else {
        showErrorNotification(res.error.code);
      }
    }
  };

  const handleResendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginForm.validateField('emailPhoneGreenieId').hasError) {
      showLoadingNotification({
        title: 'Sending OTP...',
        message: 'Please wait while we send OTP to your email.',
      });

      const res = await HttpClient.callApi<ForgotPasswordResponse>({
        url: `${authApiList.forgotpasswordOtp}`,
        method: 'POST',
        body: { email: loginForm.values.emailPhoneGreenieId },
      });

      if (res.ok) {
        showSuccessNotification({
          title: 'Success !',
          message: 'An OTP has been sent to your email.',
        });
        setValidateOTP(res.value.validationId);
      } else {
        showErrorNotification(res.error.code);
      }
    }
  };

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginForm.validateField('otp').hasError) {
      showLoadingNotification({
        title: 'Verifying OTP...',
        message: 'Please wait while we verify your OTP.',
      });

      const res = await HttpClient.callApi({
        url: `${authApiList.forgotpasswordValidate}`,
        method: 'POST',
        body: {
          validationId: validateOTPId,
          otp: loginForm.values.otp,
          newPassword: loginForm.values.password,
        },
      });

      if (res.ok) {
        showSuccessNotification({
          title: 'Success !',
          message: 'OTP has been verified successfully.',
        });

        dispatch({ type: 'RESETLOGINSTEP' });
        dispatch({ type: 'RESETRESETPASSWORDSTEP' });
      } else {
        showErrorNotification(res.error.code);
      }
    }
  };

  return (
    <Box className="authRightContainer">
      <Flex direction={'row'} className="tabTopBox" onClick={handleClick}>
        <BsArrowLeft size={'15px'} />
        {state.resetPasswordStep === 1 && <Text className="tabHeading">Back to Login</Text>}
        {state.resetPasswordStep === 2 && <Text className="tabHeading">Change Email ID</Text>}
        {state.resetPasswordStep === 3 && <Text className="tabHeading">Set New Password</Text>}
      </Flex>

      {state.resetPasswordStep === 1 && (
        <Box>
          <Text className="profileTextBold">Help us identify your Greenie account for you.</Text>
          <TextInput
            label="Email or greenie ID"
            {...loginForm.getInputProps('emailPhoneGreenieId')}
            className="inputClass"
            my={'1.5rem'}
          />
          <Button type="submit" className="primaryBtn" onClick={handleNextStep}>
            Continue
          </Button>
        </Box>
      )}

      {state.resetPasswordStep === 2 && (
        <Box>
          <Text className="disabledInput">
            {loginForm.values.emailPhoneGreenieId}
            <span className="changeBtn" onClick={() => dispatch({ type: 'PREVRESETPASSWORDSTEP' })}>
              Change
            </span>
          </Text>
          {!isValidEmail(loginForm.values.emailPhoneGreenieId) &&
            !isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
              <Text className="profileTextBold">
                A one-time passowrd (OTP) will be sent to your registered phone number for verification
              </Text>
            )}
          {isValidEmail(loginForm.values.emailPhoneGreenieId) && (
            <Text className="profileTextBold" mb={'2rem'}>
              A one-time passowrd (OTP) will be sent to your registered email address for verification
            </Text>
          )}
          {isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
            <Text className="profileTextBold" mb={'2rem'}>
              A one-time passowrd (OTP) will be sent to your registered phone number for verification
            </Text>
          )}
          <Button type="submit" className="primaryBtn" onClick={handleRequestOTP}>
            Send OTP
          </Button>
        </Box>
      )}

      {state.resetPasswordStep === 3 && (
        <Box>
          {isValidEmail(loginForm.values.emailPhoneGreenieId) && (
            <Text className="profileTextBold">Enter the one-time passowrd sent to your email address</Text>
          )}
          <TextInput
            classNames={otpInputClasses}
            maxLength={6}
            pattern="[0-9]{6}"
            {...loginForm.getInputProps('otp')}
          />
          <Text className="profileTextBold">Enter new password</Text>
          <PasswordInput
            classNames={inputClasses}
            {...loginForm.getInputProps('password')}
            label="Enter new password"
          />

          {secondsRemaining === 0 ? (
            <Button compact color="gray" variant="subtle" onClick={handleResendOTP} className="resendLink">
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
          <Button type="submit" className="primaryBtn" fullWidth radius="xl" color="teal" onClick={verifyOTP}>
            Verify OTP
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ForgotPassword;
