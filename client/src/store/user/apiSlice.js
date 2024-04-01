import { 
  createApi, 
  fetchBaseQuery 
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });
const USER_URL = '/api/auth';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['User'],
  baseQuery,
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    signInUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signin`,
        method: 'POST',
        body: data,
      }),
    }),
    signOutUser: builder.mutation({
      query: () => ({
        url: `${USER_URL}/signout`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useSignInUserMutation,
  useSignOutUserMutation
} = usersApi;
