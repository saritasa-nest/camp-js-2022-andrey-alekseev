import { FC, memo, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
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

const RegisterPageComponent: FC = () => {
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
    <div className="form-wrapper">
      <h1>Register</h1>
      <form className="form" onSubmit={formik.handleSubmit}>
        <TextField
          name="email"
          autoComplete="email"
          label="Email"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.errors.email}
          value={formik.values.email}
        />
        <TextField
          name="firstName"
          autoComplete="given-name"
          label="First name"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.errors.firstName}
          value={formik.values.firstName}
        />
        <TextField
          name="lastName"
          autoComplete="family-name"
          label="Last name"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.errors.lastName}
          value={formik.values.lastName}
        />
        <TextField
          name="password"
          autoComplete="current-password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.errors.password}
          value={formik.values.password}
        />
        <TextField
          name="passwordConfirmation"
          autoComplete="current-password"
          label="Confirm password"
          variant="outlined"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
          helperText={formik.errors.passwordConfirmation}
          value={formik.values.passwordConfirmation}
        />
        {formError !== null && <p className="text-danger">{formError}</p>}
        <div className="form__controls">
          <Button type="submit" variant="contained" disabled={!formik.isValid}>
            Submit
          </Button>
          <Link to={routePaths.login}>Already have account?</Link>
        </div>
      </form>
    </div>
  );
};

export const RegisterPage = memo(RegisterPageComponent);
