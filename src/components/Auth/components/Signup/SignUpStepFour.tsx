import { Text, Button, Flex, Box } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import { BsArrowLeft } from 'react-icons/bs';
import '../../styles/global.scss';
import Profile from './Profile';

const SignUpStepFour = () => {
  const { signupForm, state, dispatch, isPhoneNumber, isValidEmail } = useAuthContext();
  const { signUpStep } = state;

  return (
    <>
      {(signUpStep === 4 && isValidEmail(signupForm.values.emailPhone) && (
        <Box>
          <Flex className="tabTopBox" onClick={() => dispatch({ type: 'PREVSIGNUPSTEP' })}>
            <BsArrowLeft size={'15px'} />
            <Text className="tabHeading">Reset Password</Text>
          </Flex>
          <Text className="profileTextBold">
            Enter the one-time password sent to your email address
          </Text>
          <input className="otpInput" maxLength={4} type="text" pattern="[0-9]{4}" />
          <Text fw={'light'} fz={'xs'} my={'md'}>
            Resend{' '}
            <Text fw={'600'} span>
              after 30s
            </Text>
          </Text>
          <Button className="primaryBtn" onClick={() => dispatch({ type: 'NEXTSIGNUPSTEP' })}>
            Verify
          </Button>
        </Box>
      )) ||
        (signUpStep === 4 && isPhoneNumber(signupForm.values.emailPhone) && (
          <Box>
            <Profile />
          </Box>
        ))}
    </>
  );
};

export default SignUpStepFour;
