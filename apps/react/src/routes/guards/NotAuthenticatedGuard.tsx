import { FC } from 'react';
import { useAppSelector } from '@js-camp/react/store';
import { selectIsUserLoading, selectUser } from '@js-camp/react/store/auth/selectors';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

import { routePaths } from '../../utils/routePaths';
import { PageLoader } from '../../components/PageLoader';

export const NotAuthenticatedGuard: FC = () => {
  const user = useAppSelector(selectUser);
  const isUserLoading = useAppSelector(selectIsUserLoading);
  const [search] = useSearchParams();

  if (isUserLoading) {
    return <PageLoader/>;
  }

  if (user != null) {
    const redirect = search.get('next') ?? routePaths.home;
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
