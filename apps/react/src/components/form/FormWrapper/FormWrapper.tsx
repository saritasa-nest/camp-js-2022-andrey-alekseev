import { FC, HTMLAttributes, memo, ReactNode } from 'react';

import styles from './FormWrapper.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {

  /** Child node. */
  readonly children: ReactNode;
}

const FormWrapperComponent: FC<Props> = ({ children, ...props }) => (
  <div className={styles['form-wrapper']} {...props}>
    {children}
  </div>
);

export const FormWrapper = memo(FormWrapperComponent);
