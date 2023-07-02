import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { useLocalStorage } from '@mantine/hooks';
import { authApiList } from '../../../../assets/api/ApiList';

export const GoogleAuthRedirect = () => {
  const [searchParams] = useSearchParams();
  const [authTokens, setAuthTokens] = useLocalStorage({ key: 'auth-tokens' });

  useEffect(() => {
    console.log(searchParams);
    if (searchParams) {
      console.log(searchParams);
      const code = searchParams.get('client_id');
      console.log(code);

      if (code) {
        axios
          .get(`${authApiList.googleCallback}`, { params: { code: code } })
          .then((res) => {
            setAuthTokens(res.data);
            console.log(res);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    }
  }, []);

  return (
    <>
      <h1>Jay Shree Ganesh</h1>
    </>
  );
};
