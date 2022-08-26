import React from 'react';
import { toast } from 'react-toastify';
import { getValidCitiesList, isUserAddressValid, toastOptions } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetCitiesQuery } from '../../store/services/address';
import { useUpdateUserMutation } from '../../store/services/user';
import { selectAuthState, selectUser, setUser } from '../../store/slices/userSlice';
import Button from '../UI/Button';
import Dropdown from '../UI/Dropdown';
import DropdownLoader from '../UI/Dropdown/DropdownLoader';
import TextFiled from '../UI/TextField';

import styles from './ProfileSettings.module.scss';

const ProfileSettings = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuth = useAppSelector(selectAuthState);
  const [updateUser] = useUpdateUserMutation();
  const { data: cities } = useGetCitiesQuery();

  const [isValid, setIsValid] = React.useState(false);
  const [userData, setUserData] = React.useState({ address: '', city: 0, email: '', password: '' });
  const [citiesList, setCitiesList] = React.useState<{ id: number; text: string }[]>([]);

  const validateAddressHandler = () => {
    if (userData.address) {
      if (!isUserAddressValid(userData.address)) {
        toast.error('Укажите адрес в валидном формате', toastOptions);
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  };

  const updateUserHandler = () => {
    if (isValid) {
      return toast.error('Укажите данные в валидном формате', toastOptions);
    }
    if (user) {
      if (userData.email && userData.password) {
        const updatedUserData = {
          ...user,
          address: userData.address,
          city: userData.city,
          passwordHash: userData.password,
          email: userData.email,
        };
        updateUser(updatedUserData);
        dispatch(setUser(updatedUserData));
      } else {
        const updatedUserData = {
          ...user,
          address: userData.address,
          city: userData.city,
        };
        updateUser(updatedUserData);
        dispatch(setUser(updatedUserData));
      }

      toast.success('Данные обновлены успешно', toastOptions);
    }

    if (isAuth) {
      toast.error('Войдите или зарегистрируйтесь', toastOptions);
    }
  };

  React.useEffect(() => {
    if (user) {
      setUserData({
        ...userData,
        address: user.address,
        city: user.city,
        email: user.email,
      });
    }
    if (cities) {
      setCitiesList(getValidCitiesList(cities));
    }
  }, [user, cities]);

  return (
    <div className={styles.settings}>
      <h2 className={styles.title}>Настройки</h2>
      <div className={styles.wrapper}>
        <div className={styles.fields}>
          <TextFiled
            placeholder="Укажите новый email"
            variant="sm"
            value={userData.email}
            onChange={(email) => setUserData({ ...userData, email })}
          />
          <TextFiled
            placeholder="Укажите новый пароль"
            variant="sm"
            value={userData.password}
            onChange={(password) => setUserData({ ...userData, password })}
          />
          {citiesList.length ? (
            <Dropdown
              activeElement={userData.city}
              items={citiesList}
              setActiveElement={(city) => setUserData({ ...userData, city })}
              isCitiesDropdown
            />
          ) : (
            <DropdownLoader />
          )}
          <TextFiled
            placeholder="Укажите адрес"
            variant="sm"
            value={userData.address}
            onChange={(address) => setUserData({ ...userData, address })}
            onBlur={validateAddressHandler}
          />
          <Button onClick={updateUserHandler} text="Обновить" type="basic" variant="sm" />
        </div>
        <div className={styles.info}>
          <div className={styles.infoBlock}>
            <h3>Изменение электронной почты и пароля</h3>
            <p>
              При изменении электроной почты или пароля при следующем входе на страницу необходимо
              вводить ноовые данные, старые значения уже не валидны
            </p>
          </div>
          <div className={styles.infoBlock}>
            <h3>Выбор города и адреса</h3>
            <p>
              Чтобы использовать возможность автозаказа в своих наборах необходимо указать город и
              адрес доставки, это информация будет использоваться по умолчанию и при оформлении
              заказа
            </p>
            <p>
              Адрес необходимо указывать в валидном формате. Валидный формат записи адреса:
              <span> Название улицы, номер дома, номер квартиры</span>. Например:
              <span> Проспект Ленина,182,34 | Лежена,293,81</span>
            </p>
            <p>Если вашего города нет в списке, то доставка не возможна</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
