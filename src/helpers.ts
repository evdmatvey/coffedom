import { ToastOptions } from 'react-toastify';
import { SelectedProduct } from './types/SelectedProduct';

export const getSort = (sort: number) => (sort === 0 ? 'rating' : sort === 1 ? 'title' : 'price');
export const getCategory = (category: number) => (category === 0 ? '1|2' : category);

export const getFormattedPhoneNumber = (phoneNumberString: string) => {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  let match = cleaned.match(/^(8|)?(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    const intlCode = match[1] ? '8 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4], '-', match[5]].join('');
  }
  return null;
};

export const autoOrderDaysList = [
  { id: 0, text: 'Понедельник' },
  { id: 1, text: 'Вторник' },
  { id: 2, text: 'Среда' },
  { id: 3, text: 'Четверг' },
  { id: 4, text: 'Пятница' },
  { id: 5, text: 'Суббота' },
  { id: 6, text: 'Воскресенье' },
  { id: 7, text: 'Пн-Пт' },
  { id: 8, text: 'Вт, Чт, Сб' },
  { id: 9, text: 'Пн, Ср, Пт' },
  { id: 10, text: 'Каждый день' },
];

export const getAutoOrderDays = (id: number) =>
  autoOrderDaysList.find((day) => day.id === id)?.text;

export const checkTime = (time: string) => /^(?:\d|[01]\d|2[0-3]):[0-5]\d$/.test(time);

export const getProductsAmountByType = (prodcuts: SelectedProduct[] | []) => {
  let totalAmount = [0, 0];
  prodcuts.forEach((product) =>
    product.size.includes('мл')
      ? (totalAmount[0] += product.amount)
      : (totalAmount[1] += product.amount),
  );

  const drinksLabel =
    totalAmount[0] === 0 || totalAmount[0] > 4
      ? 'напитков'
      : totalAmount[0] === 1
      ? 'напиток'
      : 'напитка';

  const snaksLabel =
    totalAmount[1] === 0 || totalAmount[1] > 4 ? 'снэков' : totalAmount[1] === 1 ? 'снэк' : 'снэка';

  return [`${totalAmount[0]} ${drinksLabel}`, `${totalAmount[1]} ${snaksLabel}`];
};

export const getTotalPrice = (products: SelectedProduct[] | []) => {
  let totalPrice = 0;

  products.forEach((product) => (totalPrice += product.price * product.amount));

  return totalPrice;
};

export const toastOptions: ToastOptions<{}> | undefined = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
  progress: undefined,
};
