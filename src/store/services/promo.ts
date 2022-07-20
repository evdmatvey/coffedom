import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Promo } from '../../types/Promo';

export const promoApi = createApi({
  reducerPath: 'promoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/promo' }),
  endpoints: (builder) => ({
    getPromos: builder.query<Promo[], void>({
      query: () => `/`,
    }),
  }),
});

export const { useGetPromosQuery } = promoApi;
