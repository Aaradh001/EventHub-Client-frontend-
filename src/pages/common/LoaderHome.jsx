import React from 'react'
import "../../assets/styles/loaderHomeStyle.css"

const LoaderHome = () => {
    return (
        //     <div className="loader w-32"></div>
        <div className='h-screen w-full flex justify-center items-center'>
            <div className="spinner center">
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
            </div>
        </div>
    )
}

export default LoaderHome
