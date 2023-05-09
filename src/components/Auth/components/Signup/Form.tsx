import { useAuthContext } from '../../context/AuthContext';
import CreateAccount from './CreateAccount';

import '../../styles/global.scss';

export const Form = () => {
  const { signUpSteps } = useAuthContext();

  return <>{signUpSteps < 3 && <CreateAccount />}</>;
};
