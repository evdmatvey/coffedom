import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/Cart";
import { cartApi } from "../services/cart";

interface cartInitialState {
  items: CartItem[];
}

const initialState: cartInitialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.getCarts.matchFulfilled,
      (state, { payload }) => {
        state.items = payload[0].items;
      }
    );
  },
});

export default cartSlice.reducer;
export const { updateCart } = cartSlice.actions;
