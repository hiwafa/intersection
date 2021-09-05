import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.BASE_URL;

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.JWT_TOKEN}`
}

export const intersectionAPI = createApi({
    reducerPath: "intersectionAPI",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getIntersections: builder.query({
            query: name => ({url: name, method: 'GET', headers})
        })
    })
});

export const { useGetIntersectionsQuery } = intersectionAPI;