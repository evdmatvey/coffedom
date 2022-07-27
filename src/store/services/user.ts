import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/User';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/users' }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => `/`,
    }),
    getUserByEmailAndPassword: builder.mutation({
      query: ({ email, password }) => ({
        url: `/?email_like=${email}&password_like=${password}`,
        method: 'GET',
      }),
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: '/',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useGetUserByEmailAndPasswordMutation } =
  userApi;
