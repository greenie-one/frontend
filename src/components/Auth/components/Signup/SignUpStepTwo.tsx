import { useState } from 'react';
import axios from 'axios';
import { createStyles, em, rem, Text, Button, Divider, PasswordInput, Box } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useAuthContext } from '../../context/AuthContext';
import ApiList from '../../../../assets/api/ApiList';

import GoogleButton from '../Google/GoogleButton';
import TermsAndConditions from '../../assets/terms_and_conditions-greenie.pdf';
import PrivacyPolicy from '../../assets/Privacy Policy-Greenie.pdf';
import { FaExclamation } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs';
import '../../styles/global.scss';

const SignUpStepTwo = () => {
  const { signupForm, state, dispatch, isPhoneNumber, isValidEmail, setValidationId } =
    useAuthContext();
  const { classes: inputClasses } = inputStyles();
  const { signUpStep } = state;
  const [isLoading, setIsLoading] = useState(false);

  const EmailSignupStep = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isLoading) {
      return Promise.resolve(null);
    }

    if (
      signUpStep === 2 &&
      !signupForm.validateField('password').hasError &&
      !signupForm.validateField('confirmPassword').hasError
    ) {
      signupForm.clearErrors();
      setIsLoading(true);

      try {
        notifications.show({
          id: 'load-data',
          title: 'Sending...',
          message: 'Please wait while we send you an OTP.',
          loading: true,
          autoClose: false,
          withCloseButton: false,
          sx: { borderRadius: em(8) },
        });

        const res = await axios.post(ApiList.signup, {
          email: signupForm.values.emailPhone,
          password: signupForm.values.password,
        });

        if (res.data) {
          setValidationId(res.data?.validationId);
          setTimeout(() => {
            notifications.update({
              id: 'load-data',
              title: 'Success !',
              message: 'An OTP has been sent to your email.',
              autoClose: 2200,
              withCloseButton: false,
              color: 'teal',
              icon: <BsCheckLg />,
              sx: { borderRadius: em(8) },
            });
          }, 1100);

          dispatch({ type: 'NEXTSIGNUPSTEP' });
        }
      } catch (err: any) {
        if (err.response?.data?.code === 'GR0003') {
          signupForm.setFieldValue('password', '');
          signupForm.setFieldValue('confirmPassword', '');

          notifications.update({
            id: 'load-data',
            title: 'Error !',
            message: 'This email is already registered. Please try again with a different email.',
            autoClose: 2200,
            withCloseButton: false,
            color: 'red',
            icon: <FaExclamation />,
            sx: { borderRadius: em(8) },
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const MobileSignupStep = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isLoading) {
      return Promise.resolve(null);
    }

    if (signUpStep === 2) {
      signupForm.clearErrors();
      setIsLoading(true);

      try {
        notifications.show({
          id: 'load-data',
          title: 'Sending...',
          message: 'Please wait while we send you an OTP.',
          loading: true,
          autoClose: false,
          withCloseButton: false,
          sx: { borderRadius: em(8) },
        });

        const res = await axios.post(ApiList.signup, {
          mobileNumber: signupForm.values.emailPhone,
        });

        if (res.data) {
          setValidationId(res.data?.validationId);
          setTimeout(() => {
            notifications.update({
              id: 'load-data',
              title: 'Success !',
              message: 'An OTP has been sent to your mobile number.',
              autoClose: 2200,
              withCloseButton: false,
              color: 'teal',
              icon: <BsCheckLg />,
              sx: { borderRadius: em(8) },
            });
          }, 1100);

          dispatch({ type: 'NEXTSIGNUPSTEP' });
        }
      } catch (err: any) {
        if (err.response?.data?.code === 'GR0003') {
          notifications.update({
            id: 'load-data',
            title: 'Error !',
            message:
              'This mobile number is already registered. Please try again with a different mobile number.',
            autoClose: 2200,
            withCloseButton: false,
            color: 'red',
            icon: <FaExclamation />,
            sx: { borderRadius: em(8) },
          });
        }
      } finally {
        setIsLoading(false);
      }
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
          <Button type="submit" onClick={EmailSignupStep} className="primaryBtn">
            Agree & Join
          </Button>
          <Divider label="Or better yet" className="divider" labelPosition="center" />
          <GoogleButton />
        </Box>
      )) ||
        (signUpStep === 2 && isPhoneNumber(signupForm.values.emailPhone) && (
          <Box id="disbaled-input-screen">
            <Text className="disbledInput">
              {signupForm.values.emailPhone}
              <span className="changeBtn" onClick={() => dispatch({ type: 'PREVSIGNUPSTEP' })}>
                Change
              </span>
            </Text>
            <Text className="tearms-condition">
              By creating an account, you agree to our <u>Terms of Service</u> and{' '}
              <u>Privacy & Cookie Statement</u>.
            </Text>
            <Button type="submit" onClick={MobileSignupStep} className="primaryBtn">
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
