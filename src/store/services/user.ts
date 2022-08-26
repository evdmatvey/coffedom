import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/User';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/users',
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem('token') || '';
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => `/`,
    }),
    getUserByToken: builder.query<User, void>({
      query: () => '/auth',
    }),
    authUser: builder.mutation({
      query: (user) => ({
        url: '/auth',
        method: 'POST',
        body: user,
      }),
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: '/reg',
        method: 'POST',
        body: user,
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: '/',
        method: 'PUT',
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: '/',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useAuthUserMutation,
  useGetUserByTokenQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
