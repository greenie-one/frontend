import { TextInput, Text, Button, Divider, Box } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import GoogleButton from '../Google/GoogleButton';
import TermsAndConditions from '../../assets/terms_and_conditions-greenie.pdf';
import PrivacyPolicy from '../../assets/Privacy Policy-Greenie.pdf';
import '../../styles/global.scss';
import React from 'react';

const SignUpStepOne = () => {
  const { signupForm, state, dispatch } = useAuthContext();
  const { signUpStep } = state;

  const SignupStep1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

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
            my={'1.5rem'}
            className="inputClass"
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
          <Button type="submit" onClick={SignupStep1} className="primaryBtn">
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
