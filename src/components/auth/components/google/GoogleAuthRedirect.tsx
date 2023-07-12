import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useLocalStorage } from '@mantine/hooks';
import { authApiList } from '../../../../assets/api/ApiList';
import { HttpClient } from '../../../../utils/generic/httpClient';

export const GoogleAuthRedirect = () => {
  const [searchParams] = useSearchParams();
  const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens>({
    key: 'auth-tokens',
  });

  const getAuthTokens = async () => {
    if (searchParams) {
      const code = searchParams.get('client_id');
      console.log(code);
      if (code) {
        const res = await HttpClient.callApi<AuthTokens>({
          url: `${authApiList.googleCallback}`,
          method: 'GET',
          query: { code: code },
        });

        console.log(res);
        if (res.ok) {
          setAuthTokens(res.value);
          // window.close();
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
