import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Breadcrumb from '../../components/UI/Breadcrumb';
import PasswordInput from '../../components/UI/PasswordInput';
import { useAppDispatch } from '../../hooks';
import { useGetUserByEmailAndPasswordMutation, useGetUsersQuery } from '../../store/services/user';
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
  const [getUserByEmailAndPassword] = useGetUserByEmailAndPasswordMutation();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    getValues,
    reset,
    handleSubmit,
  } = useForm<LoginData>();

  const loginSubmitHandler = handleSubmit((data) => {
    getUserByEmailAndPassword(data)
      .unwrap()
      .then((data) => dispatch(setUser(data[0])));
    toast.success('Вы успешно вошли в аккаунт', {
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
      reset({ email: '', password: '' });
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="login">
      <div className="login__top">
        <div className="container">
          <Breadcrumb elements={[['Главная', '/']]} current="Авторизация" />
          <h1>Авторизация</h1>
        </div>
      </div>
      <div className="container">
        <form className="login__form" onSubmit={loginSubmitHandler}>
          <div className="login__form-inner">
            {errors.email && <div className="login__form-error">{errors.email.message}</div>}
            <input
              {...register('email', {
                required: 'Введите корректный email',
                validate: (value) =>
                  (users && users.find((user) => user.email === value)?.email === value) ||
                  'Пользователь с таким email не найден',
              })}
              type="email"
              className="login__form-input"
              placeholder="Введите email..."
              autoComplete="off"
            />
            {errors.password && <div className="login__form-error">{errors.password.message}</div>}
            <PasswordInput
              register={{
                ...register('password', {
                  required: 'Введите ваш пароль',
                  validate: (value) =>
                    (users &&
                      users.find(
                        (user) => user.password === value && getValues('email') === user.email,
                      )?.password === value) ||
                    'Неверный логин или пароль',
                }),
              }}
              placeholder="Введите пароль..."
            />
          </div>
          <button className="login__form-button">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
