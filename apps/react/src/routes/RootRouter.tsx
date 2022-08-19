import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { genresRoutes } from '../features/genres/routes';
import { loginRoutes } from '../features/auth/routes';
import { animeRoutes } from '../features/anime/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  ...animeRoutes,
  ...genresRoutes,
  ...loginRoutes,
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
