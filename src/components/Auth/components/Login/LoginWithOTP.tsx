import { Text, Button, Box, Flex, em, TextInput, createStyles } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';

import { BsArrowLeft } from 'react-icons/bs';
import '../../styles/global.scss';

const LoginWithOTP = () => {
  const { state, dispatch, isPhoneNumber, loginForm, isValidEmail } = useAuthContext();
  const { classes: inputClasses } = inputStyles();

  const handleClick = () => {
    if (state.loginWithOTPStep === 2) {
      dispatch({ type: 'PREVLOGINWITHOTPSTEP' });
    }
    if (state.loginWithOTPStep === 1) {
      dispatch({ type: 'PREVLOGINWITHOTPSTEP' });
      dispatch({ type: 'RESETLOGINSTEP' });
    }
  };

  return (
    <Box className="authRightContainer">
      <Flex direction={'row'} className="tabTopBox" onClick={handleClick}>
        <BsArrowLeft size={'15px'} />
        <Text className="tabHeading">Login using OTP</Text>
      </Flex>
      {state.loginWithOTPStep === 1 && (
        <Box>
          <Text className="disbledInput">
            {loginForm.values.emailPhoneGreenieId}
            <span className="changeBtn" onClick={handleClick}>
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
          <Button
            type="submit"
            onClick={() => dispatch({ type: 'NEXTLOGINWITHOTPSTEP' })}
            className="primaryBtn"
          >
            Send OTP
          </Button>
        </Box>
      )}
      {state.loginWithOTPStep == 2 && (
        <Box>
          {isValidEmail(loginForm.values.emailPhoneGreenieId) && (
            <Text className="profileTextBold">
              Enter the one-time passowrd sent to your email address
            </Text>
          )}
          {!isValidEmail(loginForm.values.emailPhoneGreenieId) &&
            !isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
              <Text className="profileTextBold">
                Enter the one-time passowrd sent to your phone number
              </Text>
            )}
          <TextInput
            classNames={inputClasses}
            maxLength={6}
            pattern="[0-9]{4}"
            {...loginForm.getInputProps('otp')}
          />
          <Text fw={'light'} fz={'xs'} my={'md'}>
            Resend
            <Text fw={'600'} span>
              after 30s
            </Text>
          </Text>
          <Button type="submit" className="primaryBtn">
            Verify
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LoginWithOTP;

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
