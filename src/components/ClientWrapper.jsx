import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { set_Authentication } from "../redux/authentication/authenticationSlice";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
// import Layout from "./Layout";
import NotFoundPage from "./NotFoundPage";
import tokenValidate from "../utils/tokenValidate";
// import Home from "../pages/client/Home";
import Register from "../pages/client/Register";
import Login from "../pages/client/Login";
import Profile from "../pages/client/Profile";
import LoaderHome from "../pages/common/LoaderHome";
import EventLayout from "../pages/event/EventLayout";
import DashboardLayout from "./DashboardLayout";
const Layout = lazy(() => import('./Layout'));
const Home = lazy(() => import('../pages/client/Home'));
const Requirement = lazy(() => import('../pages/event/Requirement'));


function ClientWrapper() {
  const dispatch = useDispatch();
  const authentication_user = useSelector((state) => state.authentication_user);
  const checkTokenValidation = async () => {
    const isTokenValid = await tokenValidate();
    if (!isTokenValid) {
      dispatch(
        set_Authentication({
          name: null,
          isAuthenticated: false,
          profileImage: null,
          loading: true,
        })
      );
    }
    return isTokenValid;

  };

  const fetchUserData = async (baseURL, token) => {
    try {
      await axios.get(baseURL + "my-account/", {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          dispatch(
            set_Authentication({
              name: res.data.client.username,
              isAuthenticated: res.data.client.is_active,
              profileImage: res.data.profile_pic,
              loading: false
            })
          );
        });
    } catch (error) {
      localStorage.clear()
      dispatch(
        set_Authentication({
          name: null,
          isAuthenticated: false,
          profileImage: null,
          loading: true
        })
      );
    }
  };

  useEffect(() => {
    if (!authentication_user.isAuthenticated) {
      if (checkTokenValidation()) {
        const token = localStorage.getItem("access");
        fetchUserData(BASE_URL, token);
      }
    }
  }, []);

  return (
    <>
      <Routes>
        {/* <Route exact path="ghome" element={<Home  />} />
        <Route exact path="google" element={<SocialAuth />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />}></Route>
        <Route path="/" element={<Suspense fallback={<LoaderHome />}><Layout /></Suspense>}>
          <Route index element={<Suspense fallback={<LoaderHome />}><Home /></Suspense>} />

          <Route path="dashboard" element={<PrivateRoute> <DashboardLayout /> </PrivateRoute>} >
            <Route index element={<PrivateRoute> <Profile /> </PrivateRoute>} />
          </Route>
          <Route path="event" element={<PrivateRoute> <EventLayout /> </PrivateRoute>}>
            <Route path="requirements" element={<Suspense fallback={<LoaderHome />}><Requirement /></Suspense>} />
          </Route>
        </Route>
        {/* Custom 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default ClientWrapper;

// ===============================================================
// need to update on the status
// ===============================================================