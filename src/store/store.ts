import { configureStore } from '@reduxjs/toolkit';
import { adressApi } from './services/adress';
import { presetsApi } from './services/presets';
import { productApi } from './services/product';
import { promoApi } from './services/promo';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [promoApi.reducerPath]: promoApi.reducer,
    [presetsApi.reducerPath]: presetsApi.reducer,
    [adressApi.reducerPath]: adressApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(promoApi.middleware)
      .concat(presetsApi.middleware)
      .concat(adressApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
