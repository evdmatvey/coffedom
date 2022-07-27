import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Breadcrumb from '../../components/UI/Breadcrumb';
import PasswordInput from '../../components/UI/PasswordInput';

import './Registration.scss';

type Registration = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
  checked: boolean;
};

const Registaration = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    getValues,
    handleSubmit,
    reset,
  } = useForm<Registration>();

  const registrationSubmitHandler = handleSubmit((data: Registration) => {
    toast.success('Вы успешно зарегистрировались', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    navigate('/');
  });

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...{ email: '', checked: false, name: '', password: '', passwordConfirmation: '' } });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="registration">
      <div className="registration__top">
        <div className="container">
          <Breadcrumb current="Регистрация" elements={[['Главная', '/']]} />
          <h1>Регистрация</h1>
        </div>
      </div>
      <div className="container">
        <form className="registration__form" onSubmit={registrationSubmitHandler}>
          <div className="registration__form-inner">
            {errors.email && <div className="registration__form-error">{errors.email.message}</div>}
            <input
              {...register('email', { required: 'Укажите ваш email' })}
              className="registration__form-input"
              type="email"
              placeholder="Введите email..."
            />
            {errors.name && <div className="registration__form-error">{errors.name.message}</div>}
            <input
              {...register('name', { required: 'Укажите ваше имя' })}
              className="registration__form-input"
              type="text"
              placeholder="Введите имя..."
            />
            {errors.password && (
              <div className="registration__form-error">{errors.password.message}</div>
            )}
            <PasswordInput
              placeholder="Введите пароль..."
              register={register('password', {
                required: 'Придумайте пароль',
              })}
            />
            {errors.passwordConfirmation && (
              <div className="registration__form-error">{errors.passwordConfirmation.message}</div>
            )}
            <PasswordInput
              placeholder="Повторите пароль..."
              register={register('passwordConfirmation', {
                required: true,
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return password === value || 'Пароли не совпадают';
                  },
                },
              })}
            />
            <label className="registration__form-checkbox">
              Я согласен с правилами сайта
              <input {...register('checked', { required: 'error' })} type="checkbox" />
              <span className={errors.checked?.message === 'error' ? 'error' : ''}></span>
            </label>
          </div>
          <button className="registration__form-button" type="submit">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registaration;
