import { apiSlice } from "./apiSlice";

const productSlice = apiSlice.enhanceEndpoints({
    addTagTypes: ['Product']
}).injectEndpoints({
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: ({ skip = 0, limit = 12 }) => `/products?skip=${skip}&limit=${limit}`,
            providesTags: ['Product']
        })
    })
})

export const { useGetAllProductsQuery } = productSlice