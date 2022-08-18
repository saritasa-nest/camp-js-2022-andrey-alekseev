import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';
import { FormikHandlers, FormikState, getIn } from 'formik';

/** Props for text field with formik. */
export interface TextFieldProps<Values>
  extends FormikHandlers, FormikState<Values>,
  Omit<MuiTextFieldProps, 'value' | 'error'> {}

/** Prepare field props to handle with formik. */
export function fieldToTextField<Values>({
  name,
  type,
  autoComplete,
  label,
  handleChange,
  handleBlur,
  errors,
  touched,
}: TextFieldProps<Values>): MuiTextFieldProps {
  if (name === undefined) {
    throw new Error('Name not provided.');
  }
  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && fieldError !== undefined;
  return {
    name,
    autoComplete,
    label,
    type,
    error: showError,
    helperText: fieldError,
    onBlur: handleBlur,
    onChange: handleChange,
  };
}

export const TextField = <Values extends unknown>({ ...props }: TextFieldProps<Values>): JSX.Element => (
  <MuiTextField {...fieldToTextField(props)}></MuiTextField>
);
