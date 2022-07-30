import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserPreset } from '../../types/UserPreset';

export const userPresetsApi = createApi({
  reducerPath: 'userPresetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/users-presets' }),
  endpoints: (builder) => ({
    getUserPresets: builder.mutation<UserPreset[], number>({
      query: (id) => ({
        url: `?userId_like=${id}`,
        method: 'GET',
      }),
    }),
    addUserPreset: builder.mutation({
      query: (preset) => ({
        url: '',
        method: 'POST',
        body: preset,
      }),
    }),
    deleteUserPreset: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUserPreset: builder.mutation({
      query: ({ id, changes }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: changes,
      }),
    }),
  }),
});

export const {
  useGetUserPresetsMutation,
  useAddUserPresetMutation,
  useDeleteUserPresetMutation,
  useUpdateUserPresetMutation,
} = userPresetsApi;
