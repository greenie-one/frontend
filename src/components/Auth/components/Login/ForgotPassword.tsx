import { TextInput, createStyles, em, rem, Text, Button, Box, Flex } from '@mantine/core';

import { useAuthContext } from '../../context/AuthContext';
import { BsArrowLeft } from 'react-icons/bs';
import '../../styles/global.scss';

const ForgotPassword = () => {
  const { classes: inputClasses } = inputStyles();
  const { loginForm, state, dispatch, isPhoneNumber, isValidEmail } = useAuthContext();

  const handleClick = () => {
    dispatch({ type: 'PREVRESETPASSWORDSTEP' });
    dispatch({ type: 'RESETLOGINSTEP' });
  };

  const handleChange = () => {
    dispatch({ type: 'PREVRESETPASSWORDSTEP' });
  };

  const handleNextStep = () => {
    dispatch({ type: 'NEXTRESETPASSWRDSTEP' });
  };

  return (
    <Box className="authRightContainer">
      <Flex direction={'row'} className="tabTopBox" onClick={handleClick}>
        <BsArrowLeft size={'15px'} />
        <Text className="tabHeading">
          {state.resetPasswordStep === 1 ? 'Forgot Password' : 'Reset Passowrd'}
        </Text>
      </Flex>
      {state.resetPasswordStep === 1 && (
        <Box>
          <Text className="profileTextBold">Help us identify your Greenie account for you.</Text>
          <TextInput
            label="Email or Phone number or greenie ID"
            {...loginForm.getInputProps('emailPhoneGreenieId')}
            classNames={inputClasses}
          />
          <Button className="primaryBtn" onClick={handleNextStep}>
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
          <Button className="primaryBtn" onClick={handleNextStep}>
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
          {isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
            <Text className="profileTextBold">
              Enter the one-time passowrd sent to your phone number
            </Text>
          )}
          {!isValidEmail(loginForm.values.emailPhoneGreenieId) &&
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

export default ForgotPassword;

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: '16px',
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
      width: '310px',
      height: '46px',
      borderRadius: '6px',
      fontSize: '10px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },

  // for password field
  innerInput: {
    height: rem(54),
    paddingTop: rem(18),
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
      fontSize: '8px',
      lineHeight: '10px',
    },
  },
}));
