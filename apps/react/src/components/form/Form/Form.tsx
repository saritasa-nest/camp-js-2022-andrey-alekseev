import { FC, FormHTMLAttributes, memo, ReactNode } from 'react';

import styles from './Form.module.css';

interface Props extends FormHTMLAttributes<HTMLFormElement> {

  /** Child node. */
  readonly children: ReactNode;
}

const FormComponent: FC<Props> = ({ children, ...props }: Props) => (
  <form className={styles['form']} {...props}>
    {children}
  </form>
);

export const Form = memo(FormComponent);
