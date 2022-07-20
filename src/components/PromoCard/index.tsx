import React from 'react';
import { Promo } from '../../types/Promo';
import Modal from '../UI/Modal';

import styles from './PromoCard.module.scss';

interface PromoCardProps {
  promo: Promo;
}

const PromoCard: React.FC<PromoCardProps> = ({ promo }) => {
  const { title, text, imageUrl } = promo;
  const [active, setActive] = React.useState(false);

  return (
    <>
      <div className={styles.card} onClick={() => setActive(true)}>
        <img src={imageUrl} alt="promo" />
        <h3>{title}</h3>
      </div>
      {active && (
        <Modal
          active={active}
          setActive={setActive}
          imageUrl={imageUrl}
          text={text}
          title={title}
        />
      )}
    </>
  );
};

export default PromoCard;
