import { TextInput, createStyles, em, rem, Text, Button, Box, Flex } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import { BsArrowLeft } from 'react-icons/bs';
import '../../styles/global.scss';

const ForgotPassword = () => {
  const { classes: inputClasses } = inputStyles();
  const {
    loginForm,
    prevLoginStep,
    resetPasswordStep,
    nextResetPasswordStep,
    prevResetPasswordStep,
    setInputValue,
    inputValue,
    isEmail,
    isPhoneNumber,
  } = useAuthContext();

  const handleClick = () => {
    prevResetPasswordStep();
    prevLoginStep();
  };

  const handleChange = () => {
    setInputValue('');
    prevResetPasswordStep();
  };

  const handleNextStep = () => {
    if (!inputValue) {
      alert('Please fill all the details');
    } else {
      nextResetPasswordStep();
    }
  };

  return (
    <Box className="authRightContainer">
      <Flex direction={'row'} align={'center'} mb={'sm'} onClick={handleClick}>
        <BsArrowLeft size={'15px'} />
        <Text fw={'bold'} fz={'xs'} ml={'xs'} style={{ cursor: 'pointer' }}>
          {resetPasswordStep === 1 ? 'Forgot Password' : 'Reset Passowrd'}
        </Text>
      </Flex>
      {resetPasswordStep === 1 && (
        <Box>
          <Text fw={'bold'} fz={'xs'} my={'lg'}>
            Help us identify your Greenie account for you.
          </Text>
          <TextInput
            label="Email or Phone number or greenie ID"
            {...loginForm.getInputProps('emailPhoneGreenieId').value}
            onChange={(e) => setInputValue(e.target.value)}
            classNames={inputClasses}
          />
          <Button
            fullWidth
            radius="xl"
            color="teal"
            style={{ margin: '1rem 0' }}
            onClick={handleNextStep}
          >
            Continue
          </Button>
        </Box>
      )}

      {resetPasswordStep === 2 && (
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
            <span className="changeBtn" onClick={handleChange}>
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
          <Button
            fullWidth
            radius="xl"
            color="teal"
            style={{ margin: '1rem 0' }}
            onClick={handleNextStep}
          >
            Send OTP
          </Button>
        </Box>
      )}

      {resetPasswordStep === 3 && (
        <Box>
          {isEmail(inputValue) && (
            <Text fw={'bold'} fz={'xs'} my={'lg'}>
              Enter the one-time passowrd sent to your email address
            </Text>
          )}
          {isPhoneNumber(inputValue) && (
            <Text fw={'bold'} fz={'xs'} my={'lg'}>
              Enter the one-time passowrd sent to your phone number
            </Text>
          )}
          {!isEmail(inputValue) && !isPhoneNumber(inputValue) && (
            <Text fw={'bold'} fz={'xs'} my={'lg'}>
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
