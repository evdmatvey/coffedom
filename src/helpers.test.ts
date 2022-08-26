import {
  getValidCitiesList,
  getValidAddressesList,
  getCityIdByIndex,
  isUserAddressValid,
} from './helpers';

describe('getValidCitiesList', () => {
  test('Один город', () => {
    expect(getValidCitiesList([{ _id: 'jwjhfjhsjdhfjsf', text: 'Москва' }])).toEqual([
      { id: 0, text: 'Москва' },
    ]);
  });
  test('Несколько городов', () => {
    expect(
      getValidCitiesList([
        { _id: 'jwjhfjhsjdhfjsf', text: 'Москва' },
        { _id: 'j2n3j23n2jn3m2nm32nm3', text: 'Санкт-Петербург' },
      ]),
    ).toEqual([
      { id: 0, text: 'Москва' },
      { id: 1, text: 'Санкт-Петербург' },
    ]);
  });
  test('Городов нет', () => {
    expect(getValidCitiesList([])).toEqual([]);
  });
});

describe('getValidAddressesList', () => {
  test('Один адрес', () => {
    expect(
      getValidAddressesList([
        {
          _id: '6301fc0514354bb88bdcf645',
          text: 'Спартаковская ул., 43',
          cityId: '6301fa5014354bb88bdcf62e',
          desc: {
            phone: '8000989898',
            status: 'Открыто',
            workTime: '6:00-23:00',
          },
        },
      ]),
    ).toEqual([{ id: 0, text: 'Спартаковская ул., 43' }]);
  });
  test('Несколько адресов', () => {
    expect(
      getValidAddressesList([
        {
          _id: '6301fc0514354bb88bdcf645',
          text: 'Спартаковская ул., 43',
          cityId: '6301fa5014354bb88bdcf62e',
          desc: {
            phone: '8000989898',
            status: 'Открыто',
            workTime: '6:00-23:00',
          },
        },
        {
          desc: {
            phone: '80008888888',
            status: 'Открыто',
            workTime: '6:00-23:00',
          },
          _id: '6301fc1d14354bb88bdcf647',
          text: 'ул. Касаткина, 11',
          cityId: '6301fa5014354bb88bdcf62e',
        },
      ]),
    ).toEqual([
      { id: 0, text: 'Спартаковская ул., 43' },
      { id: 1, text: 'ул. Касаткина, 11' },
    ]);
  });
  test('Адресов нет', () => {
    expect(getValidAddressesList([])).toEqual([]);
  });
});

describe('getCityIdByIndex', () => {
  test('Корректный индекс', () => {
    expect(
      getCityIdByIndex(3, [
        {
          _id: '6301fa2314354bb88bdcf626',
          text: 'Москва',
        },
        {
          _id: '6301fa3514354bb88bdcf628',
          text: 'Санкт-Петербург',
        },
        {
          _id: '6301fa3d14354bb88bdcf62a',
          text: 'Новосибирск',
        },
        {
          _id: '6301fa4914354bb88bdcf62c',
          text: 'Екатеринбург',
        },
        {
          _id: '6301fa5014354bb88bdcf62e',
          text: 'Казань',
        },
      ]),
    ).toBe('6301fa4914354bb88bdcf62c');
  });
});

describe('isUserAddressValid', () => {
  test('Корректный адрес', () => {
    expect(isUserAddressValid('ул. Пушкина,12,32')).toBe(true);
  });
  test('Не корректный адрес', () => {
    expect(isUserAddressValid('ул. Пушкина, дом 12 кв. 32')).toBe(false);
  });
  test('Не корректный адрес', () => {
    expect(isUserAddressValid('12')).toBe(false);
  });
});
