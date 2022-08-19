import { FC, memo } from 'react';

import { RegisterForm } from '../../components/RegisterForm';
import { FormWrapper } from '../../../../components/form/FormWrapper';

const RegisterPageComponent: FC = () => (
  <FormWrapper>
    <h1>Register</h1>
    <RegisterForm/>
  </FormWrapper>
);

export const RegisterPage = memo(RegisterPageComponent);
