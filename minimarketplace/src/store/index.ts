import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlice';
import cartReducer from './features/cartSlice';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  cart: cartReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;