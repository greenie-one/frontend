import { TextInput, createStyles, rem, em, Text, Button, Flex, Box } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { useAuthContext } from '../../context/AuthContext';
import '../../styles/global.scss';

const SignUpStepThree = () => {
  const { signupForm, state, dispatch, isPhoneNumber, isValidEmail } = useAuthContext();
  const { signUpStep } = state;
  const { classes: inputClasses } = inputStyles();

  const VerifyOTP = () => {
    if (signUpStep === 3 && !signupForm.validateField('otp').hasError) {
      // API CALL

      dispatch({ type: 'NEXTSIGNUPSTEP' });
    }
  };

  return (
    <>
      {(signUpStep === 3 && isValidEmail(signupForm.values.emailPhone) && (
        <Box>
          <Flex className="tabTopBox" onClick={() => dispatch({ type: 'PREVSIGNUPSTEP' })}>
            <BsArrowLeft size={'15px'} />
            <Text className="tabHeading">Reset Password</Text>
          </Flex>
          <Text className="profileTextBold">
            Enter the one-time password sent to your email address
          </Text>
          <TextInput
            classNames={inputClasses}
            maxLength={6}
            pattern="[0-9]{4}"
            {...signupForm.getInputProps('otp')}
          />
          <Text fw={'light'} fz={'xs'} my={'md'}>
            Resend
            <Text fw={'600'} span>
              after 30s
            </Text>
          </Text>
          <Button className="primaryBtn" onClick={VerifyOTP}>
            Verify
          </Button>
        </Box>
      )) ||
        (signUpStep === 3 && isPhoneNumber(signupForm.values.emailPhone) && (
          <Box>
            <Flex className="tabTopBox" onClick={() => dispatch({ type: 'PREVSIGNUPSTEP' })}>
              <BsArrowLeft size={'15px'} />
              <Text className="tabHeading">Reset Password</Text>
            </Flex>
            <Text className="profileTextBold">
              Enter the one-time password sent to your phone number
            </Text>
            <TextInput
              classNames={inputClasses}
              maxLength={6}
              pattern="[0-9]{4}"
              {...signupForm.getInputProps('otp')}
            />
            <Text fw={'light'} fz={'xs'} my={'md'}>
              Resend
              <Text fw={'600'} span>
                after 30s
              </Text>
            </Text>
            <Button className="primaryBtn" onClick={VerifyOTP}>
              Verify
            </Button>
          </Box>
        ))}
    </>
  );
};

export default SignUpStepThree;

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
      fontSize: '14px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },
}));
