import { TextInput, createStyles, em, rem, Text, Button, Box, Flex } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import ForgotPassowrdStepThree from './ForgotPassowrdStepThree';
import { BsArrowLeft, BsCheckLg } from 'react-icons/bs';
import '../../styles/global.scss';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { authApiList } from '../../../../assets/api/ApiList';

const ForgotPassword = () => {
  const { classes: inputClasses } = inputStyles();
  const { loginForm, state, dispatch, isPhoneNumber, isValidEmail } = useAuthContext();

  const handleClick = () => {
    if (state.resetPasswordStep === 1) {
      dispatch({ type: 'PREVRESETPASSWORDSTEP' });
      dispatch({ type: 'RESETLOGINSTEP' });
    } else {
      dispatch({ type: 'PREVRESETPASSWORDSTEP' });
    }
  };

  const handleChange = () => {
    dispatch({ type: 'PREVRESETPASSWORDSTEP' });
  };

  const handleNextStep = () => {
    if (!loginForm.validateField('emailPhoneGreenieId').hasError) {
      dispatch({ type: 'NEXTRESETPASSWRDSTEP' });
    }
  };

  const token = localStorage.getItem('auth-tokens');
  const authTokens = token ? JSON.parse(token) : null;

  const handleRequestOTP = async () => {
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
          authApiList.forgetPassowordOTP,
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
        const res = await axios.post(
          'api endpoint',
          {},
          {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          }
        );
        if (res.data) {
          notifications.update({
            id: 'load-data',
            title: 'Success!',
            message: 'OTP verified successfully',
            autoClose: 2200,
            withCloseButton: false,
            color: 'teal',
            icon: <BsCheckLg />,
            sx: { borderRadius: em(8) },
          });
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <Box className="authRightContainer">
      <Flex direction={'row'} className="tabTopBox" onClick={handleClick}>
        <BsArrowLeft size={'15px'} />
        <Text className="tabHeading">
          {state.resetPasswordStep === 1 ? 'Back to Login' : 'Change Email ID'}
        </Text>
      </Flex>
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
            <span className="changeBtn" onClick={handleChange}>
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

      {state.resetPasswordStep === 3 && <ForgotPassowrdStepThree />}
    </Box>
  );
};

export default ForgotPassword;

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
