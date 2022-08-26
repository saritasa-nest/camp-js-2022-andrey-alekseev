import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { loginRoutes } from '../features/auth/routes';
import { animeRoutes } from '../features/anime/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  ...animeRoutes,
  ...loginRoutes,
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
