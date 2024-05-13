import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CarouselComponent from "../../components/subFeatureComponents/Carousel";
import FlowAnimation from "../../components/subFeatureComponents/FlowAnimation";
import SlickSlider from "../../components/subFeatureComponents/SlickSlider";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { TError } from "../../components/subFeatureComponents/Toastify";
import "../../assets/styles/customStyle.css"


function Home() {
  const authentication_user = useSelector((state) => state.authentication_user);
  const [launchToggle, setLaunchToggle] = useState(false)
  const [serviceTypes, setServiceTypes] = useState([]);
  const baseURL = BASE_URL;
  const token = localStorage.getItem("access");

  function handleToggleForm() {
    if (!launchToggle) {
      setLaunchToggle(true)
    }
    else (
      setLaunchToggle(false)

    )
  }

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
          console.log("From service types", res.data.results);
        });
    } catch (error) {
      TError("Data fetching failed !!")
      console.log("the error is  :", error);
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
      <div className="fixed bottom-12 right-12 rounded-full z-50">
        <button onClick={() => handleToggleForm()} className="customFixedButton text-xs md:text-md font-bold md:px-4 py-2">
          <span>{launchToggle ? 'Launch Now' : 'Create an event'}</span>
        </button>
      </div>
      <div className={`${launchToggle ? 'fixed ' : 'hidden'} bottom-7 p-5 right-7 z-40 bg-black bg-opacity-60 rounded-lg md:w-64 md:h-64 xl:w-96 xl:h-96`}>
        {/* <div> */}
        <button
          className="p-1 ml-auto bg-transparent border-0 text-black align-middle opacity-40 float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:opacity-100"
          onClick={() => setLaunchToggle(false)}

        >
          <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
            ×
          </span>
        </button>
        {/* </div> */}
        <div className="p-3 sm:mb-3 mb-6 md:mb-10 font-black tracking-wider uppercase mb-2 bg-gray-300 w-full rounded-md">
          Create an event
        </div>


        <div className="p-3 md:pl-4 md:pr-10 mb-2 md:h-3/5 flex flex-col justify-start gap-3 bg-gray-200 w-full rounded-md">
          <div>
            <label className="p-1 align-middle font-bold" htmlFor="addService">Event Name</label>
            <div className="bg-white mt-2 w-full shadow-xl rounded-md">
              <input type="text" id="addService" placeholder="Enter the name of your service..." className="placeholder:text-slate-400 border-0 w-full placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md" />
            </div>
          </div>
          <div>
            <label className="p-1 align-middle font-bold" htmlFor="addService">Event Type</label>
            <div className="bg-white mt-2 w-full shadow-xl rounded-md">
              {/* <input type="text" id="addService" placeholder="Enter the name of your service..." className="placeholder:text-slate-400 border-0 w-full placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md" /> */}
              <select name="" className="placeholder:text-slate-400 border-0 w-full placeholde
              r-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md" id="">
                <option value="">Choose event type</option>
                {serviceTypes.map((serviceType, index) => (
                  <option key={index} value={serviceType.name}> {serviceType.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
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