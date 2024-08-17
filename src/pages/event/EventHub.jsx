import React, { useEffect, useState } from 'react'
import CustomCard from '../../components/subFeatureComponents/Card'
// import CardImage from '../../components/subFeatureComponents/CardImage'
import { BASE_URL } from '../../constants/constants'
import axios from 'axios';
import { TError, TSuccess } from '../../components/subFeatureComponents/Toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardImageVendor from '../../components/subFeatureComponents/CardImageVendor';

function EventHub() {


    const baseURL = BASE_URL;
    const [eventDetail, setEventDetail] = useState({})
    const authentication_user = useSelector((state) => state.authentication_user);
    const event = useSelector((state) => state.event);
    const navigate = useNavigate()
    const token = localStorage.getItem("access");
    console.log("the event datails", eventDetail);

    useEffect(() => {
        axios.get(baseURL + `event/event-detail/${event.event_id}`, {
            headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${token}`,
                Accept: "application/json",

            },
        }).then((res) => {
            console.log("from useeffect api call", res);
            setEventDetail(res.data)
        }).catch((err) => {
            console.log(err);
            TError("Data fetching failure")
        })
    }, []
    )


    return (
        <section className="w-full bg-gradient-to-br from-customBlue via-customLightPink to-customPink">
            <div
                className='p-8 md:gap-y-10 md:flex md:flex-col md:px-6 lg:px-8 text-slate-700'>
                <h1 className='py-4 md:px-3 text-xl md:text-5xl mr-auto text-black roboto-bolder uppercase'>{event.name}</h1>
            </div>
            <div className='p-8 flex flex-col md:flex-row gap-3 md:gap-10'>
                {/* <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Technology</h3> */}
                {/* <div className='md:max-w-md md:w-full'> */}
                <div className='w-full md:w-3/5 grow border-2.5 border-white shadow-lg px-6 py-8 rounded-2xl' style={{ background: "linear-gradient(130deg, rgba(255, 255, 255, 0.6), transparent)" }}>
                    <h2 className='roboto-bolder text-lg leading-4'>Details</h2>
                    <hr className='border-2 border-white my-3' />
                    <h3 className="roboto-medium text-md">Start with Photoshop. Amazing will follow.</h3>
                    <div className='w-full min-w-fit gap-5 grid grid-cols-2'>
                        <div className='flex  gap-4'>
                            <p className='roboto-medium text-md whitespace-nowrap'>Event name </p>
                            <span className='roboto-medium text-md whitespace-nowrap'>: {eventDetail.name}</span>
                        </div>
                        <div className='col-span-2 flex'>
                            <p className='roboto-medium text-md whitespace-nowrap'>Start date </p>
                            <span className='roboto-medium text-md whitespace-nowrap'>: {eventDetail.start_date}</span>
                        </div>
                        <div className='col-span-2 flex'>
                            <p className='roboto-medium text-md whitespace-nowrap'>End date </p>
                            <span className='roboto-medium text-md whitespace-nowrap'>: {eventDetail.end_date}</span>
                        </div>
                        <div className='col-span-2 flex'>
                            <p className='roboto-medium text-md whitespace-nowrap'>Organiser </p>
                            <span className='roboto-medium text-md whitespace-nowrap'>: {eventDetail.organiser}</span>
                        </div>
                    </div>
                </div>
                <div className='h-32 w-full md:w-2/5 border-2.5 border-white shadow-lg px-6 py-8 rounded-2xl' style={{ background: "linear-gradient(130deg, rgba(255, 255, 255, 0.6), transparent)" }}>
                    <h2 className='roboto-bolder text-lg leading-4'>fgdf</h2>
                    <h3 className="roboto-medium text-md">Start with Photoshop. Amazing will follow.</h3>
                </div>
            </div>
        </section>
    )
}

export default EventHub