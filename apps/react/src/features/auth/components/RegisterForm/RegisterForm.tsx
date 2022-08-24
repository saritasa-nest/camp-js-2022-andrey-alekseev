import { FC, memo, useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Field, FormikProvider, useFormik } from 'formik';
import { RegistrationData } from '@js-camp/core/models/user';
import { registerUser } from '@js-camp/react/store/auth/dispatchers';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { Link, useNavigate } from 'react-router-dom';
import { AppError } from '@js-camp/core/models/appError';
import { selectRegistrationError } from '@js-camp/react/store/auth/selectors';
import { clearRegistrationError } from '@js-camp/react/store/auth/slice';

import { TextField } from 'formik-mui';

import { routePaths } from '../../../../utils/routePaths';
import { Form } from '../../../../components/form/Form';
import { FormControls } from '../../../../components/form/FormControls';

import { RegisterValidationSchema } from './formSettings';

interface RegistrationDataWithConfirmation extends RegistrationData {

  /** Password confirmation. */
  readonly passwordConfirmation: string;
}

const RegisterFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registrationError = useAppSelector(selectRegistrationError);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (registrationError === undefined) {
      return;
    }
    formik.setErrors(registrationError.validationErrors);
    if (registrationError.validationErrors.detail !== undefined) {
      setFormError(registrationError.validationErrors.detail);
    }
  }, [registrationError]);

  const formik = useFormik<RegistrationDataWithConfirmation>({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: RegisterValidationSchema,
    async onSubmit(values) {
      const result = await dispatch(registerUser(values));
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

  /** Clear registration error on unmount. */
  useEffect(
    () => () => {
      dispatch(clearRegistrationError());
    },
    [],
  );

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
          name="firstName"
          autoComplete="given-name"
          label="First name"
        />
        <Field
          component={TextField}
          name="lastName"
          autoComplete="family-name"
          label="Last name"
        />
        <Field
          component={TextField}
          name="password"
          autoComplete="current-password"
          label="Password"
          type="password"
        />
        <Field
          component={TextField}
          name="passwordConfirmation"
          autoComplete="current-password"
          label="Confirm password"
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
          <Link to={routePaths.login}>Already have account?</Link>
        </FormControls>
      </Form>
    </FormikProvider>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
