import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { validRoutes } from '../../utils/constants/ValidRoutes';

import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';

export const AppLayout: React.FC = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <>
      {validRoutes.includes(pathname) ? <Navbar /> : null}
      <main className="">
        <Outlet />
      </main>
      {validRoutes.includes(pathname) ? <Footer /> : null}
    </>
  );
};
