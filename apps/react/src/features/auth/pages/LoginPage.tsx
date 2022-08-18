import { FC, memo } from 'react';

import { LoginForm } from '../components/LoginForm';

const LoginPageComponent: FC = () => (
  <div className='form-wrapper'>
    <h1>Login</h1>
    <LoginForm/>
  </div>
);

export const LoginPage = memo(LoginPageComponent);
