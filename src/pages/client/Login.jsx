import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { set_Authentication } from "../../redux/authentication/authenticationSlice";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../constants/constants";
import FormInput from "../../components/subComponents/FormInput";
import { IoMdLogIn } from "react-icons/io";
import LoginHeader from "../../components/LoginHeader";
import Footer from "../../components/Footer";
import { GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import { TError, TSuccess } from '../../components/subFeatureComponents/Toastify';

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  // const { state } = useLocation();
  const [formError, setFormError] = useState([]);
  const baseURL = BASE_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputs = [
    {
      keyId: 1,
      id: "form1Example13",
      label: "Email ID",
      placeholder: "Enter the email id . . .",
      labelclass: "leading-7 text-md text-white tracking-wider font-bold",
      type: "email",
      name: "email",
      error: "Enter valid email ID !",
      className:
        "placeholder-middle placeholder:text-gray-100 w-full bg-transparent border-4 border-white rounded-md border border-gray-300 focus:border-gray-200 focus:ring-2 focus:ring-gray-200 text-md outline-none text-gray-50 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out",
      required: true,
    },

    {
      keyId: 2,
      id: "form1Example23",
      label: "Password",
      placeholder: "Enter the password . . .",
      type: "password",
      name: "password",
      labelclass: "leading-7 text-md text-white tracking-wider font-bold",
      className: "placeholder-middle placeholder:text-gray-100 w-full bg-transparent border-4 border-white rounded-md border border-gray-300 focus:border-gray-200 focus:ring-2 focus:ring-gray-200 text-md outline-none text-gray-50 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out",
      error: "Enter valid password !",
      // pattern: "^[a-zA-Z0-9!@#$%^&*]{5,10}$",
      required: true,
    },
  ];


  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setFormError([]);
    const formData = new FormData();
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    try {
      const res = await axios.post(baseURL + "client-login/", formData);
      if (res.status === 200) {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        console.log(res.data);
        const decodedData = jwtDecode(res.data.access)
        console.log(decodedData);
        dispatch(
          set_Authentication({
            name: decodedData.username,
            isAuthenticated: decodedData.status,
            profileImage: decodedData.profile_pic,
          })
        );
        navigate("/");
        TSuccess("You have successfully logged in !!")
        return res;
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setFormError(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const googleSignIn = async (credential) => {
    const formData = {
      credential: credential,
    }
    await axios.post(`${BASE_URL}google-login/`, formData).then((res) => {

      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      console.log("the decoded data   :",jwtDecode(res.data.access));
      dispatch(
        set_Authentication({
          name: jwtDecode(res.data.access).username,
          isAuthenticated: true
        })
      );
      if (!res.data.accountExist) {
        setTimeout(() => { TSuccess('Welcome To EventHub') }, 3000);
      }
      navigate("/");
      TSuccess("You have successfully logged in !!")
      return res

    }).catch((err) => {
      console.log(err);
      TError("Login failed")
    })
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (formError) {
        setFormError('');
      }
    }, 4000);
    return () => clearTimeout(timerId);
  }, [formError]);

  return (
    <>
      <LoginHeader />
      <main className="h-screen">
        <section className="w-full h-full sm:flex sm:items-center text-gray-900 py-16 bg-black">
          <h1 className="block sm:hidden text-center pb-8 font-medium text-5xl text-white">Login Now</h1>
          <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-4 flex items-center justify-between">
            <div className="hidden sm:block lg:w-3/6 lg:pr-0 pr-0">
              <h1 className="font-medium text-5xl text-white">Your Event Journey Starts with a Login</h1>
              <div className="flex items-center mt-4 text-white">
                <p className="leading-relaxed mt-4">
                  Get Started with EventHub
                </p>
                <IoMdLogIn className="w-8 h-8 mt-4 mx-2" />
              </div>

            </div>
            <div className="lg:w-2/5 md:w-full bg-black border-4 border-white px-8 pt-8 flex flex-col w-full mt-10 lg:mt-0  rounded-2xl">
              <div className="w-full flex justify-center items-center">
                <GoogleLogin size="medium"
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    googleSignIn(credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />;
              </div>
              <p className="py-3 text-white text-center">or</p>
              <form method="POST" onSubmit={handleLoginSubmit}>
                {formError["detail"] && (
                  <div className="bg-red-500 rounded mb-3 py-1 px-2 text-white">
                    {formError["detail"]} !!!
                  </div>
                )}
                {inputs.map((input) => {
                  return (
                    <FormInput
                      key={input.keyId}
                      {...input}
                      value={values[input.name]}
                      onChange={handleChange}
                    />
                  );
                })}

                <div className="flex justify-start items-center mb-4">
                  <Link className="text-white " to="/register">
                    Not Have Account?
                  </Link>
                </div>
                <div className="flex w-full justify-center items-center mb-4">

                  <button className="text-white bg-indigo-500 rounded-md border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 text-lg">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;