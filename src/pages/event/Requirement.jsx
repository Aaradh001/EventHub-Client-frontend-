import React, { useEffect, useState } from 'react'
import { MdOutlineDoubleArrow } from "react-icons/md";
import RequirementFormInput from '../../components/subComponents/RequirementFormInput';
import { BASE_URL } from '../../constants/constants';
import { TError } from '../../components/subFeatureComponents/Toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Requirement = () => {

  const [toggleReq, setToggleReq] = useState(true);
  const event = useSelector((state) => state.event);

  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceList, setServiceList] = useState([])
  let [cateringReqFormData, setCateringReqFormData] = useState({
    main_course: new Set(),
    starters: new Set(),
    desserts: new Set(),
    welcome_drinks: new Set(),
  })
  let [decorReqFormData, setDecorReqFormData] = useState({
    props_and_materials: new Set(),
    lighting_and_effects: new Set(),
  })
  const baseURL = BASE_URL;
  const token = localStorage.getItem('access');



  
  const catering_requirement_details = {
    "food_preferrence": "",
    "main_course": [],
    "starters": [],
    "desserts": [],
    "welcome_drinks": []
  }
  const decoration_requirement_details = {
    "theme_description": "",
    "area_span": null,
    "layout_description": "",
    "props_and_materials": [],
    "is_lighting_and_effects_required": [],
    "lighting_and_effects": [],
    "design_instructions": ""
  }
  const requirements = {
    service: null,
    event: "",
    req_name: "",
    has_sub: "",
    cost_per_unit: "",
    is_completed: "",
    start_time: "",
    requirement_details: null
  }

  async function fetchAllServices() {
    try {
      await axios.get(baseURL + "services/", {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setServiceList(res.data.results)
          console.log("From service list", res.data.results);
        });
    } catch (error) {
      TError("Data fetching failed !!")
      console.log(error);
      // console.log("the error is  :", error);
    }
  }






  function onReqFieldChange() {


  }

  function onItemRemove(key, data) {
    console.log(key, data);
    setCateringReqFormData((prev) => {
      const newSet = new Set(prev[key]);
      newSet.delete(data);
      return {
        ...prev,
        [key]: newSet
      }
    })
  }




  function onReqKeyUp(e, props) {
    if (props.as == "multi_text_select" && e.key == "Enter") {
      console.log("Hello world");

      // setRequirementFormData((prev) => {
      //   console.log(props.id);
      //   return {
      //     ...prev,
      //     [props.id]: [...prev[props.id], e.target.value]
      //   }
      // })

      setCateringReqFormData((prev) => {
        let value = e.target.value;
        e.target.value = "";
        return {
          ...prev,
          [props.id]: new Set([...prev[props.id], value])
        };
      })
    }
  }


  function onCategorySubmit() {
    let data = [
      {
        "req_name": "Catering",
        "start_time": cateringReqFormData?.start_time,
        "end_time": cateringReqFormData?.start_time,
        "requirement_details": null,
        "instance_type": "CATERING",
        "service": 9,
        "event": event
      },
    ]
  }


  const inputs = [
    {
      id: "req_name ",
      label: "Requirement Name",
      placeholder: "A name for requirement . .",
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
      id: "service_type",
      label: "Service Type",
      type: "text",
      name: "service_type",
      wrapperClass: "sm:col-span-2",
      // className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      className: "bg-white text-sm placeholder:text-slate-400 my-1 hover:shadow-lg border-0 placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md",
      labelclass: "block text-sm font-medium text-gray-400",
    },
  ]

  const cateringReqDetails = [
    {
      id: "food_preferrence",
      label: "Food Preferrence",
      placeholder: "Select the Food Preferrence . . .",
      type: "text",
      as: "select",
      options: [{
        value: "veg",
        name: "Veg"
      },
      {
        value: "non-veg",
        name: "Non Veg"
      }],
      name: "food_preference",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "Food preference is required",
      required: true,
    },
    {
      id: "main_course",
      label: "Main Course (Optional)",
      placeholder: "Select the Main Course . . .",
      type: "text",
      as: "multi_text_select",
      data: cateringReqFormData,
      onItemRemove,
      name: "main_course",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "Allowed characters: A-Z, a-z, Numbers: 0-9!",
      required: false,
      // pattern: "^[A-Za-z0-9\\s]+$",
    },
    {
      id: "starters",
      label: "Starters (Optional)",
      placeholder: "Select starters. . .",
      type: "text",
      as: "multi_text_select",
      data: cateringReqFormData,
      onItemRemove,
      name: "starters",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "Starter is required",
      required: false,
      // pattern: "^[A-Za-z0-9]{4,}$",
    },
    {
      id: "desserts",
      label: "Desserts (Optional)",
      placeholder: "Select desserts. . .",
      as: "multi_text_select",
      data: cateringReqFormData,
      onItemRemove,
      type: "text",
      name: "desserts",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "Desserts is required",
      required: false,
      // pattern: "^[A-Za-z0-9]{4,}$",
    },
    {
      id: "welcome_drinks",
      label: "Welcome Drinks (Optional)",
      placeholder: "Select Welcome Drinks. . .",
      as: "multi_text_select",
      data: cateringReqFormData,
      onItemRemove,
      type: "text",
      name: "welcome_drinks",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "Welcome Drinks is required",
      required: false,
      // pattern: "^[A-Za-z0-9]{4,}$",
    },
  ]

  const decorationReqDetails = [
    {
      id: "theme_description",
      label: "Theme description",
      placeholder: "Provide the theme description . . .",
      type: "text",
      as: "textArea",
      name: "theme_description",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "This field is required",
      required: true,
    },
    {
      id: "area_span",
      label: "Area of decoration (in sqm)",
      placeholder: "Enter area . . .",
      type: "number",
      data: decorReqFormData,
      onItemRemove,
      name: "main_course",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "Allowed characters: A-Z, a-z, Numbers: 0-9!",
      required: false,
      // pattern: "^[A-Za-z0-9\\s]+$",
    },
    {
      id: "layout_description",
      label: "Area Description",
      placeholder: "Describe the area of decoration . . .",
      type: "text",
      as: "textArea",
      name: "layout_description",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "This field is required",
      required: true,
    },
    {
      id: "props_and_materials",
      label: "Props and materials",
      title: "Add an item and press enter",
      placeholder: "Add props and materials. . .",
      type: "text",
      as: "multi_text_select",
      data: decorReqFormData,
      onItemRemove,
      name: "props_and_materials",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "This field is required",
      required: false,
      // pattern: "^[A-Za-z0-9]{4,}$",
    },
    {
      id: "lighting_and_effects",
      label: "Lighting and Effects",
      placeholder: "Add lighting and effects. . .",
      as: "multi_text_select",
      data: decorReqFormData,
      onItemRemove,
      type: "text",
      name: "lighting_and_effects",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "This field is required",
      required: false,
      // pattern: "^[A-Za-z0-9]{4,}$",
    },
    {
      id: "design_instructions",
      label: "Design Instructions",
      placeholder: "Enter the design instructions . . .",
      type: "text",
      as: "textArea",
      name: "design_instructions",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "This field is required",
      required: true,
    }
  ]


  function showForm(service) {
    if (service.requirement_type === "CATERING") {

    }
    else if (service.requirement_type === "DECORATION") {

    }
    else {

    }
  }


  function renderServiceForm() {

  }
  useEffect(() => {
    renderServiceForm();
  }, [selectedServices])

  useEffect(() => {
    fetchAllServices();
  }, [])

  return (
    <>
      <div className='p-8 bg-gradient-to-b from-red-100 md:gap-y-10 md:flex md:flex-col md:px-6 lg:px-8 text-slate-700'>
        <h1 className='py-4 md:px-3 text-xl md:text-5xl mr-auto roboto-bolder '>Requirements</h1>
        <div className='bg-violet-100 border border-violet-100 roboto-normal text-sm w-full md:max-w-7xl md:flex md:flex-row md:mx-auto gap-y-4  px-4  py-2 md:items-center rounded-md justify-between flex-col'>
          <div className='w-full py-2 md:justify-start md:gap-4 flex justify-between items-center'>
            <p>No of guests : </p>
            <p className='bg-white px-2 py-1 rounded-md text-xs'>{event.guest_count}</p>
          </div>
          <div className='w-full py-2 flex md:justify-end md:gap-4 justify-between items-center'>
            <p>Venue :</p>
            <p className='bg-white px-2 py-1 rounded-md text-xs'>{event.guest_count}</p>
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
            {serviceList.map((service, index) =>
              <div key={index} className='mb-3'>
                <input
                  type="checkbox"
                  onClick={() => setSelectedServices(
                    { service: service.slug })}
                  id={service.slug}
                  value={service.id}
                  className="hidden peer"
                />
                <label htmlFor={service.slug} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div className="block">
                    <div className="w-full text-lg font-semibold">{service.name}</div>
                  </div>
                </label>
              </div>
            )}


            {/* <div className='mb-3'>
              <input type="checkbox" onChange={() => setSelectedServices((prev) => {
                if (!selectedServices?.includes("decrationService")) {
                  setToggleReq(false);
                  return [...prev, "decrationService"]
                } else {
                  setToggleReq(true)
                }
              },)} id="decrationService" checked={selectedServices?.includes("decrationService") ? true : false} value="" className="hidden peer" required="" />
              <label htmlFor="decrationService" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="block">
                  <div className="w-full text-lg font-semibold">Decoration</div>
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
            </div> */}
          </div>


          <div className="md:2/5 mt-5 md:h-80 flex justify-center items-center bg-gray-50 hover:bg-gray-100 rounded-lg w-full">
            <h2 className='text-2xl font-bold text-gray-400'>No Requirements Selected</h2>
          </div>
          {/* <div className="md:2/5 mt-5 w-full">
            <div className={`${!toggleReq && "hidden"} bg-white p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
              <div className='mb-5'>
                <h2 className="text-2xl mb-1 font-extrabold dark:text-white">Catering Service</h2>
                <p className="my-1 text-lg text-gray-500">Starting cost - Rs 1000000</p>
              </div>
              <div className="grid grid-cols-2 gap-x-10">
                {
                  inputs.map((item, index) => {
                    return (
                      <div key={index}>
                        <FormInput onChange={onReqFieldChange} onKeyUp={onReqKeyUp}  {...item} />
                      </div>
                    )
                  })
                }

              </div>
              <button onClick={() => onCategorySubmit()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
          </div> */}


        </div>

      </div>
    </>
  )
}

export default Requirement
