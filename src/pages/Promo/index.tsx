import React from 'react';
import PromoItemCard from '../../components/PromoItemCard';
import Breadcrumb from '../../components/UI/Breadcrumb';
import { useGetPromosQuery } from '../../store/services/promo';

import './Promo.scss';

const Promo = () => {
  const { data: promos } = useGetPromosQuery();

  return (
    <div className="promo">
      <div className="promo__top">
        <div className="container">
          <Breadcrumb elements={[['Главная', '/']]} current="Акции" />
          <h1>Акции</h1>
        </div>
      </div>
      <div className="container">
        <div className="promo__wrapper">
          {promos && promos.map((promo) => <PromoItemCard key={promo.id} promo={promo} />)}
        </div>
      </div>
    </div>
  );
};

export default Promo;
