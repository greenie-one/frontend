import { useState, useEffect } from 'react';
import { TextInput, createStyles, em, rem, Text, Button, Box, Flex, PasswordInput } from '@mantine/core';

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
  const { OtpInputStyles } = useGlobalContext();
  const { loginForm, state, dispatch, isPhoneNumber, isValidEmail, secondsRemaining } = useAuthContext();

  const { classes: inputClasses } = inputStyles();
  const { classes: otpInputClasses } = OtpInputStyles();

  const [validateOTPId, setValidateOTP] = useState<string>('');

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
      dispatch({ type: 'NEXTRESETPASSWRDSTEP' });
    }
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginForm.validateField('emailPhoneGreenieId').hasError) {
      showLoadingNotification({
        title: 'Sending OTP...',
        message: 'Please wait while we send OTP to your email.',
      });

      const reqestBody: ForgotPasswordBody = { email: loginForm.values.emailPhoneGreenieId };
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
        dispatch({ type: 'NEXTRESETPASSWRDSTEP' });
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
        body: { validationId: validateOTPId, otp: loginForm.values.otp, newPassword: loginForm.values.password },
      });

      if (res.ok) {
        showSuccessNotification({
          title: 'Success !',
          message: 'OTP has been verified successfully.',
        });

        dispatch({ type: 'NEXTRESETPASSWRDSTEP' });
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

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginBlock: '24px',
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
