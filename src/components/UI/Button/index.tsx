import React from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  variant: 'sm' | 'md' | 'lg' | 'full';
  type: 'basic' | 'secondary';
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  roleType?: 'submit' | 'button';
}

const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  text,
  type,
  disabled,
  roleType = 'button',
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[type]}`}
      onClick={onClick}
      disabled={disabled}
      type={roleType}>
      {text}
    </button>
  );
};

export default Button;
