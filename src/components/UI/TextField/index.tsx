import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './TextField.module.scss';

interface TextFiledProps {
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  variant: 'sm' | 'md' | 'lg' | 'changing';
  placeholder: string;
  register?: UseFormRegisterReturn<'email' | 'name'>;
  type?: 'text' | 'email';
  errorMessage?: string;
}

const TextFiled: React.FC<TextFiledProps> = ({
  variant,
  value,
  onChange,
  onBlur,
  placeholder,
  register,
  errorMessage,
  type = 'text',
}) => {
  return (
    <>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      {onChange ? (
        <input
          className={`${styles.input} ${styles[variant]}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onBlur={onBlur}
          type={type}
          autoComplete="off"
        />
      ) : (
        <input
          className={`${styles.input} ${styles[variant]}`}
          value={value}
          placeholder={placeholder}
          {...register}
          type={type}
          autoComplete="off"
        />
      )}
    </>
  );
};

export default TextFiled;
