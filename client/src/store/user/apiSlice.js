import { 
  createApi, 
  fetchBaseQuery 
} from '@reduxjs/toolkit/query/react';
import { getStateFromStorage } from '../../utils/localStorage.js';

const baseQuery = fetchBaseQuery({ 
  baseUrl: 'https://immomarket.onrender.com/api',
  prepareHeaders: (headers) => {
    const accessToken = getStateFromStorage('userInfo')?.accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers; 
  } 
});
const AUTH_URL = '/auth';
const USER_URL = '/users';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['User'],
  baseQuery,
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    
    signInUser: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signin`,
        method: 'POST',
        body: data,

      }),
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/refresh-token`,
        method: 'POST',
        body: {refreshToken: getStateFromStorage('userInfo')?.refreshToken},
      }),
    }),

    signOutUser: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/signout`,
        method: 'POST',
      }),
    }),
    
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    
    onBeforeQuery: (arg, queryApi) => {
      const formData = new FormData();
      formData.append('file', arg);
      queryApi.getState().baseQuery.body = formData;
    },

    getAllUser: builder.query({
      query: () => ({
        url: `${USER_URL}/`,
        method: 'GET',
      }),
    }),

  }),
});

export const {
  useSignUpUserMutation, // SignUp
  useSignInUserMutation, // SignIn
  useRefreshTokenMutation, //Refresh Token
  useSignOutUserMutation,  //SignOut
  useUpdateUserMutation, //Updaete User
  useRetriveAllUsersMutation,//Retriver All Users
} = usersApi;
