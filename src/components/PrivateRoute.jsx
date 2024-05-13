import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../pages/common/Loader";

function PrivateRoute({ children }) {
  const authentication_user = useSelector((state) => state.authentication_user);

  if (authentication_user.loading) {
    return (<Loader />)
  }

  if (!authentication_user.isAuthenticated) {
    console.log("loginnnnn");
    return <Navigate to="/login" />;
  }
  
  // setTimeout(() => {
    return children;
  // }, 1000)
}

export default PrivateRoute;