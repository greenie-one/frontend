import { TextInput, Text, Button, Divider, Box } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import GoogleButton from '../Google/GoogleButton';
import TermsAndConditions from '../../assets/terms_and_conditions-greenie.pdf';
import PrivacyPolicy from '../../assets/Privacy Policy-Greenie.pdf';
import '../../styles/global.scss';

const LoginStepOne = () => {
  const { loginForm, state, dispatch } = useAuthContext();

  const loginStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (state.loginStep === 1 && !loginForm.validateField('emailPhoneGreenieId').hasError) {
      dispatch({ type: 'NEXTLOGINSTEP' });
    }
  };

  return (
    <>
      {state.loginStep === 1 && (
        <Box>
          <TextInput
            label="Email or Phone number"
            style={{ borderRadius: '1rem', marginBlock: '1.5rem' }}
            className="inputClass"
            {...loginForm.getInputProps('emailPhoneGreenieId')}
          />
          <Text className="tearms-condition">
            By continuing with your account, you agree to our{' '}
            <a href={TermsAndConditions} download={'Terms and Conditions'}>
              Terms of Service
            </a>{' '}
            and
            <a href={PrivacyPolicy} download={'Privacy Policy'}>
              {' '}
              Privacy & Cookie Statement
            </a>
            .
          </Text>
          <Button type="submit" onClick={loginStep} className="primaryBtn">
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
