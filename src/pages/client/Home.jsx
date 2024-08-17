import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CarouselComponent from "../../components/subFeatureComponents/Carousel";
import FlowAnimation from "../../components/subFeatureComponents/FlowAnimation";
import SlickSlider from "../../components/subFeatureComponents/SlickSlider";

import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { TError } from "../../components/subFeatureComponents/Toastify";
import "../../assets/styles/customStyle.css"
import { set_Event } from "../../redux/event/eventSlice";


function Home() {
  const dispatch = useDispatch();

  const [eventLaunchData, setEventLaunchData] = useState({
    name: "",
    event_cat: "",
    start_date: new Date().toLocaleDateString('en-CA'),
    end_date: new Date().toLocaleDateString('en-CA'),
    guest_count: "",
    // venue: ""
  })
  const navigate = useNavigate()
  const authentication_user = useSelector((state) => state.authentication_user);
  const event = useSelector((state) => state.event);
  const [launchToggle, setLaunchToggle] = useState(false)
  const [serviceTypes, setServiceTypes] = useState([]);
  const baseURL = BASE_URL;
  const token = localStorage.getItem("access");
  const inputs = [
    // type="text"
    // id="name"
    // onChange={handleInputChange}
    // placeholder="Enter the name of your service..."
    // className="placeholder:text-slate-400 border-0 placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md"
    {
      keyId: 1,
      id: "name",
      label: "Event Name",
      placeholder: "A name for your event . .",
      type: "text",
      name: "name",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "bg-white text-sm placeholder:text-slate-400 my-1 hover:shadow-lg border-0 placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md",
      error: "Allowed characters: A-Z, a-z, Numbers: 0-9.",
      wrapperClass: "sm:col-span-2",
      required: true,
      pattern: "^[A-Za-z0-9]+$",
    },
    {
      keyId: 2,
      id: "start_date",
      label: "Start date",
      // placeholder: "Enter the first name . . .",
      type: "date",
      name: "start_date",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "bg-white text-sm placeholder:text-slate-400 my-1 hover:shadow-lg border-0 placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md",
      min: new Date().toISOString().split('T')[0],
      error: "Provide a valid start date greater than today!",
      wrapperClass: "w-full",
      required: true,
      // pattern: "^[A-Za-z]{2,}$",
    },
    {
      keyId: 3,
      id: "end_date",
      label: "End date",
      // placeholder: "Enter the first name . . .",
      type: "date",
      name: "end_date",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "bg-white text-sm placeholder:text-slate-400 my-1 hover:shadow-lg border-0 placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md",
      min: new Date().toISOString().split('T')[0],
      // className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      error: "Provide a valid end date greater than today!",
      required: true,
      wrapperClass: "w-full",
      // pattern: "^[A-Za-z]{2,}$",
    },
    {
      keyId: 4,
      id: "guest_count",
      label: "Guest Count",
      placeholder: "Expecting count of guests . . .",
      type: "number",
      name: "guest_count",
      error: "Count should be valid number and greater than 10 !",
      wrapperClass: "sm:col-span-2",
      min: 5,
      // className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      className: "bg-white text-sm placeholder:text-slate-400 my-1 hover:shadow-lg border-0 placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md",
      labelclass: "block text-sm font-medium text-gray-400",
      required: true,
    },
  ];


  function handleToggleForm() {
    if (!launchToggle) {
      setLaunchToggle(true)
    }
    else (
      setLaunchToggle(false)

    )
  }


  async function launchEvent(e) {
    e.preventDefault()
    if (authentication_user.isAuthenticated) {
      try {
        const res = await axios.post(
          baseURL + "event/events/",
          eventLaunchData, {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
            Accept: "application/json",

          },
        }
        );
        if (res.status === 201) {
          console.log(res);
          dispatch(
            set_Event({
              event_id: res.data.id,
              eventCustomid: res.data.event_id,
              name: res.data.name,
              thumbnail: res.data.thumbnail,
              start_date: res.data.start_date,
              end_date: res.data.end_date,
              event_cat: res.data.event_cat,
              guest_count: res.data.guest_count,
              initiated: true,
              is_completed: res.data.is_completed,
              status: res.data.event_stage
            }))
          sessionStorage.getItem('eventBasicdata') && sessionStorage.removeItem('eventBasicdata')
          navigate('/event/requirements')

        };
      }
      catch (error) {
        console.log(error);
        TError(error.response)
        setLaunchToggle(false)
        setEventLaunchData({
          name: "",
          event_cat: "",
          start_date: new Date().toLocaleDateString('en-CA'),
          end_date: new Date().toLocaleDateString('en-CA'),
          guest_count: "",
        })
      }


    } else {
      sessionStorage.getItem('eventBasicdata') && sessionStorage.removeItem('eventBasicdata');
      sessionStorage.setItem('eventBasicdata', JSON.stringify({
        data: eventLaunchData,
        nextPath: '/event/requirements'
      }));
      navigate("/login")
    }
  }

  const handleInputChange = (e) => {
    const { name } = e.target;
    setEventLaunchData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }))
  };


  async function fetchServiceTypes() {
    try {
      await axios.get(baseURL + "event/event-types/", {
        headers: {
          // authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setServiceTypes(res.data.results)
          console.log(res.data.results);
        });
    } catch (error) {
      TError("Data fetching failed !!")
      // console.log("the error is  :", error);
    }
  };

  useEffect(() => {

    fetchServiceTypes();
  }, [])




  // const slides = [
  //   bgLogin, homeBg, regBg
  // ]


  return (
    <>
      {!launchToggle && !event.initiated ? (
        <div className="fixed bottom-12 right-12 rounded-full z-50">
          <button onClick={() => handleToggleForm()} className="customFixedButton text-xs md:text-md font-bold md:px-4 py-2">
            <span>Create an event</span>
          </button>
        </div>
      ) : event.status === 'LAUNCHED' && (
        <div className="fixed bottom-12 right-12 rounded-full z-50">
          <Link to={"event/requirements"} className="customFixedButton text-xs md:text-md font-bold md:px-4 py-2">
            <span>{`Continue with ${event.name}`}</span>
          </Link>
        </div>)

      }
      <div className={`${launchToggle ? 'fixed ' : 'hidden'} bottom-7 p-5 right-7 z-40 bg-black bg-opacity-60 rounded-lg md:w-72 md:h-fit xl:w-2/6`}>
        {/* <div> */}
        <form onSubmit={(e) => launchEvent(e)}>
          <button
            type="button"
            className="p-1 ml-auto bg-transparent border-0 text-black align-middle opacity-40 float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:opacity-100"
            onClick={() => setLaunchToggle(false)}
          >
            <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
          {/* </div> */}
          <div className="p-3 sm:mb-3 mb-6 md:mb-10 font-black tracking-wider uppercase bg-gray-300 w-full rounded-md">
            Create an event
          </div>
          <div className="p-3 md:pl-4 md:pr-10 mb-2 md:h-3/5 flex flex-col justify-start gap-2 bg-gray-200 w-full rounded-md">
            <div className="grid gap-1 grid-cols-2 w-full">

              {inputs.map((input) => {
                return (
                  <div key={input.keyId} className={input.wrapperClass}>
                    <div className="mt-1 w-full rounded-md">
                      <label className={input.labelclass} htmlFor={input.id}>{input.label}</label>
                      <input
                        type={input.type}
                        id={input.id}
                        name={input.name}
                        value={eventLaunchData[input.name]}
                        onChange={handleInputChange}
                        placeholder={input.placeholder}
                        className={input.className}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400" htmlFor="event_cat">Event Type</label>
              <div className="bg-white mt-2 w-full shadow-xl rounded-md">
                {/* <input type="text" id="addService" placeholder="Enter the name of your service..." className="placeholder:text-slate-400 border-0 w-full placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md" /> */}
                <select
                  name="event_cat"
                  value={eventLaunchData.event_cat}
                  onChange={handleInputChange}
                  className="placeholder:text-slate-400 text-sm border-0  placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md"
                  id="event_cat"
                >
                  <option value="">Choose event type</option>
                  {serviceTypes.map((serviceType, index) => (
                    <option key={index} value={serviceType.id}> {serviceType.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="rounded-full text-right">
              <button type="submit" className="customFixedButton text-xs md:text-md font-bold md:px-4 py-2">
                <span>submit</span>
              </button>
            </div>
          </div>
        </form >
      </div >
      <section className="relative h-fit w-full">
        <div className="h-56 sm:h-64 md:h-96 w-full">
          <CarouselComponent />
        </div>
        <section className="overflow-hidden">
          <div className="w-full bg-black overflow-hidden h-16 2xl:border-x-2 py-4 border-black">
            <FlowAnimation />
          </div>
          <div className="w-full p-6 z-50 bg-gray-300">
            <SlickSlider serviceTypes={serviceTypes} setServiceTypes={setServiceTypes} />
          </div>
        </section>
      </section>
    </>
  );
}
export default Home;