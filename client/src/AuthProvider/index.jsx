import React, { useEffect } from 'react';

import { useDispatch,
  //  useSelector
} from 'react-redux';
import { useRefreshTokenMutation  } from '../store/user/apiSlice';
import { setUserInfo } from '../store/user/authSlice';
import { getStateFromStorage } from '../utils/localStorage';


export default function AuthProvider ({ children })  {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const refreshToken = getStateFromStorage('userInfo')?.refreshToken;
  // const token = getStateFromStorage('userInfo')?.accessToken;
  // console.log("refreshToken: ", refreshToken);
  // console.log("Token: ", token);

  // const res = useRefreshTokenMutation(refreshToken);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setUserInfo(refreshToken));
    }, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [dispatch]);

  // return (isLoggedIn ? children : <p>Not Logged In</p>); // Handle unauthorized access
  return  children // Handle unauthorized access
}


