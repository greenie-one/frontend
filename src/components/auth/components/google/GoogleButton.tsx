import { useState } from 'react';
import { Button } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';

import { showErrorNotification, showLoadingNotification } from '../../../../utils/functions/showNotification';
import { HttpClient } from '../../../../utils/generic/httpClient';
import { authApiList } from '../../../../assets/api/ApiList';

import GoogleLogo from '../../assets/g-logo.png';
import '../../styles/global.scss';

const GoogleButton = () => {
  const { setForceRender } = useAuthContext();

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
      window.location.replace(res.value?.redirectUrl);

      setForceRender((prev) => !prev);
    } else {
      showErrorNotification(res.error.code);
    }
    setIsLoading(false);
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
