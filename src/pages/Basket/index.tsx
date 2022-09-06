import React from "react";
import { Link } from "react-router-dom";
import { CartCard } from "../../components/Cart/CartItem";
import CartPay from "../../components/CartPay/CartPay";
import Breadcrumb from "../../components/UI/Breadcrumb";
import { useAppSelector } from "../../hooks";
import { CartItem } from "../../types/Cart";
import "./Basket.scss";

const Basket = () => {
  const data = useAppSelector((state) => state.cart.items);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    setCartItems(data);
  }, [data]);

  return (
    <div className="basket">
      <div className="basket__top">
        <div className="container">
          <Breadcrumb elements={[["Главная", "/"]]} current="Корзина" />
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
                  {cartItems.length &&
                    cartItems.map((item) => (
                      <div className="basket__main__list__block__item">
                        <CartCard key={item._id} item={item} />
                      </div>
                    ))}
                </div>
              </div>
              <div className="basket__main__pay">
                <div className="img">
                  <h1>Оплата</h1>
                </div>
                <CartPay items={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;

//#A3A3A3;
