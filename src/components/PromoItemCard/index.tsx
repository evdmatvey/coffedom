import React from 'react';
import { Promo } from '../../types/Promo';

import styles from './PromoItemCard.module.scss';

interface PromoItemCardProps {
  promo: Promo;
}

const PromoItemCard: React.FC<PromoItemCardProps> = ({ promo }) => {
  return (
    <div className={styles.card}>
      <img src={promo.imageUrl} alt="promo" />
      <div className={styles.info}>
        <h3>{promo.title}</h3>
        <p>{promo.text}</p>
      </div>
    </div>
  );
};

export default PromoItemCard;
