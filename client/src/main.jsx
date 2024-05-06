import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import AuthProvider from './AuthProvider';


// import { ApiProvider } from '@reduxjs/toolkit/query/react';
// import { usersApi } from './store/user/apiSlice.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    {/* <ApiProvider api={usersApi}> */}
    <AuthProvider>
      <App />
    </AuthProvider>
    {/* </ApiProvider> */}
  </Provider>
)
