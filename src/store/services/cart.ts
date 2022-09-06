import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cart } from "../../types/Cart";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/carts",
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem("token") || "";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCarts: builder.query<Cart[], void>({
      query: () => `/`,
    }),
    updateProductToCart: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useGetCartsQuery, useUpdateProductToCartMutation } = cartApi;
