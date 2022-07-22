import React from 'react';

import styles from './Dropdown.module.scss';

interface DropdownProps {
  items: { id: number; text: string }[];
  basicText?: string;
  activeElement: number;
  setActiveElement: (id: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  activeElement,
  items,
  setActiveElement,
  basicText,
}) => {
  const [active, setActive] = React.useState(activeElement);
  const [isVisible, setIsVisible] = React.useState(false);

  const setActiveHandler = (id: number) => {
    setActive(id);
    setActiveElement(id);
    setIsVisible(false);
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={isVisible ? `${styles.title} ${styles.active}` : styles.title}
        onClick={() => setIsVisible(!isVisible)}>
        {basicText && basicText}
        <span> {items[active].text}</span>
      </div>
      {isVisible && (
        <ul>
          {items.map((item) => (
            <li
              className={active === item.id ? styles.activeItem : ''}
              key={item.id}
              onClick={() => setActiveHandler(item.id)}>
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
