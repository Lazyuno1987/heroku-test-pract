
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'




export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://heroku-test-prac.herokuapp.com/' }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['Contact'],
    }),
     getContactById: builder.query({
      query: id => `/contacts/${id}`,
      providesTags: ['Contact'],
     }),
      addContact: builder.mutation({
      query: values => ({
        url: '/contacts',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Contact'],
      }),
       deleteContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
       }),
      
  }),
})


export const { useGetContactsQuery, useAddContactMutation, useDeleteContactMutation } = contactApi;

