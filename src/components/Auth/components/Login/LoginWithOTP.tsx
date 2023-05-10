import { Text, Button, Box, Flex } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import { BsArrowLeft } from 'react-icons/bs';
import '../../styles/global.scss';

const LoginWithOTP = () => {
  const { state, dispatch, isPhoneNumber, loginForm, isEmail } = useAuthContext();

  const handleClick = () => {
    dispatch({ type: 'PREVLOGINWITHOTPSTEP' });
    dispatch({ type: 'RESETLOGINSTEP' });
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
          {!isEmail(loginForm.values.emailPhoneGreenieId) &&
            !isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
              <Text className="profileTextBold">
                A one-time passowrd (OTP) will be sent to your registered phone number for
                verification
              </Text>
            )}
          {isEmail(loginForm.values.emailPhoneGreenieId) && (
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
          <Button onClick={() => dispatch({ type: 'NEXTLOGINWITHOTPSTEP' })} className="primaryBtn">
            Send OTP
          </Button>
        </Box>
      )}
      {state.loginWithOTPStep == 2 && (
        <Box>
          {isEmail(loginForm.values.emailPhoneGreenieId) && (
            <Text className="profileTextBold">
              Enter the one-time passowrd sent to your email address
            </Text>
          )}
          {isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
            <Text className="profileTextBold">
              Enter the one-time passowrd sent to your phone number
            </Text>
          )}
          {!isEmail(loginForm.values.emailPhoneGreenieId) &&
            !isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
              <Text className="profileTextBold">
                Enter the one-time passowrd sent to your phone number
              </Text>
            )}
          <input className="otpInput" maxLength={4} type="text" pattern="[0-9]{4}" />
          <Text fw={'light'} fz={'xs'} my={'md'}>
            Resend{' '}
            <Text fw={'600'} span>
              after 30s
            </Text>
          </Text>
          <Button fullWidth radius="xl" color="teal">
            Verify
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LoginWithOTP;
