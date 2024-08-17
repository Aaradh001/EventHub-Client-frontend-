import React, { useEffect, useState } from 'react'
import CustomCard from '../../components/subFeatureComponents/Card'
// import CardImage from '../../components/subFeatureComponents/CardImage'
import { BASE_URL } from '../../constants/constants'
import axios from 'axios';
import { TError, TSuccess } from '../../components/subFeatureComponents/Toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardImageVendor from '../../components/subFeatureComponents/CardImageVendor';

function AllVendors() {


    const baseURL = BASE_URL;
    const authentication_user = useSelector((state) => state.authentication_user);
    const event = useSelector((state) => state.event);
    const navigate = useNavigate()
    const token = localStorage.getItem("access");

    let [typeSelected, setTypeSelected] = useState(new Set())
    const [selectedVendor, setSelectedVendor] = useState(null)
    let [vendorList, setVendorList] = useState([])
    let [tempVendorList, setTempVendorList] = useState([])



    function addToTypeFilter(type) {
        if (typeSelected.has(type)) {
            setTypeSelected((prev) => {
                let data = new Set([...prev, type]);
                data.delete(type)
                return data;
            })
        } else {
            setTypeSelected((prev) => new Set([...prev, type]))
        }
    }

    // useEffect(() => {
    //     console.log(typeSelected.values());
    //     if (Array.from(typeSelected.values()).length) {
    //         let newDatas = tempVendorList.filter((item) => {
    //             return typeSelected.has(item.venue_type)
    //         })
    //         setVendorList(newDatas);
    //     } else {
    //         setVendorList(setTempVendorList)
    //     }
    // }, [typeSelected])


    useEffect(() => {
        axios.get(baseURL + "event/vendors",{headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
            Accept: "application/json",

          },}).then((data) => {
            let response = data.data.results.results;
            console.log("from vendors", response);
            setVendorList(response);
            setTempVendorList(response);
        }).catch((err) => {
            console.log(err);
            TError("Data fetching failer")
        })
    }, [])


    function onSearchVenues(e) {
        let searchKeyWord = e.target.value;

        if (searchKeyWord) {
            const query = searchKeyWord.toLowerCase();
            const filteredItems = setTempVendorList.filter(venue => {
                const place = (venue.city + "" + venue.state).toLowerCase()
                const name = venue.name.toLowerCase();

                if (place.includes(query) || name.includes(query)) {
                    return true;
                }
                return false;
            })
            if (filteredItems.length != setTempVendorList.length) {
                setVendorList(filteredItems)
            }
        } else {
            setVendorList(setTempVendorList)
        }
    }

    function handleChangeVendor(e) {
        console.log("reached", e.target.value);
        setSelectedVendor(e.target.value);
    }


    async function handleVenueSubmit() {
        try {
            const res = await axios.put(
                baseURL + `event/event-detail/${event.event_id}/`,
                { organiser: selectedVendor }, {
                headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${token}`,
                    Accept: "application/json",

                },
            }
            );
            console.log(res);
            if (res.status === 200) {
                TSuccess(`Vendor added successfully`)
                // navigate('')
            }

        }
        catch (error) {
            console.log(error);
            TError("operation failed")

        }
    }


    return (
        <section className="w-full  bg-white-100">
            <div className='p-8 bg-gradient-to-b from-red-100 md:gap-y-10 md:flex md:flex-col md:px-6 lg:px-8 text-slate-700'>
                <h1 className='py-4 md:px-3 text-xl md:text-5xl mr-auto roboto-bolder '>All Vendors</h1>
            </div>



            <div className=' p-8'>
                {/* <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Technology</h3> */}

                <div className="flex   md:gap-x-10">
                    {/* <div className="w-1/5">

                        <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input onChange={() => addToTypeFilter("OUTDOOR")} id="vue-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label htmlFor="vue-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Outdoor</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input onChange={() => addToTypeFilter("INDOOR")} id="react-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label htmlFor="react-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Indoor</label>
                                </div>
                            </li>

                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input onChange={() => addToTypeFilter("RESORT")} id="restort-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label htmlFor="restort-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Resort</label>
                                </div>
                            </li>

                        </ul>

                    </div> */}
                    <div className="w-full ml-16">
                        <div className="flex  gap-10 justify-between items-center">

                            <div className='md:max-w-md md:w-full'>
                                <form className=" mx-auto">
                                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input type="search" onChange={onSearchVenues} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                                    </div>
                                </form>
                            </div>


                        </div>

                        <div className='mt-5'>
                            <div className="grid grid-cols-3 gap-5">
                                {
                                    vendorList.map((item, index) => {
                                        return (
                                            <CardImageVendor
                                                isAuthenticated={authentication_user.isAuthenticated}
                                                url={`/event/vendor-details/${item.id}`}
                                                // status={item.reservation_status}
                                                index={index}
                                                website={item.website}
                                                state={item.state}
                                                onChange={handleChangeVendor}
                                                image={item.logo}
                                                key={item.id}
                                                id={item.id}
                                                name={item.company_name}
                                                city={item.city}
                                            />
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className='w-full p-5'>
                            <button
                                type='button'
                                className='float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                onClick={() => handleVenueSubmit()}>Add to event</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AllVendors