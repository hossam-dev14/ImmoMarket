import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


export default function RoutePrivate () {
  const {userInfo} = useSelector((state) => state.auth);
  return userInfo?.data ? <Outlet /> : <Navigate to="/signin" replace />;
}

// <Outlet /> : displays the page content that the user has access to.