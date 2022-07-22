import React from 'react';

import styles from './Filter.module.scss';

interface FilterProps {
  filters: { id: number; text: string }[];
  activeItem: number;
  setActiveItem: (id: number) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, activeItem, setActiveItem }) => {
  const [active, setActive] = React.useState(activeItem);

  const setActiveHandler = (id: number) => {
    setActive(id);
    setActiveItem(id);
  };

  return (
    <ul className={styles.filter}>
      {filters.map((filter) => (
        <li
          key={filter.id}
          onClick={() => setActiveHandler(filter.id)}
          className={active === filter.id ? `${styles.active} ${styles.item}` : styles.item}>
          {filter.text}
        </li>
      ))}
    </ul>
  );
};

export default Filter;
