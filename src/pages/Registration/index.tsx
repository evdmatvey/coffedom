import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Breadcrumb from '../../components/UI/Breadcrumb';
import PasswordInput from '../../components/UI/PasswordInput';
import TextFiled from '../../components/UI/TextField';
import { toastOptions } from '../../helpers';
import { useAppDispatch } from '../../hooks';
import { useAddUserMutation, useGetUsersQuery } from '../../store/services/user';
import { setUser } from '../../store/slices/userSlice';
import { User } from '../../types/User';

import './Registration.scss';

type Registration = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
  checked: boolean;
};

const Registaration = () => {
  const { data: users } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const dispatch = useAppDispatch();
  console.log(users);

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<Registration>();

  const registrationSubmitHandler: SubmitHandler<Registration> = ({ email, name, password }, e) => {
    e?.target.reset();
    toast.success('Вы успешно зарегистрировались', toastOptions);
    navigate('/');
    addUser({ email, name, password })
      .unwrap()
      .then((data: { userData: User; token: string }) => {
        dispatch(setUser(data.userData));
        window.localStorage.setItem('token', data.token);
      });
  };

  return (
    <div className="registration">
      <div className="registration__top">
        <div className="container">
          <Breadcrumb current="Регистрация" elements={[['Главная', '/']]} />
          <h1>Регистрация</h1>
        </div>
      </div>
      <div className="container">
        <form className="registration__form" onSubmit={handleSubmit(registrationSubmitHandler)}>
          <div className="registration__form-inner">
            <TextFiled
              variant="md"
              register={{
                ...register('email', {
                  required: 'Укажите ваш email',
                  validate: (value) =>
                    users?.find((user) => user.email === value)?.email !== value ||
                    'Один из пользователей уже использует этот email',
                }),
              }}
              placeholder="Введите email..."
              type="email"
              errorMessage={errors.email?.message}
            />
            <TextFiled
              variant="md"
              register={{
                ...register('name', {
                  required: 'Придумайте имя',
                  validate: (value) =>
                    users?.find((user) => user.name === value)?.name !== value ||
                    'Это имя уже занято,',
                }),
              }}
              placeholder="Введите имя..."
              errorMessage={errors.name?.message}
            />
            <PasswordInput
              placeholder="Введите пароль..."
              register={register('password', {
                required: 'Придумайте пароль',
              })}
              errorMessage={errors.password?.message}
            />
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
              errorMessage={errors.passwordConfirmation?.message}
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
