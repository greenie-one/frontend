import { useAuthContext } from '../../context/AuthContext';
import CreateAccount from './CreateAccount';

import '../../styles/global.scss';

export const Form = () => {
  const { state } = useAuthContext();

  return <>{state.signUpStep < 3 && <CreateAccount />}</>;
};
