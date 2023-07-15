import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';

import { useGlobalContext } from '../../../../context/GlobalContext';
import { HttpClient } from '../../../../utils/generic/httpClient';
import { authApiList } from '../../../../assets/api/ApiList';

export const GoogleAuthRedirect = () => {
  const [searchParams] = useSearchParams();
  const { authClient } = useGlobalContext();

  const [, setAuthTokens] = useLocalStorage<AuthTokens>({
    key: 'auth-tokens',
  });

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

          window.opener = null;
          window.open('', '_self');
          window.close();
        } else {
          console.error(res.error.code);
        }
      }
    }
  };

  useEffect(() => {
    getAuthTokens();
  }, []);

  return <></>;
};
