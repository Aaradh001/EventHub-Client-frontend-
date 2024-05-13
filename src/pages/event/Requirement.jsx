import React from 'react'
import { MdOutlineDoubleArrow } from "react-icons/md";


const Requirement = () => {
  return (
    <>
      <div className='p-8 bg-gradient-to-b from-red-100 md:gap-y-10 md:flex md:flex-col md:px-6 lg:px-8 text-slate-700'>
        <h1 className='py-4 md:px-3 text-xl md:text-5xl mr-auto roboto-bolder '>Requirements</h1>
        <div className='bg-violet-100 border border-violet-100 roboto-normal text-sm w-full md:max-w-7xl md:flex md:flex-row md:mx-auto gap-y-4 md:flex-row px-4 md:mx-auto py-2 md:items-center rounded-md justify-between flex-col'>
          <div className='w-full py-2 md:justify-start md:gap-4 flex justify-between items-center'>
            <p>No of guests :</p>
            <p className='bg-white px-2 py-1 rounded-md text-xs'>1000</p>
          </div>
          <div className='w-full py-2 flex md:justify-end md:gap-4 justify-between items-center'>
            <p>Venue :</p>
            <p className='bg-white px-2 py-1 rounded-md text-xs'>Resort</p>
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
      <div className='w-full h-96'>
      </div>
    </>
  )
}

export default Requirement
