import React from 'react';
import { toast } from 'react-toastify';
import PresetsCreateProductCard from '../../components/PresetsCreateProductCard';
import PresetsCreateProductCardSmall from '../../components/PresetsCreateProductCard/PresetsCreateProductCardSmall';
import Breadcrumb from '../../components/UI/Breadcrumb';
import Dropdown from '../../components/UI/Dropdown';
import Search from '../../components/UI/Search';
import TextFiled from '../../components/UI/TextField';
import { useAppSelector } from '../../hooks';
import { useGetProductsQuery } from '../../store/services/product';
import { useAddUserPresetMutation } from '../../store/services/userPresets';
import { selectAuthState, selectUser } from '../../store/slices/userSlice';
import { SelectedProduct } from '../../types/SelectedProduct';

import {
  autoOrderDaysList,
  checkTime,
  getAutoOrderDays,
  getProductsAmountByType,
  getTotalPrice,
  toastOptions,
} from '../../helpers';

import './MyPresetsCreate.scss';
import Button from '../../components/UI/Button';

const MyPresetsCreate = () => {
  const isAuth = useAppSelector(selectAuthState);
  const user = useAppSelector(selectUser);

  const [presetData, setPresetData] = React.useState({
    title: '',
    searchValue: '',
    time: '',
    auto: 0,
    day: 0,
  });
  const [timeInputError, setTimeInputError] = React.useState(false);
  const [selectedProducts, setSelectedProducts] = React.useState<[] | SelectedProduct[]>([]);
  const { data: products } = useGetProductsQuery(`title_like=${presetData.searchValue}`);
  const [addUserPreset] = useAddUserPresetMutation();

  const [drinksAmount, snaksAmount] = getProductsAmountByType(selectedProducts);
  const totalPrice = getTotalPrice(selectedProducts);
  const autoOrderStatusText =
    presetData.auto !== 0 && !timeInputError
      ? `${getAutoOrderDays(presetData.day)}, ${presetData.time}`
      : 'Без автозаказа';

  const timeInputBlurHandler = (value: string) => {
    if (!checkTime(value)) {
      setTimeInputError(true);
      toast.error('Укажите время доставки в коректной форме', toastOptions);
    } else {
      setTimeInputError(false);
    }
  };

  const addToCartHandler = () => {
    if (!isAuth) {
      toast.error('Войдите или зарегистрируйтесь', toastOptions);
      return;
    }

    if (presetData.title === '') {
      toast.error('Придумайте название для набора', toastOptions);
      return;
    }

    if (presetData.time === '' && presetData.auto === 1) {
      toast.error('Укажите время доставки', toastOptions);
      return;
    }

    addUserPreset({
      userId: user?._id,
      title: presetData.title,
      products: selectedProducts,
      price: totalPrice,
      auto: presetData.auto,
      day: presetData.day,
      time: presetData.time,
    }).then(() => {
      toast.success('Набор успешно создан', toastOptions);
    });
  };

  return (
    <div className="presets-create">
      <div className="presets-create__top">
        <div className="container">
          <Breadcrumb
            elements={[
              ['Главная', '/'],
              ['Мои наборы', '/my-presets'],
            ]}
            current="Создание нового набора"
          />
          <h1>Создание нового набора</h1>
        </div>
      </div>
      <div className="container">
        <div className="presets-create__wrapper">
          <div className="presets-create__preset">
            <div className="presets-create__preset-top">
              <h2 className="presets-create__preset-title">
                {presetData.title !== '' ? presetData.title : 'Придумайте название набора'}
              </h2>
              {selectedProducts.length && (
                <div className="presets-create__preset-status">
                  <p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19.7499 2.33C19.6553 2.22515 19.5395 2.14153 19.4102 2.08465C19.281 2.02778 19.1411 1.99892 18.9999 2H4.99989C4.85867 1.99892 4.71881 2.02778 4.58954 2.08465C4.46027 2.14153 4.34451 2.22515 4.24989 2.33C4.15553 2.435 4.08446 2.55879 4.04137 2.69323C3.99828 2.82767 3.98415 2.9697 3.99989 3.11L5.79989 19.33C5.88146 20.0672 6.2332 20.748 6.78721 21.241C7.34123 21.7341 8.05825 22.0045 8.79989 22H15.2199C15.9615 22.0045 16.6786 21.7341 17.2326 21.241C17.7866 20.748 18.1383 20.0672 18.2199 19.33L19.9999 3.11C20.0156 2.9697 20.0015 2.82767 19.9584 2.69323C19.9153 2.55879 19.8443 2.435 19.7499 2.33ZM16.1999 19.11C16.1727 19.3557 16.0555 19.5827 15.8708 19.747C15.6861 19.9114 15.4471 20.0015 15.1999 20H8.78989C8.54268 20.0015 8.30367 19.9114 8.119 19.747C7.93433 19.5827 7.81708 19.3557 7.78989 19.11L6.77989 10H17.2199L16.1999 19.11ZM17.4399 8H6.55989L6.11989 4H17.8799L17.4399 8Z"
                        fill="#A3A3A3"
                      />
                    </svg>
                    {drinksAmount}
                  </p>
                  <p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19 2C18.7348 2 18.4804 2.10536 18.2929 2.29289C18.1054 2.48043 18 2.73478 18 3V8.46L17 9.13V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V9.13L14 8.46V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2C12.7348 2 12.4804 2.10536 12.2929 2.29289C12.1054 2.48043 12 2.73478 12 3V9C12.0009 9.16471 12.0424 9.32665 12.1209 9.47145C12.1994 9.61625 12.3124 9.73941 12.45 9.83L15 11.54V21C15 21.2652 15.1054 21.5196 15.2929 21.7071C15.4804 21.8946 15.7348 22 16 22C16.2652 22 16.5196 21.8946 16.7071 21.7071C16.8946 21.5196 17 21.2652 17 21V11.54L19.55 9.83C19.6876 9.73941 19.8006 9.61625 19.8791 9.47145C19.9576 9.32665 19.9991 9.16471 20 9V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2ZM9 2C7.67392 2 6.40215 2.52678 5.46447 3.46447C4.52678 4.40215 4 5.67392 4 7V13C4 13.2652 4.10536 13.5196 4.29289 13.7071C4.48043 13.8946 4.73478 14 5 14H8V21C8 21.2652 8.10536 21.5196 8.29289 21.7071C8.48043 21.8946 8.73478 22 9 22C9.26522 22 9.51957 21.8946 9.70711 21.7071C9.89464 21.5196 10 21.2652 10 21V3C10 2.73478 9.89464 2.48043 9.70711 2.29289C9.51957 2.10536 9.26522 2 9 2ZM8 12H6V7C5.99967 6.37935 6.19186 5.77387 6.55006 5.26702C6.90826 4.76016 7.41484 4.37688 8 4.17V12Z"
                        fill="#A3A3A3"
                      />
                    </svg>
                    {snaksAmount}
                  </p>
                </div>
              )}
              <div className="presets-create__preset-auto">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11 2C9.02219 2 7.08879 2.58649 5.4443 3.6853C3.79981 4.78412 2.51809 6.3459 1.76121 8.17317C1.00433 10.0004 0.806299 12.0111 1.19215 13.9509C1.578 15.8907 2.53041 17.6725 3.92894 19.0711C5.32746 20.4696 7.10929 21.422 9.0491 21.8079C10.9889 22.1937 12.9996 21.9957 14.8268 21.2388C16.6541 20.4819 18.2159 19.2002 19.3147 17.5557C20.4135 15.9112 21 13.9778 21 12C21 10.6868 20.7413 9.38642 20.2388 8.17317C19.7363 6.95991 18.9997 5.85752 18.0711 4.92893C17.1425 4.00035 16.0401 3.26375 14.8268 2.7612C13.6136 2.25866 12.3132 2 11 2V2ZM11 20C9.41775 20 7.87104 19.5308 6.55544 18.6518C5.23985 17.7727 4.21447 16.5233 3.60897 15.0615C3.00347 13.5997 2.84504 11.9911 3.15372 10.4393C3.4624 8.88743 4.22433 7.46197 5.34315 6.34315C6.46197 5.22433 7.88743 4.4624 9.43928 4.15372C10.9911 3.84504 12.5997 4.00346 14.0615 4.60896C15.5233 5.21447 16.7727 6.23984 17.6518 7.55544C18.5308 8.87103 19 10.4177 19 12C19 14.1217 18.1572 16.1566 16.6569 17.6569C15.1566 19.1571 13.1217 20 11 20V20ZM14.1 12.63L12 11.42V7C12 6.73478 11.8946 6.48043 11.7071 6.29289C11.5196 6.10536 11.2652 6 11 6C10.7348 6 10.4804 6.10536 10.2929 6.29289C10.1054 6.48043 10 6.73478 10 7V12C10 12 10 12.08 10 12.12C10.0059 12.1889 10.0228 12.2564 10.05 12.32C10.0706 12.3793 10.0974 12.4363 10.13 12.49C10.1574 12.5468 10.1909 12.6005 10.23 12.65L10.39 12.78L10.48 12.87L13.08 14.37C13.2324 14.4564 13.4048 14.5012 13.58 14.5C13.8014 14.5015 14.0171 14.4296 14.1932 14.2953C14.3693 14.1611 14.4959 13.9722 14.5531 13.7583C14.6103 13.5444 14.5948 13.3176 14.5092 13.1134C14.4236 12.9092 14.2726 12.7392 14.08 12.63H14.1Z"
                    fill="#A3A3A3"
                  />
                </svg>
                {autoOrderStatusText}
              </div>
            </div>
            <div className="presets-create__preset-products">
              {selectedProducts.length > 0 ? (
                selectedProducts.map((product) => (
                  <PresetsCreateProductCardSmall
                    key={`${product._id}${product.size}`}
                    product={product}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                  />
                ))
              ) : (
                <div className="presets-create__preset-empty">Товары не выбраны</div>
              )}
            </div>
            <div className="presets-create__preset-bottom">
              <div className="presets-create__preset-price">
                {totalPrice} <span>₽</span>
              </div>
              <Button
                onClick={addToCartHandler}
                text="Сохранить"
                type="basic"
                variant="md"
                disabled={selectedProducts.length === 0}
              />
            </div>
          </div>
          <div className="presets-create__settings">
            <div className="presets-create__settings-wrapper">
              <h2 className="presets-create__settings-title">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.21 13.29C6.11613 13.1974 6.00364 13.1258 5.88 13.08C5.63654 12.98 5.36346 12.98 5.12 13.08C4.9959 13.1249 4.8832 13.1966 4.78989 13.2899C4.69657 13.3832 4.62491 13.4959 4.58 13.62C4.51522 13.7721 4.48914 13.9378 4.50411 14.1025C4.51907 14.2671 4.57461 14.4254 4.66576 14.5633C4.7569 14.7012 4.88081 14.8144 5.0264 14.8927C5.17198 14.9709 5.3347 15.0119 5.5 15.0119C5.6653 15.0119 5.82802 14.9709 5.9736 14.8927C6.11919 14.8144 6.2431 14.7012 6.33424 14.5633C6.42539 14.4254 6.48093 14.2671 6.49589 14.1025C6.51086 13.9378 6.48478 13.7721 6.42 13.62C6.37241 13.4972 6.30104 13.3851 6.21 13.29ZM13.5 11H14.5C14.7652 11 15.0196 10.8946 15.2071 10.7071C15.3946 10.5196 15.5 10.2652 15.5 10C15.5 9.73478 15.3946 9.48043 15.2071 9.29289C15.0196 9.10536 14.7652 9 14.5 9H13.5C13.2348 9 12.9804 9.10536 12.7929 9.29289C12.6054 9.48043 12.5 9.73478 12.5 10C12.5 10.2652 12.6054 10.5196 12.7929 10.7071C12.9804 10.8946 13.2348 11 13.5 11V11ZM9.5 11H10.5C10.7652 11 11.0196 10.8946 11.2071 10.7071C11.3946 10.5196 11.5 10.2652 11.5 10C11.5 9.73478 11.3946 9.48043 11.2071 9.29289C11.0196 9.10536 10.7652 9 10.5 9H9.5C9.23478 9 8.98043 9.10536 8.79289 9.29289C8.60536 9.48043 8.5 9.73478 8.5 10C8.5 10.2652 8.60536 10.5196 8.79289 10.7071C8.98043 10.8946 9.23478 11 9.5 11V11ZM6.5 9H5.5C5.23478 9 4.98043 9.10536 4.79289 9.29289C4.60536 9.48043 4.5 9.73478 4.5 10C4.5 10.2652 4.60536 10.5196 4.79289 10.7071C4.98043 10.8946 5.23478 11 5.5 11H6.5C6.76522 11 7.01957 10.8946 7.20711 10.7071C7.39464 10.5196 7.5 10.2652 7.5 10C7.5 9.73478 7.39464 9.48043 7.20711 9.29289C7.01957 9.10536 6.76522 9 6.5 9ZM20 5H4C3.20435 5 2.44129 5.31607 1.87868 5.87868C1.31607 6.44129 1 7.20435 1 8V16C1 16.7956 1.31607 17.5587 1.87868 18.1213C2.44129 18.6839 3.20435 19 4 19H20C20.7956 19 21.5587 18.6839 22.1213 18.1213C22.6839 17.5587 23 16.7956 23 16V8C23 7.20435 22.6839 6.44129 22.1213 5.87868C21.5587 5.31607 20.7956 5 20 5ZM21 16C21 16.2652 20.8946 16.5196 20.7071 16.7071C20.5196 16.8946 20.2652 17 20 17H4C3.73478 17 3.48043 16.8946 3.29289 16.7071C3.10536 16.5196 3 16.2652 3 16V8C3 7.73478 3.10536 7.48043 3.29289 7.29289C3.48043 7.10536 3.73478 7 4 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V16ZM15 13H9C8.73478 13 8.48043 13.1054 8.29289 13.2929C8.10536 13.4804 8 13.7348 8 14C8 14.2652 8.10536 14.5196 8.29289 14.7071C8.48043 14.8946 8.73478 15 9 15H15C15.2652 15 15.5196 14.8946 15.7071 14.7071C15.8946 14.5196 16 14.2652 16 14C16 13.7348 15.8946 13.4804 15.7071 13.2929C15.5196 13.1054 15.2652 13 15 13ZM18.5 9H17.5C17.2348 9 16.9804 9.10536 16.7929 9.29289C16.6054 9.48043 16.5 9.73478 16.5 10C16.5 10.2652 16.6054 10.5196 16.7929 10.7071C16.9804 10.8946 17.2348 11 17.5 11H18.5C18.7652 11 19.0196 10.8946 19.2071 10.7071C19.3946 10.5196 19.5 10.2652 19.5 10C19.5 9.73478 19.3946 9.48043 19.2071 9.29289C19.0196 9.10536 18.7652 9 18.5 9ZM19.21 13.29C19.1149 13.199 19.0028 13.1276 18.88 13.08C18.6365 12.98 18.3635 12.98 18.12 13.08C17.9964 13.1258 17.8839 13.1974 17.79 13.29C17.699 13.3851 17.6276 13.4972 17.58 13.62C17.5217 13.7569 17.4947 13.905 17.5009 14.0537C17.5072 14.2023 17.5465 14.3477 17.6161 14.4792C17.6856 14.6107 17.7836 14.7251 17.903 14.8139C18.0223 14.9028 18.16 14.9638 18.3059 14.9927C18.4519 15.0216 18.6024 15.0176 18.7466 14.9809C18.8908 14.9442 19.025 14.8758 19.1394 14.7807C19.2538 14.6856 19.3455 14.5662 19.4079 14.4311C19.4703 14.296 19.5017 14.1488 19.5 14C19.5034 13.8688 19.476 13.7387 19.42 13.62C19.3724 13.4972 19.301 13.3851 19.21 13.29V13.29Z"
                    fill="#2FD9B9"
                  />
                </svg>
                Название набора
              </h2>
              <TextFiled
                variant="sm"
                placeholder="Введите название набора..."
                value={presetData.title}
                onChange={(title) => setPresetData({ ...presetData, title })}
              />
            </div>
            <div className="presets-create__settings-wrapper">
              <h2 className="presets-create__settings-title">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20.4898 7.52002C20.4841 7.49366 20.4841 7.46638 20.4898 7.44002C20.485 7.41694 20.485 7.3931 20.4898 7.37002V7.28002L20.4298 7.13002C20.4054 7.08909 20.3751 7.05202 20.3398 7.02002L20.2498 6.94002H20.1998L16.2598 4.45002L12.5398 2.15002C12.4538 2.08175 12.3553 2.03081 12.2498 2.00002H12.1698C12.0804 1.9851 11.9892 1.9851 11.8998 2.00002H11.7998C11.6837 2.02571 11.5723 2.06959 11.4698 2.13002L3.99982 6.78002L3.90982 6.85002L3.81982 6.93002L3.71982 7.00002L3.66982 7.06002L3.60982 7.21002V7.30002V7.36002C3.60011 7.42633 3.60011 7.49371 3.60982 7.56002V16.29C3.60948 16.46 3.65246 16.6272 3.7347 16.7759C3.81693 16.9246 3.93571 17.0499 4.07982 17.14L11.5798 21.78L11.7298 21.84H11.8098C11.979 21.8937 12.1606 21.8937 12.3298 21.84H12.4098L12.5598 21.78L19.9998 17.21C20.1439 17.1199 20.2627 16.9946 20.345 16.8459C20.4272 16.6972 20.4702 16.53 20.4698 16.36V7.63002C20.4698 7.63002 20.4898 7.56002 20.4898 7.52002ZM11.9998 4.17002L13.7798 5.27002L8.18982 8.73002L6.39982 7.63002L11.9998 4.17002ZM10.9998 19.17L5.49982 15.81V9.42002L10.9998 12.82V19.17ZM11.9998 11.06L10.0898 9.91002L15.6798 6.44002L17.5998 7.63002L11.9998 11.06ZM18.4998 15.78L12.9998 19.2V12.82L18.4998 9.42002V15.78Z"
                    fill="#2FD9B9"
                  />
                </svg>
                Товары
              </h2>
              <Search
                variant="sm"
                searchText={presetData.searchValue}
                setSearchText={(search) => setPresetData({ ...presetData, searchValue: search })}
              />
            </div>
            <div className="presets-create__settings-products">
              {products &&
                products.map((product) => (
                  <PresetsCreateProductCard
                    key={product._id}
                    product={product}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                  />
                ))}
            </div>
            <div className="presets-create__settings-auto">
              <h2 className="presets-create__settings-title">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11 2C9.02219 2 7.08879 2.58649 5.4443 3.6853C3.79981 4.78412 2.51809 6.3459 1.76121 8.17317C1.00433 10.0004 0.806299 12.0111 1.19215 13.9509C1.578 15.8907 2.53041 17.6725 3.92894 19.0711C5.32746 20.4696 7.10929 21.422 9.0491 21.8079C10.9889 22.1937 12.9996 21.9957 14.8268 21.2388C16.6541 20.4819 18.2159 19.2002 19.3147 17.5557C20.4135 15.9112 21 13.9778 21 12C21 10.6868 20.7413 9.38642 20.2388 8.17317C19.7363 6.95991 18.9997 5.85752 18.0711 4.92893C17.1425 4.00035 16.0401 3.26375 14.8268 2.7612C13.6136 2.25866 12.3132 2 11 2V2ZM11 20C9.41775 20 7.87104 19.5308 6.55544 18.6518C5.23985 17.7727 4.21447 16.5233 3.60897 15.0615C3.00347 13.5997 2.84504 11.9911 3.15372 10.4393C3.4624 8.88743 4.22433 7.46197 5.34315 6.34315C6.46197 5.22433 7.88743 4.4624 9.43928 4.15372C10.9911 3.84504 12.5997 4.00346 14.0615 4.60896C15.5233 5.21447 16.7727 6.23984 17.6518 7.55544C18.5308 8.87103 19 10.4177 19 12C19 14.1217 18.1572 16.1566 16.6569 17.6569C15.1566 19.1571 13.1217 20 11 20V20ZM14.1 12.63L12 11.42V7C12 6.73478 11.8946 6.48043 11.7071 6.29289C11.5196 6.10536 11.2652 6 11 6C10.7348 6 10.4804 6.10536 10.2929 6.29289C10.1054 6.48043 10 6.73478 10 7V12C10 12 10 12.08 10 12.12C10.0059 12.1889 10.0228 12.2564 10.05 12.32C10.0706 12.3793 10.0974 12.4363 10.13 12.49C10.1574 12.5468 10.1909 12.6005 10.23 12.65L10.39 12.78L10.48 12.87L13.08 14.37C13.2324 14.4564 13.4048 14.5012 13.58 14.5C13.8014 14.5015 14.0171 14.4296 14.1932 14.2953C14.3693 14.1611 14.4959 13.9722 14.5531 13.7583C14.6103 13.5444 14.5948 13.3176 14.5092 13.1134C14.4236 12.9092 14.2726 12.7392 14.08 12.63H14.1Z"
                    fill="#2FD9B9"
                  />
                </svg>
                Автозаказ
              </h2>
              <div className="presets-create__auto-wrapper">
                <div className="presets-create__auto-inner">
                  <button
                    className={
                      presetData.auto === 0
                        ? 'presets-create__auto-button active'
                        : 'presets-create__auto-button'
                    }
                    onClick={() => setPresetData({ ...presetData, auto: 0 })}>
                    Без автозаказа
                  </button>
                  <button
                    className={
                      presetData.auto === 1
                        ? 'presets-create__auto-button active'
                        : 'presets-create__auto-button'
                    }
                    onClick={() => setPresetData({ ...presetData, auto: 1 })}>
                    Автозаказ
                  </button>
                </div>
                {presetData.auto !== 0 && (
                  <div className="presets-create__auto-inner">
                    <Dropdown
                      activeElement={presetData.day}
                      setActiveElement={(day) => setPresetData({ ...presetData, day })}
                      isDropdownSm
                      items={autoOrderDaysList}
                    />
                    <TextFiled
                      variant="changing"
                      placeholder="Введите время (п. 12:00)"
                      onChange={(time) => setPresetData({ ...presetData, time })}
                      value={presetData.time}
                      onBlur={(e) => timeInputBlurHandler(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPresetsCreate;
