import React from 'react';
import Filter from '../../components/FIlter';
import ProductCard from '../../components/ProductCard';
import ProductCardLoader from '../../components/ProductCard/ProductCardLoader';
import Breadcrumb from '../../components/UI/Breadcrumb';
import Dropdown from '../../components/UI/Dropdown';
import Search from '../../components/UI/Search';
import { getCategory, getSort } from '../../helpers';
import { useGetProductsQuery } from '../../store/services/product';

import './Catalog.scss';

const Catalog = () => {
  const [activeSize, setActiveSize] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [activeSort, setActiveSort] = React.useState(0);

  const category = getCategory(activeCategory);
  const sort = getSort(activeSort);

  const {
    data: products,
    isSuccess,
    isLoading,
  } = useGetProductsQuery(
    `title_like=${searchValue}&categoryId_like=${category}&_sort=${sort}&_order=desc`,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const skeletons = [...new Array(4)].map((_, i) => <ProductCardLoader key={i} />);
  const productItems =
    products &&
    products.map((product) => (
      <ProductCard key={product.id} activeItem={activeSize} product={product} />
    ));
  const notFoundProducts = products && products.length === 0 && (
    <div className="catalog__notfound">Таких товаров нет 😕</div>
  );

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
                  { id: 1, text: '250 мл. / 90  г.' },
                  { id: 2, text: '350 мл. / 120 г.' },
                  { id: 3, text: '450 мл. . 160 г.' },
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
                key={1}
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
                key={0}
                activeElement={activeSort}
                setActiveElement={setActiveSort}
                basicText="Сортировать по: "
                items={[
                  { id: 0, text: 'популярности' },
                  { id: 1, text: 'названию' },
                  { id: 2, text: 'цене' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="catalog__wrapper">
          {isSuccess && productItems}
          {isLoading && skeletons}
        </div>
        {notFoundProducts}
      </div>
    </div>
  );
};

export default Catalog;
