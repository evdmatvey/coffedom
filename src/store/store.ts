import { configureStore } from '@reduxjs/toolkit';
import { presetsApi } from './services/presets';
import { productApi } from './services/product';
import { promoApi } from './services/promo';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [promoApi.reducerPath]: promoApi.reducer,
    [presetsApi.reducerPath]: presetsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(promoApi.middleware)
      .concat(presetsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
