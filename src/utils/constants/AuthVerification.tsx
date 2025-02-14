import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { LoadingState } from '../../components/common/LoadingState';

export const AuthVerificationLayout: React.FC = (): JSX.Element => {
  const [authTokens, setAuthTokens] = useState<AuthTokens>({} as AuthTokens);
  const [fetchingToken, setFetchingToken] = useState<boolean>(true);

  const getAuthTokens = () => {
    const tokens = JSON.parse(localStorage.getItem('auth-tokens') as string);

    setAuthTokens(tokens);
    setFetchingToken(false);
  };

  useEffect(() => {
    getAuthTokens();
  }, []);

  if (!fetchingToken) {
    return !authTokens?.accessToken ? <Navigate to="/auth" /> : <Outlet />;
  }

  return <LoadingState />;
};
