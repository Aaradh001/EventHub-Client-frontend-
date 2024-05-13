import React, { useEffect, useState } from "react";
import axios from "axios";
import userImg from "../../assets/images/user.png";
import { set_Authentication } from "../../redux/authentication/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/subComponents/FormInput";
import { BASE_URL } from "../../constants/constants";
import Loader from "../common/Loader";
import { TError, TSuccess } from "../../components/subFeatureComponents/Toastify";
import { MdOutlineClose } from "react-icons/md";
import Modal from "../../components/subFeatureComponents/Modal";
import Map from "../../components/subComponents/Map";

function Profile() {
  const [image, setImage] = useState(null);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    profile_pic: null,
    area_of_preference: ""
  });
  const [message, setMessage] = useState(null);
  const [isloading, setisLoading] = useState(true);
  const authentication_user = useSelector((state) => state.authentication_user);
  const dispatch = useDispatch();

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
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error:
        "First name should not be blank, contain atleast 2 letters and no white spaces allowed, allowed characters: A-Z, a-z",
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
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "Allowed characters: A-Z, a-z.",
      required: false,
      pattern: "^[A-Za-z]{0,}$",
    },
    {
      keyId: 4,
      id: "typeEmailX-2",
      label: "Email ID",
      placeholder: "Enter the email id . . .",
      type: "email",
      name: "email",
      error: "Email ID should be valid !",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      required: true,
    },

    {
      keyId: 5,
      id: "phone_number",
      label: "Phone number",
      placeholder: "Enter the phone number . . .",
      type: "text",
      name: "phone_number",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      error:
        "Should contain only numbers, no white spaces, no alphabets, no special charecters except '+'.",
      pattern: "^[0-9+]{10,}$",
      required: true,
    },
    // {
    //   keyId: 6,
    //   id: "profile_pic",
    //   label: "Profile image",
    //   placeholder: "Select file . . .",
    //   type: "file",
    //   name: "profile_pic",
    //   labelclass: "block text-sm font-medium text-gray-400",
    //   className: "input-field-effects form-control form-control-lg",
    //   error: "Only image accepted !",
    //   accept: ".jpg, .jpeg, .png",
    //   // required: true,
    // },
    // {
    //   keyId: 7,
    //   id: "area_of_preference",
    //   label: "Preferred Location",
    //   placeholder: "Select the preffered location . . .",
    //   type: "text",
    //   name: "area_of_preference",
    //   labelclass: "block text-sm font-medium text-gray-400",
    //   className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
    //   // error:
    //   //   "Should contain only numbers, no white spaces, no alphabets, no special charecters except '+'.",
    //   // pattern: "^[0-9+]{10,}$",
    //   // required: true,
    // },
  ];

  const baseURL = BASE_URL;
  const token = localStorage.getItem("access");
  const fetchUserData = async () => {
    try {
      await axios
        .get(baseURL + "my-account/", {
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setisLoading(false)
          console.log("from profile fetch", res);
          setUserDetails((prev) => ({
            ...prev,
            username: res.data?.client?.username,
            email: res.data?.client?.email,
            phone_number: res.data.client.phone_number ?? "",
            first_name: res.data?.first_name,
            last_name: res.data?.last_name,
            profile_pic: res.data?.profile_pic,
            area_of_preference: res.data?.area_of_preference
            // isVerified: res.data.is_verification_completed
          })
          )
        });
    } catch (error) {
      TError("Data fetching failed !!")
      console.log("the error is  :", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the state based on the input field
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      client: {
        username: userDetails.username,
        email: userDetails.email,
        phone_number: userDetails.phone_number
      },
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      // profile_pic: userDetails.profile_pic
      // area_of_preference: userDetails.area_of_preference
      // isVerified: res.data.is_verification_completed
    }
    let url = baseURL + "/my-account/update/";
    axios.put(url, JSON.stringify(data), {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          TSuccess("Profile updated successfully");
          dispatch(
            set_Authentication({
              name: res.data.company_name,
              isAuthenticated: true,
              profileImage: res.data.logo,
              isVerified: res.data.is_verification_completed,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
        TError("Updation failed !!!")
        console.log(err.response.data);
      });
  };


  function handleImageChange(e) {
    e.target.files.length && setImage(e.target.files[0])
  }

  async function handleImageSubmit(e) {
    e.preventDefault();
    if (!image) {
      TError("No image selected !")
      return
    }
    const formData = new FormData();
    formData.append('profile_pic', image);
    try {
      await axios.put(baseURL + "my-account/update-profile-image/", formData, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("from image  :", res);

          TSuccess("Image updated !!")
          setUserDetails(prev => ({
            ...prev,
            profile_pic: res.data.profile_pic
          }))
          setImage(null)
          // setUserDetails((prev) => ({
          //   ...prev,
          //   profile_pic: res.data.profile_pic
          // }))
        });
    } catch (error) {
      TError("Image updation failed !!!")
      console.log("the error is  :", error);
    }
  }

  useEffect(() => {
    console.log("reloading");
    fetchUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isloading ? <Loader /> : (
        // <section className=" pt-40 md:pt-32 bg-gray-100">
          <div className="container mx-auto my-2 p-5">
            <div className="md:flex no-wrap  ">
              {/* Left Side */}
              <div className="w-full md:w-3/12 md:mr-2">
                {/* Profile Card */}
                <div className="h-full flex flex-col items-center p-3 bg-white p-3 border-t-4 border-green-400">
                  <div className="relative border h-40 w-40 border-gray-500 flex max-w-xs md:max-w-xs overflow-hidden sm:rounded-full">
                    <img className="h-auto w-full mx-auto"
                      src={userDetails.profile_pic ? userDetails.profile_pic : userImg}
                      alt="" />
                  </div>
                  <div></div>
                  <div className="w-full flex justify-center" onClick={() => setDropDownOpen(prev => !prev)} >
                    <div className="px-4 mt-2 cursor-pointer text-blue-700 text-sm text-center align-middle font-semibold bg-transparent hover:text-blue-800 hover:shadow">
                      Change profile image
                    </div>
                  </div>
                  <div className={`mt-2 w-full origin-top-right rounded-md shadow-lg ${dropDownOpen ? 'block' : 'hidden'}`}>
                    <div className="relative px-2 py-5  text-black bg-white border rounded-xl shadow dark-mode:bg-gray-800">
                      <label className="block text-sm font-medium text-gray-400" htmlFor="profile_pic"></label>
                      <form onSubmit={handleImageSubmit}>

                        <input
                          placeholder="Select file . . ."
                          className="mt-1 file:mx-2 bg-gray-100 w-full rounded-md focus:outline-none focus:ring-4 focus:ring-2 focus:ring-blue-700 transition-colors duration-300"
                          type="file"
                          name="profile_pic"
                          onChange={handleImageChange}
                          accept=".jpg, .jpeg, .png"
                          id="profile_pic"
                        />
                        <button role="submit" className="w-full p-1 px-3 hover:shadow-md mt-4 bg-green-500 border-2 font-bold text-white hover:text-black hover:bg-white hover:border-2 hover:border-green-500 rounded-md ">
                          Upload
                        </button>

                      </form>
                      <div className="absolute top-1 right-1" onClick={() => setDropDownOpen(prev => !prev)}>
                        <MdOutlineClose className="hover:text-red-700 text-gray-400 hover:bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{userDetails.username ?? '...'}</h1>
                </div>
              </div>
              {/* Right Side */}
              <div className="w-full md:w-9/12">
                {/* Profile tab */}
                {/* About Section */}
                <div className="h-full bg-white p-3 shadow-sm rounded-sm">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-10">
                    <span clas="text-green-500">
                      <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <span className="tracking-wide">About</span>
                  </div>
                  <div className="flex justify-center text-gray-700">
                    <div className="w-full md:max-w-xl text-sm">
                      {console.log("userDetails from jsx", userDetails)}
                      <form className="w-full" onSubmit={handleSubmit}>
                        {inputs.map((input) => {
                          return (
                            input.name !== 'profile_pic' ?
                              <FormInput
                                key={input.keyId}
                                {...input}
                                value={userDetails[input.name]}
                                onChange={handleInputChange} />
                              : <FormInput
                                key={input.keyId}
                                {...input}
                                // value={userDetails[input.name]}
                                onChange={handleInputChange} />
                          );
                        })}

                        <div className="relative mb-4 text-black">
                          <label
                            htmlFor="area_of_preference"
                            className="block text-sm font-medium text-gray-400"
                          >
                            Area of preference
                          </label>
                          <div className="w-full mt-1 sm:flex sm:gap-5 sm:flex-row flex-col item-center justify-between ">
                            <input
                              id="area_of_prefreence"
                              className="p-2 border rounded-md w-full"
                              type="text"
                              readOnly={true}
                              name="area_of_preference"
                              value={userDetails.area_of_preference ?? userDetails.area_of_preference}
                            />
                            <Modal className="w-full sm:w-auto whitespace-nowrap" component={<Map coordinates={userDetails.area_of_preference} />} />

                          </div>

                        </div>


                        <div className="w-full flex">
                          <button role="submit" className="ml-auto p-1 px-3 bg-green-500 border-2 font-bold text-white hover:text-black hover:bg-white hover:border-2 hover:border-green-500 rounded-md ">Save</button>
                        </div>

                      </form>
                    </div>
                  </div>

                </div>
                {/* End of about section */}
                <div className="my-4"></div>
              </div>
            </div>
            <ul className="bg-white text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Verification Status</span>
                <span className="ml-auto">
                  {/* <span className={`${userDetails?.isVerified ? "bg-green-500" : "bg-red-500"} py-1 px-2 rounded text-white text-sm`}>{userDetails?.isVerified ? "Completed " : "Pending"}</span> */}
                  <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    Active</span>
                </span>
              </li>
              <li className="flex items-center py-3">
                <span>Member since</span>
                {/* <span className="ml-auto">{userDetails?.vendor.date_joined}</span> */}
              </li>
            </ul>
          </div>
        // </section>
      )}
    </>
  );
}

export default Profile;