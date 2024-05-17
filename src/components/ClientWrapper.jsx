import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { set_Authentication } from "../redux/authentication/authenticationSlice";
import { set_Event } from "../redux/event/eventSlice";
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
  const event = useSelector((state) => state.event);
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


  async function checkEventCreated(baseURL, token) {
    try {
      await axios.get(baseURL + "event/events", {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status == 200) {

            console.log("from wrapper", res);
            if (res.data.current_event){
              dispatch(
                set_Event({
                  event_id: res.data.current_event.event_id,
                  name: res.data.current_event.name,
                  thumbnail: res.data.current_event.thumbnail,
                  start_date: res.data.current_event.start_date,
                  end_date: res.data.current_event.end_date,
                  event_cat: res.data.current_event.event_cat,
                  guest_count: res.data.current_event.guest_count,
                  status : res.data.current_event.status,
                  initiated: true,
                  is_completed: res.data.current_event.is_completed
                })
              );
            }
          }
        });
    } catch (error) {
      dispatch(
        set_Event({
          name: "",
          thumbnail: null,
          start_date: null,
          end_date: null,
          event_cat: null,
          guest_count: null,
          initiated:false,
          is_completed: false,
          status: ""
        })
      );
    }
  }


  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!authentication_user.isAuthenticated) {
      if (checkTokenValidation()) {
        fetchUserData(BASE_URL, token);
      }
    }

    if (!event.launched) {
      checkEventCreated(BASE_URL, token);
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