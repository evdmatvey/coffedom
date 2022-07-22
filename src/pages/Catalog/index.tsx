import React from 'react';
import Filter from '../../components/FIlter';
import ProductCard from '../../components/ProductCard';
import Breadcrumb from '../../components/UI/Breadcrumb';
import Dropdown from '../../components/UI/Dropdown';
import Search from '../../components/UI/Search';
import { useGetProductsQuery } from '../../store/services/product';

import './Catalog.scss';

const Catalog = () => {
  const { data: products } = useGetProductsQuery();

  const [activeSize, setActiveSize] = React.useState(0);
  const [activeWeight, setActiveWeight] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [activeSort, setActiveSort] = React.useState(0);

  return (
    <div className="catalog">
      <div className="catalog__top">
        <div className="container">
          <Breadcrumb elements={[['Главная', '/']]} current={'Каталог'} />
          <h1>Каталог</h1>
        </div>
        <div className="container">
          <div className="catalog__top-wrapper">
            <div className="catalog__top-item">
              <h3 className="catalog__top-title">Обьём/вес</h3>
              <Filter
                activeItem={activeSize}
                setActiveItem={setActiveSize}
                filters={[
                  { id: 0, text: 'Любой' },
                  { id: 1, text: '250 мл.' },
                  { id: 2, text: '350 мл.' },
                  { id: 3, text: '450 мл.' },
                ]}
              />
              <Filter
                activeItem={activeWeight}
                setActiveItem={setActiveWeight}
                filters={[
                  { id: 0, text: 'Любой' },
                  { id: 1, text: '250 мл.' },
                  { id: 2, text: '350 мл.' },
                  { id: 3, text: '450 мл.' },
                ]}
              />
            </div>
            <div className="catalog__top-item">
              <h3 className="catalog__top-title">Поиск</h3>
              <Search searchText={searchValue} setSearchText={setSearchValue} />
            </div>
            <div className="catalog__top-item">
              <h3 className="catalog__top-title">Категории</h3>
              <Dropdown
                activeElement={activeCategory}
                setActiveElement={setActiveCategory}
                items={[
                  { id: 0, text: 'Все' },
                  { id: 1, text: 'Напитки' },
                  { id: 2, text: 'Снэки' },
                ]}
              />
            </div>
            <div className="catalog__top-item">
              <h3 className="catalog__top-title">Сортировка</h3>
              <Dropdown
                activeElement={activeSort}
                setActiveElement={setActiveSort}
                basicText="Сортировать по: "
                items={[
                  { id: 0, text: 'популярности' },
                  { id: 1, text: 'рэйтингу' },
                  { id: 2, text: 'цене' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="catalog__wrapper">
          {products &&
            products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
