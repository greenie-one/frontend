import { TextInput, PasswordInput, createStyles, rem, Text, Button, Divider } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import CreateAccount from './CreateAccount';
import OTPTab from './OTPTab';
import '../../styles/InputStyles.scss';

export const Form = () => {
  const { signUpSteps } = useAuthContext();

  return <>{signUpSteps < 3 && <CreateAccount />}</>;
};
