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
