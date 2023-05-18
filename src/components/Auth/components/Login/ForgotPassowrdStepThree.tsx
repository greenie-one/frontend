import { TextInput, createStyles, em, Text, Button, Box } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import '../../styles/global.scss';

const ForgotPassowrdStepThree = () => {
  const { classes: inputClasses } = inputStyles();
  const { loginForm, isPhoneNumber, isValidEmail } = useAuthContext();

  return (
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
      <Button className="primaryBtn" fullWidth radius="xl" color="teal">
        Verify
      </Button>
    </Box>
  );
};

export default ForgotPassowrdStepThree;

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
