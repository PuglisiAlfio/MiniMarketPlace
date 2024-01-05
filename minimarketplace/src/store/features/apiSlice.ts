import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  tagTypes: ['Product'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com'
  }),
  endpoints: () => ({})
});