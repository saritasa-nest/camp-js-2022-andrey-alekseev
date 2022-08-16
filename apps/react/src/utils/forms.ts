import * as Yup from 'yup';

export const passwordYupValidator = Yup.string()
  .min(8, 'Password is too short')
  .matches(RegExp('\\d'), 'Password must have number')
  .matches(RegExp('[a-z]'), 'Password must have lower case')
  .matches(RegExp('[A-Z]'), 'Password must have upper case')
  .matches(
    RegExp('[()[\\]{}|`~!@#$%^&*_\\-+=;:\'",<>./?]'),
    'Password must have special symbol',
  )
  .required('Required');
