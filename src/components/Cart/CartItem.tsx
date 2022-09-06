import React from "react";
import "../Cart/Cart.scss";
import a from "../../assets/img/Basket/delete.png";
import plus from "../../assets/img/Basket/plus.png";
import minus from "../../assets/img/Basket/minus.png";
import { CartItem } from "../../types/Cart";
import { updateCart } from "../../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useUpdateProductToCartMutation } from "../../store/services/cart";
import debounce from "lodash.debounce";

interface CartsProps {
  item: CartItem;
}

export const CartCard: React.FC<CartsProps> = ({ item }) => {
  const [appProductToBag] = useUpdateProductToCartMutation();

  const [count, setCount] = React.useState(item.amount);
  const [totalPrice, setTotalPrice] = React.useState(item.price);

  const cartItems: CartItem[] = useAppSelector((state) => state.cart.items);

  const [updateElement] = useUpdateProductToCartMutation();
  const dispatch = useAppDispatch();
  const deleteItemHandler: (itemId: string) => void = (itemId) => {
    const cartItemsWithoutDeleted: CartItem[] = cartItems.filter(
      (item) => item._id !== itemId
    );

    updateElement({ items: cartItemsWithoutDeleted })
      .unwrap()
      .then((data) => dispatch(updateCart(data)));
  };

  const price = item.price / item.amount;

  const syncCartItemData = () => {
    const updatedCartItem = { ...item, amount: count, price: totalPrice };
    const newUpdatedCartItem = cartItems.find((elem) => elem._id === item._id);
    console.log(updatedCartItem);

    if (newUpdatedCartItem) {
      const index = cartItems.indexOf(newUpdatedCartItem);
      const newCartItems = ([...cartItems][index] = updatedCartItem);
      console.log(newCartItems);

      appProductToBag({
        items: newCartItems,
      })
        .unwrap()
        .then((data) => {
          dispatch(updateCart(data));
        });
    }
  };

  const syncUpdate = React.useCallback(debounce(syncCartItemData, 200), []);

  const updateItemAmountHandler: (type: "plus" | "minus") => void = (type) => {
    if (type === "minus") {
      if (count - 1 === 0) {
        deleteItemHandler(item._id);
      } else {
        setTotalPrice(totalPrice - price);
        setCount(count - 1);
      }
    }
    if (type === "plus") {
      setTotalPrice(totalPrice + price);
      setCount(count + 1);
    }

    syncUpdate();
  };

  return (
    <div className="cart">
      <img className="cart__image" src={item.imageUrl} alt="avatarka" />
      <div className="cart__title">{item.title}</div>
      <div className="cart__settings">{item.settings.join(" / ")}</div>
      <div className="cart__price">
        {totalPrice}
        <span className="cart__price__ruble">₽</span>
      </div>
      <div className="cart__count">
        <img
          src={minus}
          alt="a"
          onClick={() => updateItemAmountHandler("minus")}
          className="cart__count__image"
        />
        <div className="cart__count__el">{count}</div>
        <img
          alt="a"
          src={plus}
          onClick={() => updateItemAmountHandler("plus")}
          className="cart__count__image"
        />
      </div>
      <img
        alt="a"
        onClick={() => deleteItemHandler(item._id)}
        src={a}
        className="cart__delete"
      />
    </div>
  );
};
