import { createStyles, em, rem, Text, Button, Divider, PasswordInput, Box } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';

import useApi from '../../../../utils/hooks/useApi';
import ApiList from '../../../../assets/api/ApiList';

import GoogleButton from '../GoogleButton';
import TermsAndConditions from '../../assets/terms_and_conditions-greenie.pdf';
import PrivacyPolicy from '../../assets/Privacy Policy-Greenie.pdf';
import '../../styles/global.scss';

const SignUpStepTwo = () => {
  const { signupForm, state, dispatch, isPhoneNumber, isValidEmail, setValidationId } =
    useAuthContext();
  const { classes: inputClasses } = inputStyles();
  const { signUpStep } = state;

  const { error, sendRequest } = useApi();

  const EmailSignupStep = () => {
    if (
      signUpStep === 2 &&
      !signupForm.validateField('password').hasError &&
      !signupForm.validateField('confirmPassword').hasError
    ) {
      signupForm.clearErrors();

      // sendRequest(`${ApiList.signup}`, 'POST', {
      //   email: signupForm.values.emailPhone,
      //   password: signupForm.values.password,
      // })
      //   .then((res: any) => {
      //     console.log(res);
      //     setValidationId(res?.validationId);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      dispatch({ type: 'NEXTSIGNUPSTEP' });
    }
  };

  return (
    <>
      {(signUpStep === 2 && isValidEmail(signupForm.values.emailPhone) && (
        <Box>
          <Text className="disbledInput">
            {signupForm.values.emailPhone}
            <span className="changeBtn" onClick={() => dispatch({ type: 'PREVSIGNUPSTEP' })}>
              Change
            </span>
          </Text>
          <PasswordInput
            label="Create Password"
            classNames={inputClasses}
            {...signupForm.getInputProps('password')}
          />

          <PasswordInput
            label="Confirm Password"
            classNames={inputClasses}
            {...signupForm.getInputProps('confirmPassword')}
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
          <Button onClick={EmailSignupStep} className="primaryBtn">
            Agree & Join
          </Button>
          <Divider label="Or better yet" className="divider" labelPosition="center" />
          <GoogleButton />
        </Box>
      )) ||
        (signUpStep === 2 && isPhoneNumber(signupForm.values.emailPhone) && (
          <Box>
            <Text className="disbledInput">
              {signupForm.values.emailPhone}
              <span className="changeBtn" onClick={() => dispatch({ type: 'PREVSIGNUPSTEP' })}>
                Change
              </span>
            </Text>
            <Text className="tearms-condition">
              By creating an account, you agree to our <u>Terms of Service</u> and
              <u>Privacy & Cookie Statement</u>.
            </Text>
            <Button onClick={() => dispatch({ type: 'NEXTSIGNUPSTEP' })} className="primaryBtn">
              Send OTP
            </Button>
            <Divider label="Or better yet" className="divider" labelPosition="center" />
            <GoogleButton />
          </Box>
        ))}
    </>
  );
};

export default SignUpStepTwo;

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

  // for password field
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
