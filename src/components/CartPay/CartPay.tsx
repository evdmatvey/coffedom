import React from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../../types/Cart";
import styles from "./CartPay.module.scss";

interface CartPayProps {
  items: CartItem[];
}

const CartPay: React.FC<CartPayProps> = ({ items }) => {
  const totalPrice = items.reduce((accumulator, currentValue, i) => {
    return accumulator + currentValue.price;
  }, 0);

  return (
    <div className={styles.pay}>
      <div className={styles.block}>
        <div className="pay__block__item__el">Сумма заказа:</div>
        <div className="pay__block__item__el">{totalPrice} ₽</div>
      </div>
      <div className={styles.block}>
        <div className="pay__block__item__el">Стоимость доставки:</div>
        <div className="pay__block__item__el">150 ₽</div>
      </div>
      <div className={styles.block}>
        <div className="pay__block__item__el">Количество товаров:</div>
        <div className="pay__block__item__el">12</div>
      </div>
      <div className={styles.block}>
        <div className="pay__block__item__el">Итого:</div>
        <div className="pay__block__item__el">123 ₽</div>
      </div>

      <div className="pay__block__flex">
        {/* <Link to="/basket" className="basket__link">
          <div className="img"></div>
          Заказать всё
        </Link>
        <button className="basket__link basket__clear">
          <div className="img"></div>
          Очистить
        </button> */}
      </div>
    </div>
  );
};

export default CartPay;
