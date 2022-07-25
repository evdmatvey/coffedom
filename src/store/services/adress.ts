import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Adress, City, Shop } from '../../types/Adress';

export const adressApi = createApi({
  reducerPath: 'adressApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getAdresses: builder.query<Adress[], string>({
      query: (query) => `/adresses/?${query}`,
    }),
    getShops: builder.query<Shop[], string>({
      query: (query) => `/shops/?${query}`,
    }),
    getCities: builder.query<City[], void>({
      query: () => `cities`,
    }),
  }),
});

export const { useGetAdressesQuery, useGetCitiesQuery, useGetShopsQuery } = adressApi;
