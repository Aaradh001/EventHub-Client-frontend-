import React from 'react'
import { Outlet } from 'react-router-dom'

const EventLayout = () => {
  return (
    <section className="w-full pt-40 md:pt-32 bg-white-100">
      <Outlet/>
    </section>
  )
}

export default EventLayout