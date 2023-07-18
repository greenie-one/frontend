import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';

import { useGlobalContext } from '../../../../context/GlobalContext';
import { useAuthContext } from '../../context/AuthContext';
import { HttpClient } from '../../../../utils/generic/httpClient';
import { authApiList } from '../../../../assets/api/ApiList';

export const GoogleAuthRedirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { authClient } = useGlobalContext();
  const { setForceRender } = useAuthContext();

  const [, setAuthTokens] = useLocalStorage<AuthTokens>({ key: 'auth-tokens' });

  useEffect(() => {
    getAuthTokens();
  }, [window.location]);

  const getAuthTokens = async () => {
    if (searchParams) {
      const code = searchParams.get('code');

      if (code) {
        const res = await HttpClient.callApi<AuthTokens>({
          url: `${authApiList.googleCallback}`,
          method: 'GET',
          query: { code },
        });

        if (res.ok) {
          setAuthTokens(res.value);
          authClient.updateTokens(res.value.accessToken, res.value.refreshToken);

          setForceRender((prev) => !prev);
          navigate('/auth');

          // window.opener = null;
          // window.open('', '_self');
          // window.close();
        } else {
          console.error(res.error.code);
        }
      }
    }
  };

  return <></>;
};
