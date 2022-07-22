import React from 'react';
import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from '../../types/Product';
import ProductCard from '../ProductCard';

import styles from './CatalogSlider.module.scss';

interface CatalogSliderProps {
  products: Product[];
}

const CatalogSlider: React.FC<CatalogSliderProps> = ({ products }) => {
  return (
    <div className={styles.wrapper}>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        className={styles.slider}
        modules={[Autoplay, Navigation]}
        direction="horizontal"
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        observer={true}
        observeParents={true}
        parallax={true}
        loop={true}
        speed={500}
        autoplay={{ delay: 7000, disableOnInteraction: true }}
        freeMode={true}>
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={styles.prev + ' prev'}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.29 11.9999L14.83 8.45995C15.0163 8.27259 15.1208 8.01913 15.1208 7.75495C15.1208 7.49076 15.0163 7.23731 14.83 7.04995C14.737 6.95622 14.6264 6.88183 14.5046 6.83106C14.3827 6.78029 14.252 6.75415 14.12 6.75415C13.988 6.75415 13.8573 6.78029 13.7354 6.83106C13.6136 6.88183 13.503 6.95622 13.41 7.04995L9.17 11.2899C9.07628 11.3829 9.00188 11.4935 8.95111 11.6154C8.90035 11.7372 8.87421 11.8679 8.87421 11.9999C8.87421 12.132 8.90035 12.2627 8.95111 12.3845C9.00188 12.5064 9.07628 12.617 9.17 12.7099L13.41 16.9999C13.5034 17.0926 13.6143 17.166 13.7361 17.2157C13.8579 17.2655 13.9884 17.2907 14.12 17.2899C14.2516 17.2907 14.3821 17.2655 14.5039 17.2157C14.6257 17.166 14.7366 17.0926 14.83 16.9999C15.0163 16.8126 15.1208 16.5591 15.1208 16.2949C15.1208 16.0308 15.0163 15.7773 14.83 15.5899L11.29 11.9999Z"
            fill="white"
          />
        </svg>
      </button>
      <button className={styles.next + ' next'}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.8299 11.2899L10.5899 7.04995C10.497 6.95622 10.3864 6.88183 10.2645 6.83106C10.1427 6.78029 10.012 6.75415 9.87994 6.75415C9.74793 6.75415 9.61723 6.78029 9.49537 6.83106C9.37351 6.88183 9.26291 6.95622 9.16994 7.04995C8.98369 7.23731 8.87915 7.49076 8.87915 7.75495C8.87915 8.01913 8.98369 8.27259 9.16994 8.45995L12.7099 11.9999L9.16994 15.5399C8.98369 15.7273 8.87915 15.9808 8.87915 16.2449C8.87915 16.5091 8.98369 16.7626 9.16994 16.9499C9.26338 17.0426 9.3742 17.116 9.49604 17.1657C9.61787 17.2155 9.74834 17.2407 9.87994 17.2399C10.0115 17.2407 10.142 17.2155 10.2638 17.1657C10.3857 17.116 10.4965 17.0426 10.5899 16.9499L14.8299 12.7099C14.9237 12.617 14.9981 12.5064 15.0488 12.3845C15.0996 12.2627 15.1257 12.132 15.1257 11.9999C15.1257 11.8679 15.0996 11.7372 15.0488 11.6154C14.9981 11.4935 14.9237 11.3829 14.8299 11.2899Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default CatalogSlider;
