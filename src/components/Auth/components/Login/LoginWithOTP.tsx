import { TextInput, em, createStyles, rem, Text, Button, Box, Flex } from '@mantine/core';
import { isEmail } from '@mantine/form';
import { useAuthContext } from '../../context/AuthContext';
import { BsArrowLeft } from 'react-icons/bs';
import '../../styles/InputStyles.scss';

const LoginWithOTP = () => {
  const { classes: inputClasses } = inputStyles();
  const {
    loginForm,
    loginSteps,
    loginWithOTPSteps,
    nextLoginWithOTPStep,
    prevLoginWithOTPStep,
    nextLoginStep,
    prevLoginStep,
    isPhoneNumber,
    setLoginSteps,
  } = useAuthContext();

  const handleClick = () => {
    prevLoginWithOTPStep();
    setLoginSteps(1);
  };

  return (
    <Box className="authRightContainer">
      <Flex direction={'row'} align={'center'} mb={'sm'} onClick={handleClick}>
        <BsArrowLeft size={'15px'} />
        <Text fw={'bold'} fz={'xs'} ml={'xs'} style={{ cursor: 'pointer' }}>
          Login using OTP
        </Text>
      </Flex>
      {loginWithOTPSteps === 1 && (
        <Box>
          <Text
            fz={'sm'}
            mb={'md'}
            color="4C4C4C"
            className="disbledInput"
            p={'sm'}
            style={{ border: '1px solid #D1D4DB', borderRadius: '2px', background: '#FFFFFF' }}
          >
            {loginForm.values.emailPhoneGreenieId}
            <span className="changeBtn" onClick={handleClick}>
              Change
            </span>
          </Text>
          {!isEmail(loginForm.values.emailPhoneGreenieId) &&
            !isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
              <Text fw={'bold'} fz={'xs'} my={'lg'}>
                A one-time passowrd (OTP) will be sent to your registered phone number for
                verification
              </Text>
            )}
          {isEmail(loginForm.values.emailPhoneGreenieId) && (
            <Text fw={'bold'} fz={'xs'} my={'lg'}>
              A one-time passowrd (OTP) will be sent to your registered email address for
              verification
            </Text>
          )}
          {isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
            <Text fw={'bold'} fz={'xs'} my={'lg'}>
              A one-time passowrd (OTP) will be sent to your registered phone number for
              verification
            </Text>
          )}
          <Button fullWidth radius="xl" color="teal" style={{ margin: '1rem 0' }}>
            Send OTP
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
