import React from 'react';
import { Product } from '../../types/Product';

import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  activeItem?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, activeItem }) => {
  let size = activeItem ? activeItem - 1 : 0;

  React.useEffect(() => {
    setActiveSize(size);
  }, [activeItem, size]);

  const { title, imageUrl, price, settings } = product;
  const [totalPrice, setTotalPrice] = React.useState(price);
  const [activeMilk, setActiveMilk] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(size);
  const [activeIngredient, setActiveIngredient] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let calc =
      price +
      settings.milk[activeMilk].price +
      settings.sizes[activeSize].price +
      settings.sizes[activeIngredient].price;
    if (count > 0) {
      calc = calc * count;
    }
    setTotalPrice(calc);
  }, [activeIngredient, activeMilk, activeSize, count]);

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt="product" />
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {settings.milk.map((milkElem, index) => (
            <li
              key={milkElem.name}
              className={index === activeMilk ? styles.active : ''}
              onClick={() => setActiveMilk(index)}>
              {milkElem.name}
            </li>
          ))}
        </ul>
        <ul className={styles.list}>
          {settings.sizes.map((size, index) => (
            <li
              key={size.name}
              className={index === activeSize ? styles.active : ''}
              onClick={() => setActiveSize(index)}>
              {size.name}
            </li>
          ))}
        </ul>
        <ul className={styles.list}>
          {settings.ingredients.map((ingredient, index) => (
            <li
              key={ingredient.name}
              className={index === activeIngredient ? styles.active : ''}
              onClick={() => setActiveIngredient(index)}>
              {ingredient.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.price}>
          {totalPrice}
          <span>₽</span>
        </div>
        <button onClick={() => setCount(count + 1)}>
          В корзину {count > 0 && <span>{count}</span>}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
