import { TextInput, createStyles, em, rem, Text, Button, Box, Flex } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import { BsArrowLeft, BsCheckLg } from 'react-icons/bs';
import '../../styles/global.scss';
import { notifications } from '@mantine/notifications';
import { authApiList } from '../../../../assets/api/ApiList';
import axios from 'axios';
import { FaExclamation } from 'react-icons/fa';
import { useState } from 'react';

const ForgotPassword = () => {
  const { classes: inputClasses } = inputStyles();
  const { loginForm, state, dispatch, isPhoneNumber, isValidEmail } = useAuthContext();
  const [validateOTPId, setValidateOTP] = useState<string>('');

  const token = localStorage.getItem('auth-tokens');
  const authTokens = token ? JSON.parse(token) : null;

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

  const handleRequestOTP = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!loginForm.validateField('emailPhoneGreenieId').hasError) {
      try {
        notifications.show({
          id: 'load-data',
          title: 'Sending OTP...',
          message: 'Please wait while we send OTP to your email.',
          loading: true,
          autoClose: false,
          withCloseButton: false,
          sx: { borderRadius: em(8) },
        });

        const res = await axios.post(
          authApiList.forgotpasswordOtp,
          {
            email: loginForm.values.emailPhoneGreenieId,
          },
          {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          }
        );
        if (res.data) {
          console.log(res.data);
          notifications.update({
            id: 'load-data',
            title: 'Success!',
            message: 'OTP Sent to your email',
            autoClose: 2200,
            withCloseButton: false,
            color: 'teal',
            icon: <BsCheckLg />,
            sx: { borderRadius: em(8) },
          });
          setValidateOTP(res.data.validationId);
          dispatch({ type: 'NEXTRESETPASSWRDSTEP' });
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const verifyOTP = async () => {
    if (!loginForm.validateField('otp').hasError) {
      try {
        notifications.show({
          id: 'load-data',
          title: 'Verifying OTP...',
          message: 'Please wait while we verify your OTP.',
          loading: true,
          autoClose: false,
          withCloseButton: false,
          sx: { borderRadius: em(8) },
        });
        const res = await axios.post(authApiList.forgotpasswordValidate, {
          validationId: validateOTPId,
          otp: loginForm.values.otp,
          newPassword: loginForm.values.password,
        });
        if (res.data) {
          notifications.update({
            id: 'load-data',
            title: 'Success!',
            message: 'Verified your OTP',
            autoClose: 2200,
            withCloseButton: false,
            color: 'teal',
            icon: <BsCheckLg />,
            sx: { borderRadius: em(8) },
          });
          dispatch({ type: 'RESETRESETPASSWORDSTEP' });
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <Box className="authRightContainer">
      {state.resetPasswordStep < 3 && (
        <Flex direction={'row'} className="tabTopBox" onClick={handleClick}>
          <BsArrowLeft size={'15px'} />
          <Text className="tabHeading">
            {state.resetPasswordStep === 1 ? 'Back to Login' : 'Change Email ID'}
          </Text>
        </Flex>
      )}
      {state.resetPasswordStep === 1 && (
        <Box>
          <Text className="profileTextBold">Help us identify your Greenie account for you.</Text>
          <TextInput
            label="Email or greenie ID"
            {...loginForm.getInputProps('emailPhoneGreenieId')}
            classNames={inputClasses}
          />
          <Button type="submit" className="primaryBtn" onClick={handleNextStep}>
            Continue
          </Button>
        </Box>
      )}

      {state.resetPasswordStep === 2 && (
        <Box>
          <Text
            className="disbledInput"
            style={{ border: '1px solid #D1D4DB', borderRadius: '2px', background: '#FFFFFF' }}
          >
            {loginForm.values.emailPhoneGreenieId}
            <span className="changeBtn" onClick={() => dispatch({ type: 'PREVRESETPASSWORDSTEP' })}>
              Change
            </span>
          </Text>
          {!isValidEmail(loginForm.values.emailPhoneGreenieId) &&
            !isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
              <Text className="profileTextBold">
                A one-time passowrd (OTP) will be sent to your registered phone number for
                verification
              </Text>
            )}
          {isValidEmail(loginForm.values.emailPhoneGreenieId) && (
            <Text className="profileTextBold">
              A one-time passowrd (OTP) will be sent to your registered email address for
              verification
            </Text>
          )}
          {isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
            <Text className="profileTextBold">
              A one-time passowrd (OTP) will be sent to your registered phone number for
              verification
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
            <Text className="profileTextBold">
              Enter the one-time passowrd sent to your email address
            </Text>
          )}
          <TextInput
            classNames={inputClasses}
            maxLength={6}
            label=""
            pattern="[0-9]{6}"
            {...loginForm.getInputProps('otp')}
          />
          <Text className="profileTextBold">Enter new password</Text>
          <TextInput classNames={inputClasses} {...loginForm.getInputProps('password')} />
          <Text fw={'light'} fz={'xs'} my={'md'}>
            Resend
            <Text fw={'600'} span>
              after 30s
            </Text>
          </Text>
          <Button
            type="submit"
            className="primaryBtn"
            fullWidth
            radius="xl"
            color="teal"
            onClick={verifyOTP}
          >
            Reset
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
    marginBottom: '8px',
    marginTop: '8px',
  },

  input: {
    width: '458px',
    height: '68px',
    fontSize: '18px',
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
}));
