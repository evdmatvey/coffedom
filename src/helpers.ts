export const getSort = (sort: number) => (sort === 0 ? 'rating' : sort === 1 ? 'title' : 'price');
export const getCategory = (category: number) => (category === 0 ? '1|2' : category);
