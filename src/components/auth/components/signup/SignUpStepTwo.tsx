import { useState } from 'react';
import { Text, Button, Divider, PasswordInput, Box } from '@mantine/core';

import { HttpClient } from '../../../../utils/generic/httpClient';
import { authApiList } from '../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { useAuthContext } from '../../context/AuthContext';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';

import GoogleButton from '../google/GoogleButton';
import TermsAndConditions from '../../assets/terms_and_conditions-greenie.pdf';
import PrivacyPolicy from '../../assets/Privacy Policy-Greenie.pdf';
import '../../styles/global.scss';

const SignUpStepTwo = () => {
  const { inputStyles } = useGlobalContext();
  const { signupForm, state, dispatch, isPhoneNumber, isValidEmail, setValidationId } = useAuthContext();

  const { signUpStep } = state;
  const { classes: inputClasses } = inputStyles();
  const [isLoading, setIsLoading] = useState(false);

  const EmailSignupStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      showLoadingNotification({
        title: 'Sending...',
        message: 'Please wait while we send you an OTP',
      });

      const requestBody: SignupRequestBody = {
        email: signupForm.values.emailPhone,
        password: signupForm.values.password,
      };
      const res = await HttpClient.callApi<SignupResponse>({
        url: `${authApiList.signup}`,
        method: 'POST',
        body: requestBody,
      });

      if (res.ok) {
        setValidationId(res.value.validationId);
        showSuccessNotification({
          title: 'Success !',
          message: 'An OTP has been sent to your email.',
        });

        dispatch({ type: 'NEXTSIGNUPSTEP' });
      } else {
        showErrorNotification(res.error.code);
      }
      setIsLoading(false);
    }
  };

  const MobileSignupStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) {
      return Promise.resolve(null);
    }

    if (signUpStep === 2) {
      signupForm.clearErrors();
      setIsLoading(true);

      showLoadingNotification({
        title: 'Sending...',
        message: 'Please wait while we send you an OTP',
      });

      const requestBody: SignupRequestBody = {
        mobileNumber: `${signupForm.values.emailPhone}`,
      };
      const res = await HttpClient.callApi<SignupResponse>({
        url: `${authApiList.signup}`,
        method: 'POST',
        body: requestBody,
      });

      if (res.ok) {
        setValidationId(res.value.validationId);
        showSuccessNotification({
          title: 'Success !',
          message: 'An OTP has been sent to your mobile number.',
        });

        dispatch({ type: 'NEXTSIGNUPSTEP' });
      } else {
        showErrorNotification(res.error.code);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      {(signUpStep === 2 && isValidEmail(signupForm.values.emailPhone) && (
        <Box>
          <Text className="disabledInput">
            {signupForm.values.emailPhone}
            <Button unstyled className="changeBtn" onClick={() => dispatch({ type: 'PREVSIGNUPSTEP' })}>
              Change
            </Button>
          </Text>
          <PasswordInput label="Create Password" classNames={inputClasses} {...signupForm.getInputProps('password')} />

          <PasswordInput
            label="Confirm Password"
            classNames={inputClasses}
            {...signupForm.getInputProps('confirmPassword')}
          />
          <Text className="tearms-condition">
            By creating an account, you agree to our{' '}
            <a href={TermsAndConditions} download={'Terms and Conditions'}>
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
            <Text className="disabledInput">
              {signupForm.values.emailPhone}
              <span className="changeBtn" onClick={() => dispatch({ type: 'PREVSIGNUPSTEP' })}>
                Change
              </span>
            </Text>
            <Text className="tearms-condition">
              By creating an account, you agree to our <u>Terms of Service</u> and <u>Privacy & Cookie Statement</u>.
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
