import React from 'react';
import { Outlet } from 'react-router-dom';
import Breadcrumb from '../../components/UI/Breadcrumb';
import { useAppSelector } from '../../hooks';
import ProfileSidebar from '../../components/ProfileSidebar';
import { selectUser } from '../../store/slices/userSlice';

import './Profile.scss';

const Profile = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="profile">
      <div className="profile__top">
        <div className="container">
          <Breadcrumb elements={[['Главная', '/']]} current="Профиль" />
          <h1>{user?.name}</h1>
        </div>
      </div>
      <div className="container">
        <div className="profile__content">
          <ProfileSidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
