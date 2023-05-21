import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ApiList from '../../../../assets/api/ApiList';

import { Button } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import GoogleLogo from '../../assets/g-logo.png';
import '../../styles/global.scss';

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

const GoogleButton = () => {
  const navigate = useNavigate();

  const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens>({ key: 'auth-tokens' });
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    if (isLoading) {
      return Promise.resolve(null);
    }

    setIsLoading(true);
    try {
      const res = await axios.get(ApiList.googleAuth);

      if (res.data) {
        window.open(res.data?.url, '_blank');
      }
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      if (authTokens?.accessToken) navigate('/profile');
    }
  };

  return (
    <Button className="secondaryBtn" onClick={handleGoogleAuth}>
      <span>
        <img src={GoogleLogo} alt="Google" />
      </span>
      Contiue with Google
    </Button>
  );
};

export default GoogleButton;
