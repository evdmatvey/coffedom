import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/UI/Breadcrumb';
import svg from '../../assets/img/Basket/Vector.svg';
import './Basket.scss';

const Basket = () => {
  return (
    <div className="basket">
      <div className="basket__top">
        <div className="container">
          <Breadcrumb elements={[['Главная', '/']]} current="Корзина" />
          <h1>Корзина</h1>
        </div>
        <div className="container">
          <div className="basket__nav">
            <Link to="/basket" className="basket__link">
              <div className="img"></div>
              Заказать всё
            </Link>
            <Link to="/basket" className="basket__link basket__clear">
              <div className="img"></div>
              Очистить всё
            </Link>
          </div>
        </div>
      </div>
      <div className="basket__main">
        <div className="basket__main__one">
          <div className="container">
            <div className="tovar">
              <h1>Товары</h1>
            </div>
            <div className="basket__main__flex">
              <div className="basket__main__list">
                <div className="basket__main__list__block">
                  <div className="basket__main__list__block__item"></div>
                  <div className="basket__main__list__block__item"></div>
                  <div className="basket__main__list__block__item"></div>
                </div>
              </div>
              <div className="basket__main__pay">
                <div className="img">
                  <h1>Оплата</h1>
                </div>
                <div className="basket__main__pay__block"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
