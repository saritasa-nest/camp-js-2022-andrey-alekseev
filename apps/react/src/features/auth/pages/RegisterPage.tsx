import { FC, memo } from 'react';

import { RegisterForm } from '../components/RegisterForm';

const RegisterPageComponent: FC = () => (
  <div className="form-wrapper">
    <h1>Register</h1>
    <RegisterForm/>
  </div>
);

export const RegisterPage = memo(RegisterPageComponent);
