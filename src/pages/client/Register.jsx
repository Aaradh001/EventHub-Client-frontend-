import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import regBg from "../../assets/images/regPage/regbg.jpg"
import { jwtDecode } from "jwt-decode";
import { MdOutlineStart } from "react-icons/md";
import { BASE_URL } from "../../constants/constants";
import FormInput from "../../../../../Client-frontend/EventHub-Client/src/components/subComponents/FormInput";
import { GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import { TError, TSuccess } from '../../../../../Client-frontend/EventHub-Client/src/components/subFeatureComponents/Toastify';
import { useDispatch } from "react-redux";
import { set_Authentication } from "../../../../../Client-frontend/EventHub-Client/src/redux/authentication/authenticationSlice";
import LoginHeader from "../../../../../Client-frontend/EventHub-Client/src/components/LoginHeader";
import Footer from "../../../../../Client-frontend/EventHub-Client/src/components/Footer";
function Register() {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const inputs = [
    {
      keyId: 1,
      id: "username",
      label: "Username",
      placeholder: "Enter the username . . .",
      type: "text",
      name: "username",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "Allowed characters: A-Z, a-z, Numbers: 0-9. Must contain 4 characters!",
      required: true,
      pattern: "^[A-Za-z0-9]{4,}$",
    },
    {
      keyId: 2,
      id: "first_name",
      label: "First name",
      placeholder: "Enter the first name . . .",
      type: "text",
      name: "first_name",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      error: "First name should not be blank, contain atleast 2 letters and no white spaces allowed, allowed characters: A-Z, a-z",
      required: true,
      pattern: "^[A-Za-z]{2,}$",
    },
    {
      keyId: 3,
      id: "last_name",
      label: "Last name",
      placeholder: "Enter the last name . . .",
      type: "text",
      name: "last_name",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      labelclass: "block text-sm font-medium text-gray-400",
      error: "Allowed characters: A-Z, a-z.",
      required: false,
      pattern: "^[A-Za-z]{0,}$",
    },
    {
      keyId: 4,
      id: "email",
      label: "Email ID",
      placeholder: "Enter the email id . . .",
      type: "email",
      name: "email",
      error: "Email ID should be valid !",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      labelclass: "block text-sm font-medium text-gray-400",
      required: true,
    },

    {
      keyId: 5,
      id: "phone_number",
      label: "Phone number",
      placeholder: "Enter the phone number . . .",
      type: "text",
      name: "phone_number",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      labelclass: "block text-sm font-medium text-gray-400",
      error: "Should contain only numbers, no white spaces, no alphabets, no special charecters except '+'.",
      pattern: "^[0-9+]{10,}$",
      required: true,
    },
    {
      keyId: 6,
      id: "password",
      label: "Password",
      placeholder: "Enter the password . . .",
      type: "password",
      name: "password",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",

      labelclass: "block text-sm font-medium text-gray-400",
      error:
        "Should be 6-20 characters. Should start with a letter, must contain at least 1 letter, 1 special character, 1 number, no white spaces. [Allowed : A-Z, a-z, 0-9,  !@#$%^&* ]",
      // pattern:
      // "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[A-Za-z][a-zA-Z0-9!@#$%^&*]{5,10}$",
      required: true,
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseURL = BASE_URL;

  const handleRegisterSubmit = async (event) => {
    let errors = []
    event.preventDefault();
    const formData = new FormData();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const phone_number = event.target.phone_number.value;
    const clientData = {
      "username": username,
      "email": email,
      "password": password,
      "phone_number": phone_number
    }

    formData.append("client", JSON.stringify(clientData));
    formData.append("first_name", event.target.first_name.value);
    formData.append("last_name", event.target.last_name.value);
    try {
      const res = await axios.post(
        baseURL + "/register/",
        formData
      );
      if (res.status === 201) {
        navigate("/login", {
          state: res.data.Message,
        });
        return res;
      }
    } catch (error) {
      if (error.response.status === 406) {
        console.log(error);
        Object.keys(error.response.data).forEach(key => {
          if (typeof (error.response.data[key]) === 'object') {
            Object.keys(error.response.data[key]).forEach(subKey => {
              (error.response.data[key][subKey]).forEach(errorMessage => {
                errors.push(errorMessage)
              })
            })
          }
        })
        errors.forEach(item => {
          TError(item)
        })

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

      console.log("res", res.data);
      console.log("the decoded data   :", jwtDecode(res.data.access));

      dispatch(
        set_Authentication({
          name: jwtDecode(res.data.access).username,
          isAuthenticated: true

        })
      );
      if (!res.data.accountExist) {
        setTimeout(() => { TSuccess('Welcome To EventHub') }, 3000);
      }
      navigate("/", { 'status': 'success', "message": "You have successfully login" });
      return res

    }).catch((err) => {
      console.log(err);
      TError("Login failed")
    })
  }




  return (

    <>
      <LoginHeader />
      <main className="bg-black">
        <div className="flex  max-w-7xl mx-auto justify-center md:justify-between gap-x-4 items-center px-4 md:px-6 lg:px-8 py-6 lg:py-0">
          {/* <div className=" lg:flex h-full items-center justify-center flex-1 bg-black text-white">
          </div> */}
          {/* <div className="w-full h-full bg-gray-100 lg:w-1/2 flex items-center justify-center"> */}
          <div className="hidden  md:block md:w-3/6 lg:pr-0 pl-4 pr-6">
            <h1 className="font-medium text-5xl text-white">Transforming Visions into Events</h1>
            <div className="flex items-center mt-4 text-white">
              <p className="leading-relaxed mt-4">
                Create an account right now!
              </p>
              {/* <IoMdLogIn className="w-8 h-8 mt-4 mx-2" /> */}
              <MdOutlineStart className="w-8 h-8 mt-4 mx-2" />
            </div>
          </div>
          <div className="min-w-sm w-full p-6 max-w-md text-white ">
            <h1 className="text-3xl font-semibold mb-8 text-center">Sign Up</h1>
            {/* <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Join to Our Community with all time access and free </h1> */}
            <div className="mt-4 flex flex-col lg:flex-row  mb-2 lg:mb-0 items-center justify-center">
              {/* <button type="button" className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
              Sign Up with Google </button> */}

              <GoogleLogin theme="outline" text="continue_with" logo_alignment="center"
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);

                  googleSignIn(credentialResponse.credential);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
            <div className="my-2 text-sm text-gray-400 text-center">
              <p>or</p>
            </div>
            <div className="rounded-lg md:max-h-[320px] md:overflow-y-hidden md:hover:overflow-y-scroll md:focus:overflow-y-scroll hover:snap-y">

              <form className="" onSubmit={handleRegisterSubmit} method="POST">
                {inputs.map((input) => {
                  // if(input.id === 'first_name' )
                  return (
                    <FormInput
                      key={input.keyId}
                      {...input}
                      value={values[input.name]}
                      onChange={handleChange}
                    />
                  );
                })}

                <div>
                  <button type="submit" className="w-full bg-gray-700 text-white p-2 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign Up</button>
                </div>
              </form>
            </div>
            <div className="text-sm text-gray-400">
              <p className="text-center">Already have an account?<Link to="/login" className="text-white ml-2 hover:underline">Login here</Link>
              </p>
            </div>
          </div>
          {/* </div> */}
        </div>
      </main>
      <Footer />
    </>


  );
}

export default Register;