import { FC, HTMLAttributes, memo, ReactNode } from 'react';

import styles from './FormControls.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {

  /** Child node. */
  readonly children: ReactNode;
}

const FormControlsComponent: FC<Props> = ({ children, ...props }: Props) => (
  <div className={styles['form__controls']} {...props}>
    {children}
  </div>
);

export const FormControls = memo(FormControlsComponent);
