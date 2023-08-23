import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Outlet } from 'react-router-dom';
import { LoadingState } from '../../components/common/LoadingState';
import { PageNotFound } from '../../pages/PageNotFound';

type JWTDecodedType = {
  email: string;
  roles: ['default', 'admin', 'hr'];
};

export const AdminVerification: React.FC = (): JSX.Element => {
  const [userValidation, setUserValidation] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(true);

  const validateUser = () => {
    const tokens = JSON.parse(localStorage.getItem('auth-tokens') as string);
    const decoded: JWTDecodedType = jwt_decode(tokens.accessToken);

    if (decoded.roles.includes('admin')) {
      setUserValidation(true);
    }

    setPending(false);
  };

  useEffect(() => {
    validateUser();
  }, []);

  if (!pending) {
    return !userValidation ? <PageNotFound /> : <Outlet />;
  }

  return <LoadingState />;
};
