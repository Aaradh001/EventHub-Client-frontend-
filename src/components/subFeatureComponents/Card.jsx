import React from "react"
import "../../assets/styles/home-page-button-style.css"

function CustomCard({serviceType}) {

    return (
        <div className="relative w-72 h-80 bg-white border border-gray-200 rounded-lg shadow">
            {/* <div className="w-full h-56"> */}
            <img className="rounded-lg w-full h-full object-cover" src={serviceType?.cat_image} alt="" />
            {/* </div> */}
            <div className="p-5 gap-5 rounded-b-lg absolute right-0 left-0 bottom-0 h-3/5 flex flex-col items-start justify-end bg-gradient-to-t from-black bg-opacity-100">
                <h5 className="text-xl font-bold tracking-tight text-white">{serviceType?.name}</h5>
                {/* <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Launch an event
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a> */}
                <button className="button-custom" data-text="Awesome">
                    <span className="actual-text">&nbsp;Launch&nbsp;</span>
                    <span aria-hidden="true" className="hover-text bg-black">&nbsp;Launch&nbsp;</span>
                </button>
            </div>
        </div>
    );
}
export default CustomCard;
