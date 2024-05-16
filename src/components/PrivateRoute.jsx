import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../pages/common/Loader";
function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const authentication_user = useSelector((state) => state.authentication_user);

  useEffect(() => {
    if (!authentication_user.isAuthenticated) {
      console.log("loginnnnn");
      navigate('/login');
    }
  }, [authentication_user.isAuthenticated, navigate]);

  if (authentication_user.loading && authentication_user.isAuthenticated) {
    return <Loader />;
  }

  if (!authentication_user.isAuthenticated) {
    return null; // This ensures the component doesn't render anything before the navigation happens
  }

  return children;
}

export default PrivateRoute;