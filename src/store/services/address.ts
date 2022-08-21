import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Address, City } from '../../types/Address';

export const addressApi = createApi({
  reducerPath: 'adressApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/address' }),
  endpoints: (builder) => ({
    getAddresses: builder.mutation({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: 'GET',
      }),
    }),
    getCities: builder.query<City[], void>({
      query: () => `/cities`,
    }),
  }),
});

export const { useGetAddressesMutation, useGetCitiesQuery } = addressApi;
