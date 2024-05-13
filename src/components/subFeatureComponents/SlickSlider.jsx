import Slider from "slick-slider-react"
import React, { useState } from 'react'
import CustomCard from "./Card"

import imgHouseWarming from "../../assets/images/homePage/eventCategories/housewarming.jpg" 
import imgOffMeet from "../../assets/images/homePage/eventCategories/officialmeet.jpg" 
import imgWedding from "../../assets/images/homePage/eventCategories/wedding.jpg" 



function SlickSlider({serviceTypes, setServiceTypes}) {
    const [index, setIndex] = useState(0)

    {console.log("servicetypes      :",serviceTypes)}    
    return (
        <Slider draggable={true} dragFactor={1} alignment="center" className="gap-5" index={index} onSlide={setIndex} snap={true}
        children = {serviceTypes.map((serviceType, i)=>(
                <CustomCard key={i} serviceType={serviceType}/>
            ))}>
        </Slider>
    )
}

export default SlickSlider
