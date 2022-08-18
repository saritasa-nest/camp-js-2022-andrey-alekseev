import { FC, memo, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RegistrationData } from '@js-camp/core/models/user';
import { registerUser } from '@js-camp/react/store/auth/dispatchers';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { Link, useNavigate } from 'react-router-dom';
import { AppError } from '@js-camp/core/models/appError';
import { selectRegistrationError } from '@js-camp/react/store/auth/selectors';
import { clearRegistrationError } from '@js-camp/react/store/auth/slice';

import { routePaths } from '../../../utils/routePaths';
import { passwordYupValidator } from '../../../utils/forms';
import { TextField } from '../../../components/TextField/TextField';

const RegisterValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Required'),
  firstName: Yup.string().max(255),
  lastName: Yup.string().max(255),
  password: passwordYupValidator,
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

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
  useEffect(() => () => {
    dispatch(clearRegistrationError());
  }, []);

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <TextField
        name="email"
        autoComplete="email"
        label="Email"
        {...formik}
      />
      <TextField
        name="firstName"
        autoComplete="given-name"
        label="First name"
        {...formik}
      />
      <TextField
        name="lastName"
        autoComplete="family-name"
        label="Last name"
        {...formik}
      />
      <TextField
        name="password"
        autoComplete="current-password"
        label="Password"
        type="password"
        {...formik}
      />
      <TextField
        name="passwordConfirmation"
        autoComplete="current-password"
        label="Confirm password"
        type="password"
        {...formik}
      />
      {formError !== null && <p className="text-danger">{formError}</p>}
      <div className="form__controls">
        <Button type="submit" variant="contained" disabled={!formik.isValid}>
            Submit
        </Button>
        <Link to={routePaths.login}>Already have account?</Link>
      </div>
    </form>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
