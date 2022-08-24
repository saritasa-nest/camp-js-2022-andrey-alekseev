import * as Yup from 'yup';

import { passwordYupValidator } from '../../../../utils/forms';

export const RegisterValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Required'),
  firstName: Yup.string().max(255),
  lastName: Yup.string().max(255),
  password: passwordYupValidator,
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});
