import { TextInput, createStyles, em, rem, Text, Button, Divider, Box } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';

import GoogleButton from '../GoogleButton';
import TermsAndConditions from '../../assets/terms_and_conditions-greenie.pdf';
import PrivacyPolicy from '../../assets/Privacy Policy-Greenie.pdf';
import '../../styles/global.scss';

const SignUpStepOne = () => {
  const { signupForm, state, dispatch } = useAuthContext();
  const { classes: inputClasses } = inputStyles();
  const { signUpStep } = state;

  const SignupStep1 = () => {
    if (signUpStep === 1 && !signupForm.validateField('emailPhone').hasError) {
      signupForm.clearErrors();
      signupForm.setFieldValue('password', '');
      signupForm.setFieldValue('confirmPassword', '');

      dispatch({ type: 'NEXTSIGNUPSTEP' });
    }
  };

  return (
    <>
      {signUpStep === 1 && (
        <Box>
          <TextInput
            label="Email or Phone number"
            classNames={inputClasses}
            {...signupForm.getInputProps('emailPhone')}
          />
          <Text className="tearms-condition">
            By creating an account, you agree to our{' '}
            <a href={TermsAndConditions} download={'Tearms and Conditions'}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href={PrivacyPolicy} download={'Privacy Policy'}>
              Privacy & Cookie Statement
            </a>
            .
          </Text>
          <Button onClick={SignupStep1} className="primaryBtn">
            Agree & Join
          </Button>
          <Divider label="Or better yet" className="divider" labelPosition="center" />
          <GoogleButton />
        </Box>
      )}
    </>
  );
};

export default SignUpStepOne;

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
