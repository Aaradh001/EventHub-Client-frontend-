import React from 'react'
import { Link } from 'react-router-dom'

function CardImage({image,name,city,state,id,status,type,url}) {
    return (
        <div >
            <div className="relative max-w-sm bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={url}>
                    <img className="rounded-t-lg w-full h-52" src={image} alt="" />
                    <div className={`fit availableStatus absolute top-3  p-5 pt-1 pb-1 rounded-lg text-white right-5 ${status=="AVAILABLE" ? " bg-green-500" : " bg-red-500"}`}>
                         {status=="AVAILABLE" ? "Available" : "Not Available"}
                    </div>
                </Link>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    </a>
                    <p className="mb-1 font-normal text-blue-700 dark:text-gray-400">
                       Location : {city  + " " +  state}
                    </p>
                    <span>Venue Type : {type}</span>
                   <div>
                    {
                        
                    }
                   <a href="#" className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Book now
                    </a>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default CardImage