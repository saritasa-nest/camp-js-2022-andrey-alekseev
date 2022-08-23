import * as Yup from 'yup';

import { passwordYupValidator } from '../../../../utils/forms';

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Required'),
  password: passwordYupValidator,
});
