import { TextInput, createStyles, rem, Text, Button, Box, Flex } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import { BsArrowLeft } from 'react-icons/bs';
import '../../styles/InputStyles.scss';

const LoginWithOTP = () => {
  const { classes: inputClasses } = inputStyles();
  const {
    loginSteps,
    loginWithOTPSteps,
    nextLoginWithOTPStep,
    prevLoginWithOTPStep,
    nextLoginStep,
    prevLoginStep,
    inputValue,
    setInputValue,
    isEmail,
    isPhoneNumber,
    setLoginSteps,
  } = useAuthContext();

  const handleClick = () => {
    prevLoginWithOTPStep();
    setLoginSteps(1);
    setInputValue('');
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
            {inputValue}
            <span className="changeBtn" onClick={handleClick}>
              Change
            </span>
          </Text>
          {!isEmail(inputValue) && !isPhoneNumber(inputValue) && (
            <Text fw={'bold'} fz={'xs'} my={'lg'}>
              A one-time passowrd (OTP) will be sent to your registered phone number for
              verification
            </Text>
          )}
          {isEmail(inputValue) && (
            <Text fw={'bold'} fz={'xs'} my={'lg'}>
              A one-time passowrd (OTP) will be sent to your registered email address for
              verification
            </Text>
          )}
          {isPhoneNumber(inputValue) && (
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
    marginBottom: rem(16),
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  // for password field
  innerInput: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
    color: '#4C4C4C',
  },

  Button: {
    margin: '2rem 0',
  },
}));
