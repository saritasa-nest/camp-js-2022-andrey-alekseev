import { FC, ReactNode } from 'react';
import { useAppSelector } from '@js-camp/react/store';
import { selectUser } from '@js-camp/react/store/auth/selectors';

import { Navigate, useLocation } from 'react-router-dom';

import { routePaths } from '../utils/routePaths';
import { LocationState } from '../features/auth/components/LoginForm/LoginForm';

interface Props {

  /** Child node. */
  readonly children: ReactNode;
}

/** Guard for authenticated users. */
const AuthenticatedGuardComponent: FC<Props> = ({ children }: Props) => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (user === null) {
    return <Navigate to={routePaths.login} state={{ from: location.pathname } as LocationState} />;
  }

  return <>{children}</>;
};

export const AuthenticatedGuard = AuthenticatedGuardComponent;
