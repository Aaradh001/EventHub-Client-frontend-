import React, { useEffect, useState } from 'react'
import { MdOutlineDoubleArrow } from "react-icons/md";
import FormInput from '../../components/subComponents/FormInput';
import { useNavigate } from 'react-router-dom';
import { TError } from '../../components/subFeatureComponents/Toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { set_Event } from '../../redux/event/eventSlice';
import { BASE_URL } from '../../constants/constants';


const Requirement = () => {

  let [toggleReq, setToggleReq] = useState(true);
  let [selectedServices, setSelectedServices] = useState(['cateringService']);
  const authentication_user = useSelector((state) => state.authentication_user);
  const event = useSelector((state) => state.event);
  const baseURL = BASE_URL;
  const token = localStorage.getItem('access')
  const navigate = useNavigate()
  const dispatch = useDispatch();
  // let [cateringFormData, setCate]

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
  ]


  async function checkEventCreated() {
    if (!event.initiated) {
      const savedData = sessionStorage.getItem('eventBasicdata')
      if (!savedData) {
        navigate('/')
        // TError("Session Expired !!!")
        return
      }
      const eventLaunchData = JSON.parse(savedData).data
      console.log("eventLaunchData", eventLaunchData);
      try {
        const res = await axios.post(
          baseURL + "event/events/",
          eventLaunchData, {
            headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
          console.log(res);
          dispatch(
            set_Event({
              event_id: res.data.event_id,
              name: res.data.name,
              thumbnail: res.data.thumbnail,
              start_date: res.data.start_date,
              end_date: res.data.end_date,
              event_cat: res.data.event_cat,
              guest_count: res.data.guest_count,
              initiated:true,
              is_completed: res.data.is_completed,
              status: res.data.status
            }))
          sessionStorage.removeItem('eventBasicdata')
        };
      }
      catch (error) {
        console.log(error);
        if (error.response.status === 406) {
          console.log(error);
          Object.keys(error.response.data).forEach(key => {
            if (typeof (error.response.data[key]) === 'object') {
              Object.keys(error.response.data[key]).forEach(subKey => {
                (error.response.data[key][subKey]).forEach(errorMessage => {
                  error.push(errorMessage)
                })
              })
            }
          })
        } else {
          console.log(error);
        }
      }
    }


  }



  useEffect(() => {
    checkEventCreated();

  }, [])
  return (
    <>
      <div className='p-8 bg-gradient-to-b from-red-100 md:gap-y-10 md:flex md:flex-col md:px-6 lg:px-8 text-slate-700'>
        <h1 className='py-4 md:px-3 text-xl md:text-5xl mr-auto roboto-bolder '>Requirements</h1>
        <div className='bg-violet-100 border border-violet-100 roboto-normal text-sm w-full md:max-w-7xl md:flex md:flex-row md:mx-auto gap-y-4 md:flex-row px-4 md:mx-auto py-2 md:items-center rounded-md justify-between flex-col'>
          <div className='w-full py-2 md:justify-start md:gap-4 flex justify-between items-center'>
            <p>No of guests :</p>
            <p className='bg-white px-2 py-1 rounded-md text-xs'>1000</p>
          </div>
          <div className='w-full py-2 flex md:justify-end md:gap-4 justify-between items-center'>
            <p>Venue :</p>
            <p className='bg-white px-2 py-1 rounded-md text-xs'>Resort</p>
          </div>
        </div>
      </div>
      <div className='h-10 w-full bg-white flex roboto-normal items-center justify-between px-4 shadow border border-gray-200 rounded-md md:max-w-5xl mx-auto'>
        <div className='flex items-center'><p>Select Venue</p></div>
        <MdOutlineDoubleArrow className='w-6 h-6 text-green-500' />
        <div className='flex items-center'><p>Select Requirements</p></div>
        <MdOutlineDoubleArrow className='w-6 h-6 text-red-500' />
        <div className='flex items-center'><p>Choose vendor</p></div>
        <MdOutlineDoubleArrow className='w-6 h-6 text-red-500' />
        <div className='flex items-center'><p>Advance payment</p></div>
        <MdOutlineDoubleArrow className='w-6 h-6 text-red-500' />
        <div className='flex items-center'><p>Confirm booking</p></div>
      </div>
      <div className='w-full'>
        <div className='roboto-normal flex mx-auto text-sm w-full md:max-w-7xl gap-10 md:flex  py-2 rounded-md'>

          <div className="md:w-2/5 mb-5 mt-5">

            <div className='mb-3'>
              <input type="checkbox" defaultChecked={selectedServices?.includes("cateringService")} id="cateringService" value="" className="hidden peer" required="" />
              <label htmlFor="cateringService" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="block">
                  <div className="w-full text-lg font-semibold">Catering Service</div>
                </div>
              </label>
            </div>

            <div className='mb-3'>
              <input type="checkbox" onChange={() => setSelectedServices((prev) => {
                if (!selectedServices?.includes("decorationService")) {
                  setToggleReq(false);
                  return [...prev, "decorationService"]
                } else {
                  setToggleReq(true)
                }
              },)} id="decorationService" checked={selectedServices?.includes("decorationService") ? true : false} value="" className="hidden peer" required="" />
              <label htmlFor="decorationService" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="block">
                  <div className="w-full text-lg font-semibold">Decration</div>
                </div>
              </label>
            </div>

            <div className='mb-3'>
              <input type="checkbox" id="anchoringService" value="" className="hidden peer" required="" />
              <label htmlFor="anchoringService" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="block">
                  <div className="w-full text-lg font-semibold">Anchoring Service</div>
                </div>
              </label>
            </div>

            <div className='mb-3'>
              <input type="checkbox" id="entertainmentService" value="" className="hidden peer" required="" />
              <label htmlFor="entertainmentService" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="block">
                  <div className="w-full text-lg font-semibold">Entertainment</div>
                </div>
              </label>
            </div>

            <div className='mb-3'>
              <input type="checkbox" id="PhotographyService" value="" className="hidden peer" required="" />
              <label htmlFor="PhotographyService" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="block">
                  <div className="w-full text-lg font-semibold">Photography </div>
                </div>
              </label>
            </div>
          </div>


          <div className="md:2/5 mt-5 w-full">
            <div className={`${!toggleReq && "hidden"} bg-white p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
              <div className='mb-5'>
                <h2 className="text-2xl mb-1 font-extrabold dark:text-white">Catering Service</h2>
                <p className="my-1 text-lg text-gray-500">Starting cost - Rs 1000000</p>
              </div>
              <div className="grid  grid-cols-2 gap-x-10">
                {
                  inputs.map((item, index) => {
                    return (
                      <div key={index}>
                        <FormInput {...item} />
                      </div>
                    )
                  })
                }

              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Save
              </button>
            </div>



            <div className={`${toggleReq && "hidden "}bg-white p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 `}>
              <div className='mb-5'>
                <h2 className="text-2xl mb-1 font-extrabold dark:text-white">Decation Service</h2>
                <p className="my-1 text-lg text-gray-500">Starting cost - Rs 1000000</p>
              </div>
              <div className="grid grid-cols-2 gap-x-10">
                {
                  inputs.map((item, index) => {
                    return (
                      <div key={index}>
                        <FormInput {...item} />
                      </div>
                    )
                  })
                }

              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Requirement
