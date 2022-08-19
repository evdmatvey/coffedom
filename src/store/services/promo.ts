import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Promo } from '../../types/Promo';

export const promoApi = createApi({
  reducerPath: 'promoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/promos/' }),
  endpoints: (builder) => ({
    getPromos: builder.query<Promo[], void>({
      query: () => `/`,
    }),
    getPromosWithLimit: builder.query<Promo[], number>({
      query: (limit) => `/?limit=${limit}`,
    }),
  }),
});

export const { useGetPromosQuery, useGetPromosWithLimitQuery } = promoApi;
