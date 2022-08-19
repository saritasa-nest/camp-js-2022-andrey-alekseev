import { FC, memo } from 'react';

import { LoginForm } from '../../components/LoginForm';
import { FormWrapper } from '../../../../components/form/FormWrapper';

const LoginPageComponent: FC = () => (
  <FormWrapper>
    <h1>Login</h1>
    <LoginForm/>
  </FormWrapper>
);

export const LoginPage = memo(LoginPageComponent);
