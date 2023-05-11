import { useAuthContext } from '../../context/AuthContext';
import '../../styles/global.scss';
import Profile from './Profile';

const SignUpStepFive = () => {
  const { signupForm, state, isValidEmail } = useAuthContext();
  const { signUpStep } = state;

  return <>{signUpStep === 5 && isValidEmail(signupForm.values.emailPhone) && <Profile />}</>;
};

export default SignUpStepFive;
