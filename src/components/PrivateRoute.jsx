import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../pages/common/Loader";
import tokenValidate from "../utils/tokenValidate";
function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const authentication_user = useSelector((state) => state.authentication_user);

  // useEffect(() => {
  //   if (!authentication_user.isAuthenticated) {
  //     return <Loader />;
  //     navigate('/login');
  //   }
  // }, [authentication_user.isAuthenticated, navigate]);
  if (pathname === "/event/venues") {
    return children;
  }

  if (authentication_user.loading) {
    return <Loader />;
  }

  if (!authentication_user.isAuthenticated) {
    if (tokenValidate()) {
      navigate('/login');
      return null; // This ensures the component doesn't render anything before the navigation happens
    }
  }

  return children;
}

export default PrivateRoute;