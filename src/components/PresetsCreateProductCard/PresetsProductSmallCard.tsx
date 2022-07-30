import React from 'react';
import { SelectedProduct } from '../../types/SelectedProduct';

import styles from './PresetsCreateProductCard.module.scss';

interface PresetsProductSmallCardProps {
  product: SelectedProduct;
}

const PresetsProductSmallCard: React.FC<PresetsProductSmallCardProps> = ({ product }) => {
  const { amount, imageUrl, size, title } = product;
  return (
    <div className={styles.cardSm}>
      <div className={styles.inner}>
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
        <div className={styles.amount}>x{amount}</div>
        <p>{size}</p>
      </div>
    </div>
  );
};

export default PresetsProductSmallCard;
