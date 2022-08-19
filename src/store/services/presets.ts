import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Preset } from '../../types/Preset';

export const presetsApi = createApi({
  reducerPath: 'presetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/presets' }),
  endpoints: (builder) => ({
    getPresets: builder.query<Preset[], void>({
      query: () => `/`,
    }),
    getPresetsWithLimit: builder.query<Preset[], number>({
      query: (limit) => `/?_limit=${limit}`,
    }),
  }),
});

export const { useGetPresetsQuery, useGetPresetsWithLimitQuery } = presetsApi;
