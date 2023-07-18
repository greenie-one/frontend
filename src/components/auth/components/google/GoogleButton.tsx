import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useAuthContext } from '../../context/AuthContext';
import { useGlobalContext } from '../../../../context/GlobalContext';

import { showErrorNotification, showLoadingNotification } from '../../../../utils/functions/showNotification';
import { HttpClient } from '../../../../utils/generic/httpClient';
import { authApiList } from '../../../../assets/api/ApiList';

import GoogleLogo from '../../assets/g-logo.png';
import '../../styles/global.scss';

const GoogleButton = () => {
  const { authClient } = useGlobalContext();
  const { setForceRender } = useAuthContext();
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens>({ key: 'auth-tokens' });

  useEffect(() => {
    getAuthTokens();
  }, [window.location]);

  const handleGoogleAuth = async () => {
    showLoadingNotification({ title: 'Wait !', message: 'Please wait' });
    if (isLoading) {
      return Promise.resolve(null);
    }
    setIsLoading(true);

    const res = await HttpClient.callApi<GoogleAuthResponse>({
      url: `${authApiList.googleAuth}`,
      method: 'GET',
    });

    if (res.ok) {
      window.location.replace(res.value?.redirectUrl);

      setForceRender((prev) => !prev);
    } else {
      showErrorNotification(res.error.code);
    }
    setIsLoading(false);
  };

  const getAuthTokens = async () => {
    if (searchParams) {
      const code = searchParams.get('code');

      if (code) {
        const res = await HttpClient.callApi<AuthTokens>({
          url: `${authApiList.googleCallback}`,
          method: 'GET',
          query: { code: code },
        });

        if (res.ok) {
          setAuthTokens(res.value);
          authClient.updateTokens(res.value.accessToken, res.value.refreshToken);

          window.history.back();
          setForceRender((prev) => !prev);
        } else {
          console.error(res.error.code);
        }
      }
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
