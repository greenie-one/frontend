import { useState } from 'react';
import axios from 'axios';

import { Button } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { authApiList } from '../../../../assets/api/ApiList';
import { useAuthContext } from '../../context/AuthContext';

import GoogleLogo from '../../assets/g-logo.png';
import '../../styles/global.scss';

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

const GoogleButton = () => {
  const { setForceRender } = useAuthContext();

  const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens>({ key: 'auth-tokens' });
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    if (isLoading) {
      return Promise.resolve(null);
    }

    setIsLoading(true);
    try {
      const res = await axios.get(authApiList.googleAuth);

      if (res.data) {
        window.open(res.data?.url, '_blank');
      }
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      if (authTokens?.accessToken) setForceRender((prev) => !prev);
    }
  };

  return (
    <Button className="secondaryBtn" onClick={handleGoogleAuth}>
      <span>
        <img src={GoogleLogo} alt="Google" />
      </span>
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
