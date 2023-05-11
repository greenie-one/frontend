import { TextInput, Text, Button, Flex, Box } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { useAuthContext } from '../../context/AuthContext';
import '../../styles/global.scss';

const SignUpStepThree = () => {
  const { signupForm, state, dispatch, isPhoneNumber, isValidEmail } = useAuthContext();
  const { signUpStep } = state;

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
            maxLength={6}
            pattern="[0-9]{4}"
            className="otpInput"
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
              maxLength={6}
              pattern="[0-9]{4}"
              className="otpInput"
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
