import { FC } from 'react';
import { useAppSelector } from '@js-camp/react/store';
import { selectIsUserLoading, selectUser } from '@js-camp/react/store/auth/selectors';
import { Navigate, Outlet, To, useLocation } from 'react-router-dom';

import { routePaths } from '../../utils/routePaths';
import { PageLoader } from '../../components/PageLoader';

/** Guard for authenticated users. */
export const AuthenticatedGuard: FC = () => {
  const user = useAppSelector(selectUser);
  const isUserLoading = useAppSelector(selectIsUserLoading);
  const location = useLocation();

  if (isUserLoading) {
    return <PageLoader/>;
  }

  const redirect: To = {
    pathname: routePaths.login,
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (user === null) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet/>;
};
