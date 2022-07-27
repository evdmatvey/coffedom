import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Title.module.scss';

interface TitleProps {
  title: string;
  link: string;
  to: string;
}

const Title: React.FC<TitleProps> = ({ title, link, to }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <Link className={styles.link} to={to}>
        {link}
      </Link>
    </div>
  );
};

export default Title;
