import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { AuthenticatedGuard } from '../../routes/guards/AuthenticatedGuard';

import { AnimeDetails } from './components/AnimeDetails';

const AnimesPage = lazy(() => import('./pages/AnimesPage').then(module => ({ default: module.AnimesPage })));

export const animeRoutes: RouteObject[] = [
  {
    path: '',
    element: <AuthenticatedGuard/>,
    children: [
      {
        path: '',
        element: <AnimesPage/>,
        children: [
          {
            path: '',
            element: <AnimeDetails/>,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="AnimesPage" />,
  },
];
