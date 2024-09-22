import { configureStore } from '@reduxjs/toolkit';
import { aviasalesReducer } from './aviasales-slice';

export const store = configureStore({
  reducer: {
    aviasales: aviasalesReducer,
  },
});
