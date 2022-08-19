import React from 'react';
import { Product } from '../../types/Product';
import { SelectedProduct } from '../../types/SelectedProduct';
import Counter from '../UI/Counter';

import styles from './PresetsCreateProductCard.module.scss';

interface PresetsCreateProductCardProps {
  product: Product;
  selectedProducts: [] | SelectedProduct[];
  setSelectedProducts: (selectedProduct: SelectedProduct[]) => void;
}

const PresetsCreateProductCard: React.FC<PresetsCreateProductCardProps> = ({
  product,
  selectedProducts,
  setSelectedProducts,
}) => {
  const { imageUrl, price: initialPrice, settings, title, _id } = product;
  const { sizes } = settings;

  const [totalPrice, setTotalPrice] = React.useState(initialPrice);
  const [amount, setAmount] = React.useState(1);
  const [activeSize, setActiveSize] = React.useState(sizes[0].name);

  const selectSizeHandler = (size: { price: number; name: string }) => {
    setActiveSize(size.name);
    setTotalPrice(initialPrice + size.price);
  };

  const addProductHandler = () => {
    const size = activeSize;
    const price = totalPrice;
    const selectedProduct: SelectedProduct = { _id, title, imageUrl, price, size, amount };
    const newSelectedProduct = selectedProducts.find(
      (product) => product.size === size && product._id === _id,
    );

    if (newSelectedProduct) {
      const index = [...selectedProducts].indexOf(newSelectedProduct);
      selectedProducts.splice(index, 1);
      newSelectedProduct.amount += amount;
      setSelectedProducts([...selectedProducts, newSelectedProduct]);
    } else {
      setSelectedProducts([...selectedProducts, selectedProduct]);
    }
  };

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt="product" />
      <h3>{title}</h3>
      <div className={styles.wrapper}>
        <ul>
          {sizes.map((size) => (
            <li
              key={size.price}
              className={activeSize === size.name ? styles.active : ''}
              onClick={() => selectSizeHandler(size)}>
              {size.name}
            </li>
          ))}
        </ul>
        <Counter amount={amount} setAmount={setAmount} />
      </div>
      <p>
        {totalPrice} <span>₽</span>
      </p>
      <button onClick={addProductHandler}>Добавить</button>
    </div>
  );
};

export default PresetsCreateProductCard;
