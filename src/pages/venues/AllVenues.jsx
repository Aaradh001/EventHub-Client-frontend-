import React, { useEffect, useState } from 'react'
import CustomCard from '../../components/subFeatureComponents/Card'
// import CardImage from '../../components/subFeatureComponents/CardImage'
import { BASE_URL } from '../../constants/constants'
import axios from 'axios';
import { TError } from '../../components/subFeatureComponents/Toastify';
import CardImage from '../../components/subFeatureComponents/CardImage';

function AllVenues() {


    const baseURL = BASE_URL;
    let [typeSelected, setTypeSelected] = useState(new Set())




    let [venuesList, setVenuesList] = useState([
        {
            "id": 2,
            "name": "Kumarakom lake resort",
            "city": "kottayam",
            "state": "kerala",
            "thumbnail": 'http://localhost:5173/src/assets/images/sliders/slider1.jpg',
            "reservation_status": "AVAILABLE",
            "venue_type": "OUTDOOR"
        },
        {
            "id": 3,
            "name": "Taj Resort",
            "city": "Kochi",
            "state": "Kerala",
            "thumbnail": 'http://localhost:5173/src/assets/images/sliders/slider1.jpg',
            "reservation_status": "AVAILABLE",
            "venue_type": "RESORT"
        },
        {
            "id": 7,
            "name": "Town Hall",
            "city": "Kochi",
            "state": "Kerala",
            "thumbnail": 'http://localhost:5173/src/assets/images/sliders/slider1.jpg',
            "reservation_status": "AVAILABLE",
            "venue_type": "INDOOR"
        },
        {
            "id": 8,
            "name": "Hyatt",
            "city": "Ernakulam",
            "state": "Kerala",
            "thumbnail": 'http://localhost:5173/src/assets/images/sliders/slider1.jpg',
            "reservation_status": "BOOKED",
            "venue_type": "INDOOR"
        }
    ]
    )
    let [tempVenuesList, setTempVenuesList] = useState([
        {
            "id": 2,
            "name": "Kumarakom lake resort",
            "city": "kottayam",
            "state": "kerala",
            "thumbnail": 'http://localhost:5173/src/assets/images/sliders/slider1.jpg',
            "reservation_status": "AVAILABLE",
            "venue_type": "OUTDOOR"
        },
        {
            "id": 3,
            "name": "Taj Resort",
            "city": "Kochi",
            "state": "Kerala",
            "thumbnail": 'http://localhost:5173/src/assets/images/sliders/slider1.jpg',
            "reservation_status": "AVAILABLE",
            "venue_type": "RESORT"
        },
        {
            "id": 7,
            "name": "Town Hall",
            "city": "Kochi",
            "state": "Kerala",
            "thumbnail": 'http://localhost:5173/src/assets/images/sliders/slider1.jpg',
            "reservation_status": "AVAILABLE",
            "venue_type": "INDOOR"
        },
        {
            "id": 8,
            "name": "Hyatt",
            "city": "Ernakulam",
            "state": "Kerala",
            "thumbnail": 'http://localhost:5173/src/assets/images/sliders/slider1.jpg',
            "reservation_status": "BOOKED",
            "venue_type": "INDOOR"
        }
    ]
    )



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

    useEffect(() => {
        console.log(typeSelected.values());
        if (Array.from(typeSelected.values()).length) {
             let newDatas = tempVenuesList.filter((item) => {
                return typeSelected.has(item.venue_type)
            })
            setVenuesList(newDatas);
        }else{
            setVenuesList(tempVenuesList)
        }
    }, [typeSelected])


    useEffect(() => {
        axios.get(baseURL + "venue/venues").then((data) => {
            let response = data.data.results.results;
            console.log("from venues",response);
            setVenuesList(response);
        }).catch((err) => {
            console.log(err);
            TError("Data fetching failer")
        })
    }, [])


    function onSearchVenues(e) {
        let searchKeyWord = e.target.value;

        if (searchKeyWord) {
            const query = searchKeyWord.toLowerCase();
            const filteredItems = tempVenuesList.filter(venue => {
                const place = (venue.city + "" + venue.state).toLowerCase()
                const name = venue.name.toLowerCase();

                if (place.includes(query) || name.includes(query)) {
                    return true;
                }
                return false;
            })
            if (filteredItems.length != tempVenuesList.length) {
                setVenuesList(filteredItems)
            }
        } else {
            setVenuesList(tempVenuesList)
        }
    }



    return (
        <section className="w-full pt-40 md:pt-32 bg-white-100">
            <div className='p-8 bg-gradient-to-b from-red-100 md:gap-y-10 md:flex md:flex-col md:px-6 lg:px-8 text-slate-700'>
                <h1 className='py-4 md:px-3 text-xl md:text-5xl mr-auto roboto-bolder '>All Venues</h1>
            </div>



            <div className=' p-8'>
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Technology</h3>

                <div className="flex   md:gap-x-10">
                    <div className="w-1/5">

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

                    </div>
                    <div className="w-4/5">
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
                            <div className="grid grid-cols-3 flex gap-5">
                                {
                                    venuesList.map((item) => {
                                        return (
                                            <CardImage 
                                                url={`/event/venues_details/${item.id}`} 
                                                status={item.reservation_status} 
                                                type={item.venue_type} 
                                                state={item.state} 
                                                image={item.thumbnail} 
                                                key={item.id} 
                                                id={item.id} 
                                                name={item.name} 
                                                city={item.city}/>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AllVenues