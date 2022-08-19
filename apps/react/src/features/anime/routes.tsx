import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { AuthenticatedGuard } from '../../guards/AuthenticatedGuard';

const AnimesPage = lazy(() => import('./pages/AnimesPage').then(module => ({ default: module.AnimesPage })));

export const animeRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <AuthenticatedGuard>
        <AnimesPage />
      </AuthenticatedGuard>
    ),
  },
  {
    path: '*',
    element: <Navigate to="AnimesPage" />,
  },
];
