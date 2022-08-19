import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { NotAuthenticatedGuard } from '../../routes/guards/NotAuthenticatedGuard';

const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(module => ({ default: module.RegisterPage })));

export const loginRoutes: RouteObject[] = [
  {
    path: '',
    element: <NotAuthenticatedGuard/>,
    children: [
      {
        path: 'login',
        element: <LoginPage/>,
      },
      {
        path: 'register',
        element: <RegisterPage/>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="LoginPage" />,
  },
];
