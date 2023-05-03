import { AuthProvider } from '../components/Auth/context/AuthContext';
import { Auth } from '../components/Auth/index';

export const AuthPage = () => {
  return (
    <>
      <AuthProvider>
        <Auth />
      </AuthProvider>
    </>
  );
};
