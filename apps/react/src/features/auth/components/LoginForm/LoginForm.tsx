import { FC, memo, useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Field, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginData } from '@js-camp/core/models/user';
import { loginUser } from '@js-camp/react/store/auth/dispatchers';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { AppError } from '@js-camp/core/models/appError';
import { selectLoginError } from '@js-camp/react/store/auth/selectors';
import { clearLoginError } from '@js-camp/react/store/auth/slice';

import { TextField } from 'formik-mui';

import { routePaths } from '../../../../utils/routePaths';
import { passwordYupValidator } from '../../../../utils/forms';
import { Form } from '../../../../components/form/Form';
import { FormControls } from '../../../../components/form/FormControls';

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Required'),
  password: passwordYupValidator,
});

const LoginFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [search] = useSearchParams();

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
      if (result.payload instanceof AppError) {
        throw result.payload;
      }
      const next = search.get('next') ?? routePaths.home;
      navigate(next);
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
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Field
          component={TextField}
          name="email"
          autoComplete="email"
          label="Email"
        />
        <Field
          component={TextField}
          name="password"
          autoComplete="current-password"
          label="Password"
          type="password"
        />
        {formError !== null && (
          <Typography
            sx={theme => ({
                color: theme.palette.error.main,
            })}
          >
            {formError}
          </Typography>
        )}
        <FormControls>
          <Button type="submit" variant="contained" disabled={!formik.isValid}>
              Submit
          </Button>
          <Link to={routePaths.registration}>Don't have account?</Link>
        </FormControls>
      </Form>
    </FormikProvider>
  );
};

export const LoginForm = memo(LoginFormComponent);
