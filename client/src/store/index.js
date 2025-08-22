import { configureStore } from '@reduxjs/toolkit';
import summaryReducer from '../features/summarizer/summarySlice.js';

export const store = configureStore({
  reducer: {
    summary: summaryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;