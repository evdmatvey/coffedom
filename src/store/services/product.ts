import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../types/Product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/products' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string>({
      query: (query) => `/?${query}`,
    }),
    getProductsWithLimit: builder.query<Product[], number>({
      query: (limit) => `/?_limit=${limit}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductsWithLimitQuery } = productApi;
