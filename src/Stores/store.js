import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/useSlice';
import colorSlice from './slices/colorSlice';
import tokenSlice from './slices/tokenSlice';
import cardValues from './slices/cardValuesSlice';
import paymentInfoSlice from './slices/paymentInfoSlice';
export const store = configureStore({
  reducer: {
    userId: userReducer,
    token: tokenSlice,
    color: colorSlice,
    cardValues: cardValues,
    paymentInfo: paymentInfoSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});
