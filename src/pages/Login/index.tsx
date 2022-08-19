import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Breadcrumb from '../../components/UI/Breadcrumb';
import PasswordInput from '../../components/UI/PasswordInput';
import TextFiled from '../../components/UI/TextField';
import { toastOptions } from '../../helpers';
import { useAppDispatch } from '../../hooks';
import { useAuthUserMutation, useGetUsersQuery } from '../../store/services/user';
import { setUser } from '../../store/slices/userSlice';

import './Login.scss';

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: users } = useGetUsersQuery();
  const [authUser] = useAuthUserMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginData>();

  const loginSubmitHandler: SubmitHandler<LoginData> = (data, e) => {
    authUser(data)
      .unwrap()
      .then((data) => {
        dispatch(setUser(data.userData));
        window.localStorage.setItem('token', data.token);
        e?.target.reset();
        toast.success('Вы успешно вошли в аккаунт', toastOptions);
        navigate('/');
      })
      .catch((err) => {
        setError('password', { message: err.data.message });
      });
  };

  return (
    <div className="login">
      <div className="login__top">
        <div className="container">
          <Breadcrumb elements={[['Главная', '/']]} current="Авторизация" />
          <h1>Авторизация</h1>
        </div>
      </div>
      <div className="container">
        <form className="login__form" onSubmit={handleSubmit(loginSubmitHandler)}>
          <div className="login__form-inner">
            <TextFiled
              variant="md"
              register={{
                ...register('email', {
                  required: 'Введите корректный email',
                  validate: (value) =>
                    (users && users.find((user) => user.email === value)?.email === value) ||
                    'Неверный логин или пароль',
                }),
              }}
              placeholder="Введите email..."
              type="email"
              errorMessage={errors.email?.message}
            />
            <PasswordInput
              register={{
                ...register('password', {
                  required: 'Введите ваш пароль',
                }),
              }}
              placeholder="Введите пароль..."
              errorMessage={errors.password?.message}
            />
          </div>
          <button className="login__form-button">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
