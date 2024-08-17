import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineDoubleArrow } from "react-icons/md";
import RequirementFormInput from '../../components/subComponents/RequirementFormInput';
import { BASE_URL } from '../../constants/constants';
import { TError, TSuccess } from '../../components/subFeatureComponents/Toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Requirement = () => {

  const [toggleReq, setToggleReq] = useState(true);
  const event = useSelector((state) => state.event);
  const [canSubmit, setCanSubmit] = useState(false)
  const navigate = useNavigate()

  const [selectedServices, setSelectedServices] = useState({});
  const [serviceList, setServiceList] = useState([])
  const [selectedRequirementData, setSelectedRequirementData] = useState([]);
  const [resetFlag, setResetFlag] = useState(false)
  const formRef = useRef(null)

  // let [cateringReqFormData, setCateringReqFormData] = useState({
  //   main_course: new Set(),
  //   starters: new Set(),
  //   desserts: new Set(),
  //   welcome_drinks: new Set(),
  // })

  // let [decorReqFormData, setDecorReqFormData] = useState({
  //   props_and_materials: new Set(),
  //   lighting_and_effects: new Set(),
  // })

  const baseURL = BASE_URL;
  const token = localStorage.getItem('access');

  const [cateringRequirementDetails, setCateringRequirementDetails] = useState({
    food_preference: "",
    main_course: new Set(),
    starters: new Set(),
    desserts: new Set(),
    welcome_drinks: new Set(),
  })
  const [decorationRequirementDetails, setDecorationRequirementDetails] = useState({
    theme_description: "",
    area_span: null,
    layout_description: "",
    props_and_materials: new Set(),
    lighting_and_effects: new Set(),
    design_instructions: ""
  })
  const [requirement, setRequirement] = useState({
    event: "",
    service: null,
    req_name: "",
    start_time: "",
    end_time: "",
    requirement_details: null
  })


  // useEffect(() => {
  //   console.log("Original state updated");
  // }, [cateringRequirementDetails])

  function onBasicChange(e, field) {
    setRequirement({
      ...requirement,
      [e.target.name]: e.target.value
    });
  }

  function onReqFieldChange(e, prp) {
    if (selectedServices.service_type === 'CATERING') {
      console.log(prp);
      e.target.getAttribute('data-input') !== "multi_text_select" &&
        setCateringRequirementDetails({
          ...cateringRequirementDetails,
          [e.target.name]: e.target.value
        })
    }
    else if (selectedServices.service_type === 'DECORATION') {
      e.target.getAttribute('data-input') !== "multi_text_select" &&
        setDecorationRequirementDetails({
          ...decorationRequirementDetails,
          [e.target.name]: e.target.value
        })
    }
  }
  useEffect(() => {
    console.log("service in operation  :", selectedServices)
    console.log("current main data  :", selectedRequirementData)
    console.log("current catering data  :", cateringRequirementDetails)
    console.log("current decoration data  :", decorationRequirementDetails)
  }, [selectedRequirementData])


  function onReqSave() {
    console.log("working");

    // e.preventDefault()
    console.log("the service in save", selectedServices.service_id);
    setSelectedRequirementData((prev) => {
      let index = prev.findIndex((each) => each.service == selectedServices.service_id);
      if (index !== -1) {
        const newState = [...prev];
        const newRequirement = requirement

        if (selectedServices.service_type === 'CATERING') {
          newRequirement.requirement_details = Object.keys(cateringRequirementDetails).reduce((details, item) => {
            details[item] = cateringRequirementDetails[item] instanceof Set
              ? Array.from(cateringRequirementDetails[item])
              : cateringRequirementDetails[item];
            return details;
          }, {});
        } else if (selectedServices.service_type === 'DECORATION') {
          newRequirement.requirement_details = Object.keys(decorationRequirementDetails).reduce((details, item) => {
            details[item] = decorationRequirementDetails[item] instanceof Set
              ? Array.from(decorationRequirementDetails[item])
              : decorationRequirementDetails[item];
            return details;
          }, {});
        }
        else {
          newRequirement.requirement_details = null
        }
        newRequirement.event = event.event_id
        newState[index] = { ...newState[index], ...newRequirement, service: selectedServices.service_id };
        return newState;
      } else {
        return prev;
      }

    });
    setCanSubmit(true);
  }

  async function finalReqSubmit() {
    if (selectedRequirementData.length) {
      try {
        const res = await axios.post(
          baseURL + "event/requirements_list_create/",
          selectedRequirementData, {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
            Accept: "application/json",

          },
        }
        );
        console.log(res);
        if (!res.data.errors.length && res.data.created.length == selectedRequirementData.length) {
          TSuccess("Requirements have been added, Kindly wait for listing of vendors")
          setSelectedRequirementData([]);
          setCateringRequirementDetails({
            food_preference: "",
            main_course: new Set(),
            starters: new Set(),
            desserts: new Set(),
            welcome_drinks: new Set(),
          });
          setDecorationRequirementDetails({
            theme_description: "",
            area_span: null,
            layout_description: "",
            props_and_materials: new Set(),
            lighting_and_effects: new Set(),
            design_instructions: ""
          });
          setSelectedServices({})
          navigate("/event/venues")

        }
      }
      catch (error) {
        console.log(error);
        TError(error.response)

      }


    } else {
      TError("You haven't added any requirements")
      return
    }

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

  function onItemRemove(key, data) {

    console.log("THE ONK IS", data);
    if (selectedServices.service_type === 'CATERING') {
      setCateringRequirementDetails((prev) => {
        const updatedDetails = { ...prev };
        const updatedSet = new Set(prev[key]);
        updatedSet.delete(data);
        updatedDetails[key] = updatedSet;
        console.log(updatedDetails);
        return updatedDetails;
      })

    }
    else if (selectedServices.service_type === 'DECORATION') {
      setDecorationRequirementDetails((prev) => {
        const updatedDetails = { ...prev };
        const updatedSet = new Set(prev[key]);
        updatedSet.delete(data);
        updatedDetails[key] = updatedSet;
        console.log(updatedDetails);
        return updatedDetails;
      })
    }
  }

  function onReqKeyUp(e, props) {
    if (props.as == "multi_text_select" && e.key == "Enter") {
      console.log("Hello world", cateringRequirementDetails);
      if (selectedServices.service_type === "CATERING") {

        setCateringRequirementDetails((prev) => {
          console.log("Here started");
          console.log(prev);
          const updatedDetails = { ...prev };
          updatedDetails[props.id] = new Set([...prev[props.id], e.target.value]);
          console.log(updatedDetails);
          e.target.value = ''
          return updatedDetails; // Return the updated state
        });


        console.log("State updated");
      }
      else if (selectedServices.service_type === "DECORATION") {
        setDecorationRequirementDetails((prev) => {
          console.log("Here started");
          console.log(prev);
          const updatedDetails = { ...prev }; // Create a copy of the previous state
          updatedDetails[props.id] = new Set([...prev[props.id], e.target.value]);
          console.log(updatedDetails);
          e.target.value = ''
          return updatedDetails; // Return the updated state
        });
      }
    }
  }


  const inputs = [
    {
      id: "req_name ",
      label: "Requirement Name",
      placeholder: "A name for requirement . .",
      type: "text",
      name: "req_name",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "bg-white text-sm placeholder:text-slate-400 my-1 hover:shadow-lg border-0 placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md",
      error: "Allowed characters: A-Z, a-z, Numbers: 0-9.",
      wrapperclass: "sm:col-span-2",
      required: true,
      pattern: "^[A-Za-z0-9]+$",
    },
    {
      id: "start_time",
      label: "Start date and time",
      // placeholder: "Enter the first name . . .",
      type: "datetime-local",
      name: "start_time",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "bg-white text-sm placeholder:text-slate-400 my-1 hover:shadow-lg border-0 placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md",
      min: new Date().toISOString().split('T')[0],
      error: "Provide a valid start date greater than today!",
      wrapperclass: "w-full",
      required: true,
      // pattern: "^[A-Za-z]{2,}$",
    },
    {
      id: "end_time",
      label: "End date and time",
      // placeholder: "Enter the first name . . .",
      type: "datetime-local",
      name: "end_time",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "bg-white text-sm placeholder:text-slate-400 my-1 hover:shadow-lg border-0 placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-10 pl-4 flex-1 w-full cursor-text rounded-md",
      min: new Date().toISOString().split('T')[0],
      // className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      error: "Provide a valid end date greater than today!",
      required: true,
      wrapperclass: "w-full",
      // pattern: "^[A-Za-z]{2,}$",
    },
  ]

  const cateringReqDetails = [
    {
      id: "food_preferrence",
      label: "Food Preferrence",
      placeholder: "Select the Food Preferrence . . .",
      type: "text",
      defaultValue: "veg",
      as: "select",
      options: [{
        value: "",
        name: "Select Food preference"
      },
      {
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
      data: Array.from(cateringRequirementDetails.main_course.values()),
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
      data: Array.from(cateringRequirementDetails.starters.values()),

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
      data: Array.from(cateringRequirementDetails.desserts.values()),

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
      data: Array.from(cateringRequirementDetails.welcome_drinks.values()),

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
      name: "area_span",
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
      data: Array.from(decorationRequirementDetails.props_and_materials),
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
      data: Array.from(decorationRequirementDetails.lighting_and_effects),
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


  function renderServiceForm() {
    if (selectedServices.service_type === 'CATERING') {
      // Render cateringReqDetails
      return cateringReqDetails
    }
    else if (selectedServices.service_type === 'DECORATION') {
      // Render decorReqDetails
      return decorationReqDetails
    }
    else {
      return null
    }

  }

  const handleSelect = (service) => {
    if (service.id === selectedServices.service_id) {
      console.log("if working");
      setSelectedServices({})
    }
    else {
      console.log("else working");
      setSelectedServices({
        service_id: service.id,
        service_type: service.service_type,
        service_name: service.name
      })
    }

    if (!selectedRequirementData.find((each) => each.service == service.id)) {
      setSelectedRequirementData((prev) => (
        [
          ...prev,
          {
            service: service.id
          }
        ]
      ))
    }
    else {
      setSelectedRequirementData((prev) => prev.filter((item) => item.service !== service.id))
    }
  }

  useEffect(() => {
    fetchAllServices();
  }, [])

  return (
    <>
      <div className='p-8 bg-gradient-to-b from-red-100 md:gap-y-10 md:flex md:flex-col md:px-6 lg:px-8 text-slate-700'>
        <h1 className='py-4 md:px-3 text-xl md:text-5xl mr-auto roboto-bolder'>Requirements</h1>
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
                  onChange={() => handleSelect(service)}
                  type='checkbox'
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
          </div>

          {!selectedServices.service_name ? (
            <div className="md:2/5 mt-5 md:h-80 flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-lg w-full">
              <h2 className='text-2xl font-bold text-gray-400'>Select a requirement</h2>
            </div>

          ) : (
            <div className="md:2/5 mt-5 w-full bg-gray-50 shadow-neutral-400">
              <div className="relative bg-white p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className='mb-5'>
                  <h2 className="text-2xl mb-2 font-extrabold dark:text-white">{selectedServices.service_name}</h2>
                  {/* <p className="my-1 text-lg text-gray-500">Starting cost - Rs 1000000</p> */}
                </div>
                <form ref={formRef}>
                  <div className="grid mt-4 grid-cols-2 gap-x-10">
                    {
                      inputs.concat(renderServiceForm()).map((item, index) => {
                        return (
                          item &&
                          <div key={index}>
                            <RequirementFormInput resetflag={resetFlag} onChange={(e) => index < inputs.length ? onBasicChange(e) : onReqFieldChange(e)} onKeyUp={onReqKeyUp} {...item} />
                          </div>
                        )
                      })
                    }
                  </div>
                  <button type='button' onClick={() => onReqSave()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save
                  </button>
                </form>
                <button type='button' onClick={() => finalReqSubmit()} className={`${!canSubmit && 'hidden'} absolute bottom-6 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Requirement
