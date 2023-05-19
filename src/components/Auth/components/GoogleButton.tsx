import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ApiList from '../../../assets/api/ApiList';

import { Button } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import GoogleLogo from '../assets/g-logo.png';
import '../styles/global.scss';

const GoogleButton = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [authTokens, setAuthTokens] = useLocalStorage({ key: 'auth-tokens' });

  const handleGoogleAuth = async () => {
    if (isLoading) {
      return Promise.resolve(null);
    }

    setIsLoading(true);
    try {
      const res = await axios.get(ApiList.googleAuth);

      if (res.data) {
        navigate(res.data?.url);
      }
    } catch (error) {}
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
