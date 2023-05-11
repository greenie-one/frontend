import { useAuthContext } from '../../context/AuthContext';
import Profile from './Profile';
import '../../styles/global.scss';

const SignUpStepFive = () => {
  const { signupForm, state, isValidEmail } = useAuthContext();
  const { signUpStep } = state;

  return <>{signUpStep === 5 && isValidEmail(signupForm.values.emailPhone) && <Profile />}</>;
};

export default SignUpStepFive;
