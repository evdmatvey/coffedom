import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Preset } from '../../types/Preset';

export const presetsApi = createApi({
  reducerPath: 'presetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/presets' }),
  endpoints: (builder) => ({
    getPresets: builder.query<Preset[], void>({
      query: () => `/`,
    }),
  }),
});

export const { useGetPresetsQuery } = presetsApi;
