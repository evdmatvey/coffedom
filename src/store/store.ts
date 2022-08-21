import { configureStore } from '@reduxjs/toolkit';
import { addressApi } from './services/address';
import { presetsApi } from './services/presets';
import { productApi } from './services/product';
import { promoApi } from './services/promo';
import { userApi } from './services/user';
import { userPresetsApi } from './services/userPresets';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [promoApi.reducerPath]: promoApi.reducer,
    [presetsApi.reducerPath]: presetsApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userPresetsApi.reducerPath]: userPresetsApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(promoApi.middleware)
      .concat(presetsApi.middleware)
      .concat(addressApi.middleware)
      .concat(userApi.middleware)
      .concat(userPresetsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
