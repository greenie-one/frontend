import { TextInput, createStyles, rem, Text, Button, Divider, Box, em } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import GoogleButton from '../GoogleButton';
import '../../styles/global.scss';

const LoginStepOne = () => {
  const { classes: inputClasses } = inputStyles();
  const { loginForm, state, dispatch } = useAuthContext();
  return (
    <>
      {state.loginStep === 1 && (
        <Box>
          <TextInput
            label="Email or Phone number"
            style={{ borderRadius: '1rem' }}
            classNames={inputClasses}
            {...loginForm.getInputProps('emailPhoneGreenieId')}
          />
          <Text className="tearms-condition">
            By continuing with your account, you agree to our <u>Terms of Service</u> and
            <u>Privacy & Cookie Statement</u>.
          </Text>
          <Button onClick={() => dispatch({ type: 'NEXTLOGINSTEP' })} className="primaryBtn">
            Continue
          </Button>
          <Divider label="Or better yet" className="divider" labelPosition="center" />
          <GoogleButton />
        </Box>
      )}
    </>
  );
};

export default LoginStepOne;

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: '24px',
    marginTop: '24px',
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
      width: '350px',
      height: '46px',
      borderRadius: '6px',
      fontSize: '10px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },

  innerInput: {
    height: rem(54),
    paddingTop: rem(28),

    [`@media screen and (max-width: ${em(1024)})`]: {
      paddingTop: rem(8),
    },
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
      fontSize: '10px',
      lineHeight: '10px',
      paddingTop: '8px',
    },
  },
}));
