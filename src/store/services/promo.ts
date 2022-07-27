import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Promo } from '../../types/Promo';

export const promoApi = createApi({
  reducerPath: 'promoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/promo' }),
  endpoints: (builder) => ({
    getPromos: builder.query<Promo[], void>({
      query: () => `/`,
    }),
    getPromosWithLimit: builder.query<Promo[], number>({
      query: (limit) => `/?_limit=${limit}`,
    }),
  }),
});

export const { useGetPromosQuery, useGetPromosWithLimitQuery } = promoApi;
