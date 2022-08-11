import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Breadcrumb from '../../components/UI/Breadcrumb';
import UserPresetCard from '../../components/UserPresetCard';
import { toastOptions } from '../../helpers';
import { useAppSelector } from '../../hooks';
import { useGetUserPresetsMutation } from '../../store/services/userPresets';
import { selectUser } from '../../store/slices/userSlice';
import { UserPreset } from '../../types/UserPreset';

import './MyPresets.scss';

const MyPresets = () => {
  const user = useAppSelector(selectUser);

  const [userPresets, setUserPresets] = React.useState<UserPreset[]>([]);
  const [getUserPresets] = useGetUserPresetsMutation();

  React.useEffect(() => {
    if (user) {
      getUserPresets(user.id)
        .unwrap()
        .then((data) => setUserPresets(data));
    } else {
      toast.error('Войдите или зарегистрируйтесь', toastOptions);
    }
  }, [user]);

  return (
    <div className="my-presets">
      <div className="my-presets__top">
        <div className="container">
          <Breadcrumb elements={[['Главная', '/']]} current="Мои наборы" />
          <h1>Мои наборы</h1>
          <Link to="/my-presets/create" className="my-presets__link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 7.23999C22.0008 7.10838 21.9756 6.97792 21.9258 6.85608C21.876 6.73424 21.8027 6.62343 21.71 6.52999L17.47 2.28999C17.3766 2.1973 17.2658 2.12398 17.1439 2.07421C17.0221 2.02445 16.8916 1.99923 16.76 1.99999C16.6284 1.99923 16.4979 2.02445 16.3761 2.07421C16.2543 2.12398 16.1435 2.1973 16.05 2.28999L13.22 5.11999L2.29002 16.05C2.19734 16.1434 2.12401 16.2542 2.07425 16.3761C2.02448 16.4979 1.99926 16.6284 2.00002 16.76V21C2.00002 21.2652 2.10537 21.5196 2.29291 21.7071C2.48045 21.8946 2.7348 22 3.00002 22H7.24002C7.37994 22.0076 7.51991 21.9857 7.65084 21.9358C7.78176 21.8858 7.90073 21.8089 8.00002 21.71L18.87 10.78L21.71 7.99999C21.8013 7.90307 21.8757 7.79152 21.93 7.66999C21.9397 7.59028 21.9397 7.5097 21.93 7.42999C21.9347 7.38344 21.9347 7.33654 21.93 7.28999L22 7.23999ZM6.83002 20H4.00002V17.17L13.93 7.23999L16.76 10.07L6.83002 20ZM18.17 8.65999L15.34 5.82999L16.76 4.41999L19.58 7.23999L18.17 8.65999Z"
                fill="white"
              />
            </svg>
            Создать
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="my-presets__wrapper">
          {user && userPresets.length === 0 ? (
            <div className="my-presets__empty">Вы ещё не создали свои наборы</div>
          ) : (
            <div className="my-presets__items">
              {userPresets.map((preset) => (
                <UserPresetCard
                  key={preset.id}
                  preset={preset}
                  presets={userPresets}
                  setPresets={setUserPresets}
                />
              ))}
            </div>
          )}
          {!user && (
            <div className="my-presets__empty">
              Войдите или зарегистрируйтесь, чтобы просматривать свои наборы
            </div>
          )}
          <div className="my-presets__info">
            <h2 className="my-presets__info-title">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.9998 22.6667H17.3332C19.1013 22.6667 20.797 21.9643 22.0472 20.714C23.2975 19.4638 23.9998 17.7681 23.9998 16V14.6667H25.3332C26.394 14.6667 27.4115 14.2452 28.1616 13.4951C28.9117 12.7449 29.3332 11.7275 29.3332 10.6667C29.3332 9.6058 28.9117 8.58839 28.1616 7.83824C27.4115 7.08809 26.394 6.66667 25.3332 6.66667H23.9998V5.33333C23.9998 4.97971 23.8594 4.64057 23.6093 4.39052C23.3593 4.14048 23.0201 4 22.6665 4H6.6665C6.31288 4 5.97374 4.14048 5.7237 4.39052C5.47365 4.64057 5.33317 4.97971 5.33317 5.33333V16C5.33317 17.7681 6.03555 19.4638 7.28579 20.714C8.53603 21.9643 10.2317 22.6667 11.9998 22.6667ZM23.9998 9.33333H25.3332C25.6868 9.33333 26.0259 9.47381 26.276 9.72386C26.526 9.97391 26.6665 10.313 26.6665 10.6667C26.6665 11.0203 26.526 11.3594 26.276 11.6095C26.0259 11.8595 25.6868 12 25.3332 12H23.9998V9.33333ZM7.99984 6.66667H21.3332V16C21.3332 17.0609 20.9117 18.0783 20.1616 18.8284C19.4115 19.5786 18.394 20 17.3332 20H11.9998C10.939 20 9.92156 19.5786 9.17141 18.8284C8.42126 18.0783 7.99984 17.0609 7.99984 16V6.66667ZM27.9998 25.3333H3.99984C3.64622 25.3333 3.30708 25.4738 3.05703 25.7239C2.80698 25.9739 2.6665 26.313 2.6665 26.6667C2.6665 27.0203 2.80698 27.3594 3.05703 27.6095C3.30708 27.8595 3.64622 28 3.99984 28H27.9998C28.3535 28 28.6926 27.8595 28.9426 27.6095C29.1927 27.3594 29.3332 27.0203 29.3332 26.6667C29.3332 26.313 29.1927 25.9739 28.9426 25.7239C28.6926 25.4738 28.3535 25.3333 27.9998 25.3333Z"
                  fill="#2FD9B9"
                />
              </svg>
              Что такое мои наборы?
            </h2>
            <p className="my-presets__info-text">
              Вы можете создавать наборы из любимых продуктов. Это позволит вам быстрее добавить
              товары в корзину. А также мы добавили возможность полной автоматизации заказа! Для
              этого вам необходимо:
            </p>
            <ul className="my-presets__info-list">
              <li>Выбрать “автозаказ” при создании набора</li>
              <li>Выбрать удобное для вас время</li>
              <li>Указать адрес для доставки в настройках профиля</li>
            </ul>
            <p className="my-presets__info-text">
              При необходимости вы сможете выключить “автозаказ” или изменить его настройти в любой
              момент
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPresets;
