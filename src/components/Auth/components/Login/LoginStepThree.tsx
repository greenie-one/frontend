import { Text, Button, Flex, Box } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import '../../styles/global.scss';
import { BsArrowLeft } from 'react-icons/bs';

const LoginStepThree = () => {
  const { loginForm, state, dispatch, isValidEmail, isPhoneNumber } = useAuthContext();
  return (
    <>
      {state.loginStep === 3 && isPhoneNumber(loginForm.values.emailPhoneGreenieId) && (
        <Box>
          <Flex
            direction={'row'}
            className="tabTopBox"
            onClick={() => dispatch({ type: 'PREVLOGINSTEP' })}
          >
            <BsArrowLeft size={'15px'} />
            <Text className="tabHeading">Login using OTP</Text>
          </Flex>
          <Text className="profileTextBold">
            Enter the one-time passowrd sent to your phone number
          </Text>
          <input className="otpInput" maxLength={4} type="text" pattern="[0-9]{4}" />
          <Text fw={'light'} fz={'xs'} my={'md'}>
            Resend{' '}
            <Text fw={'600'} span>
              after 30s
            </Text>
          </Text>
          <Button className="primaryBtn">Verify</Button>
        </Box>
      )}
    </>
  );
};

export default LoginStepThree;
