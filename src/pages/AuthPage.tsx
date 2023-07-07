import { AuthProvider } from '../components/auth/context/AuthContext';
import { Auth } from '../components/auth/index';

export const AuthPage = () => {
  return (
    <>
      <AuthProvider>
        <Auth />
      </AuthProvider>
    </>
  );
};
