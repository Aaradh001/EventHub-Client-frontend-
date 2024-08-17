import Slider from "slick-slider-react"
import React, { useState } from 'react'
import CustomCard from "./Card"

function SlickSlider({serviceTypes, setServiceTypes}) {
    const [index, setIndex] = useState(0)

    return (
        <Slider draggable={true} dragFactor={1} alignment="center" className="gap-5" index={index} onSlide={setIndex} snap={true}
        children = {serviceTypes.map((serviceType, i)=>(
                <CustomCard key={i} serviceType={serviceType}/>
            ))}>
        </Slider>
    )
}

export default SlickSlider
