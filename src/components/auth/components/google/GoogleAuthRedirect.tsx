import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useLocalStorage } from '@mantine/hooks';
import { authApiList } from '../../../../assets/api/ApiList';
import { HttpClient } from '../../../../utils/generic/httpClient';

export const GoogleAuthRedirect = () => {
  const [searchParams] = useSearchParams();

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
        console.info(res);

        if (res.ok) {
          setAuthTokens(res.value);

          console.info('closing');
          window.opener = null;
          window.open('', '_self');
          window.close();
          console.info('closed');
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
