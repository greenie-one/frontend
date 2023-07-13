import { useState } from 'react';
import { Button } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';
import { HttpClient } from '../../../../utils/generic/httpClient';
import { authApiList } from '../../../../assets/api/ApiList';
import { useAuthContext } from '../../context/AuthContext';

import GoogleLogo from '../../assets/g-logo.png';
import '../../styles/global.scss';

const GoogleButton = () => {
  const { setForceRender } = useAuthContext();

  const [authTokens] = useLocalStorage<AuthTokens>({
    key: 'auth-tokens',
  });

  const [isLoading, setIsLoading] = useState(false);

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
      window.open(res.value?.redirectUrl, '_blank');
      showSuccessNotification({ title: 'Success !', message: '' });
    } else {
      showErrorNotification(res.error.code);
    }

    if (authTokens?.accessToken) setForceRender((prev) => !prev);
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
