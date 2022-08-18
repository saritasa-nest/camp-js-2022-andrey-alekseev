import { FC, memo, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginData } from '@js-camp/core/models/user';
import { loginUser } from '@js-camp/react/store/auth/dispatchers';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { Link, useNavigate } from 'react-router-dom';
import { AppError } from '@js-camp/core/models/appError';
import { selectLoginError } from '@js-camp/react/store/auth/selectors';
import { clearLoginError } from '@js-camp/react/store/auth/slice';

import { routePaths } from '../../../utils/routePaths';
import { passwordYupValidator } from '../../../utils/forms';
import { TextField } from '../../../components/TextField/TextField';

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Required'),
  password: passwordYupValidator,
});

const LoginFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginError = useAppSelector(selectLoginError);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (loginError === undefined) {
      return;
    }
    formik.setErrors(loginError.validationErrors);
    if (loginError.validationErrors.detail !== undefined) {
      setFormError(loginError.validationErrors.detail);
    }
  }, [loginError]);

  const formik = useFormik<LoginData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    async onSubmit(values) {
      const result = await dispatch(loginUser(values));
      if (!(result.payload instanceof AppError)) {
        navigate(routePaths.home);
      }
    },
  });

  useEffect(() => {
    if (formError !== null) {
      setFormError(null);
    }
  }, [formik.values]);

  /** Clear login error on unmount. */
  useEffect(() => () => {
    dispatch(clearLoginError());
  }, []);

  return (
    <form className='form' onSubmit={formik.handleSubmit}>
      <TextField
        name="email"
        autoComplete="email"
        label="Email"
        {...formik}
      />
      <TextField
        name="password"
        autoComplete="current-password"
        label="Password"
        type="password"
        {...formik}
      />
      {formError !== null && (
        <p className='text-danger'>{formError}</p>
      )}
      <div className='form__controls'>
        <Button type="submit" variant="contained" disabled={!formik.isValid}>
          Submit
        </Button>
        <Link to={routePaths.registration}>Don't have account?</Link>
      </div>
    </form>
  );
};

export const LoginForm = memo(LoginFormComponent);
