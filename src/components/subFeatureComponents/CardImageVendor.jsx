import React from 'react'
import { Link } from 'react-router-dom'

function CardImageVendor({ image, name, city, state, id, website, isAuthenticated, url, index, onChange }) {
    return (
        <div >
            <div className="relative max-w-sm bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={url}>
                    <img className="rounded-t-lg w-full h-52" src={image} alt="" />
                    {/* <div className={`fit availableStatus absolute top-3  p-5 pt-1 pb-1 rounded-lg text-white right-5 ${status == "AVAILABLE" ? " bg-green-500" : " bg-red-500"}`}>
                        {status == "AVAILABLE" ? "Available" : "Not Available"}
                    </div> */}
                </Link>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    </a>
                    <span>Venue Type : {website}</span>
                    <div>
                        {

                        }
                        {/* <a href="#" className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Book now
                    </a> */}
                        {isAuthenticated &&
                            <div className='p-3 bg-green-100 rounded-md my-2 flex justify-start gap-6 items-center'>
                                <input id={index} type="radio" value={id} onChange={onChange} name='vendor' />
                                <label htmlFor={index}> Select this vendor</label>

                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardImageVendor