import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { useLocalStorage } from '@mantine/hooks';
import { authApiList } from '../../../../assets/api/ApiList';
import { HttpClient } from '../../../../utils/generic/httpClient';

export const GoogleAuthRedirect = () => {
  const [searchParams] = useSearchParams();
  const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens>({ key: 'auth-tokens' });

  const getAuthTokens = async () => {
    if (searchParams) {
      const code = searchParams.get('client_id');

      if (code) {
        const res = await HttpClient.callApi<AuthTokens>({
          url: `${authApiList.googleCallback}`,
          method: 'GET',
          query: { code: code },
        });

        if (res.ok) {
          setAuthTokens(res.value);
        } else {
          console.log(res.error.code);
        }
      }
    }
  };

  useEffect(() => {
    getAuthTokens();
  }, []);

  return (
    <>
      <h1>Jay Shree Ganesh</h1>
    </>
  );
};
