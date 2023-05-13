import { Text, Button, Flex, Box, TextInput, createStyles, em } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import '../../styles/global.scss';
import { BsArrowLeft } from 'react-icons/bs';

const LoginStepThree = () => {
  const { loginForm, state, dispatch, isPhoneNumber } = useAuthContext();
  const { classes: inputClasses } = inputStyles();
  return (
    <>
      {state.loginStep === 3 &&
        isPhoneNumber(loginForm.values.emailPhoneGreenieId) &&
        state.resetPasswordStep < 1 && (
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
            <Button className="primaryBtn">Verify</Button>
          </Box>
        )}
    </>
  );
};

export default LoginStepThree;

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
