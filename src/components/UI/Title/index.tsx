import React from 'react';

import styles from './Title.module.scss';

interface TitleProps {
  title: string;
  link: string;
}

const Title: React.FC<TitleProps> = ({ title, link }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <a className={styles.link} href="/">
        {link}
      </a>
    </div>
  );
};

export default Title;
