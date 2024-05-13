import React, { useEffect, useState } from 'react'
// import "@fontsource/rubik-scribble/400.css";
const FlowAnimation = () => {
    const elements = []
    for (let index = 0; index < 10; index++) {
        elements.push(
            <p key={index} className="mx-6 inline-block whitespace-nowrap animate-marquee text-2xl font-bold text-black">OUR SERVICES</p>
        )
    }


    return (
        <div className=" relative mx-auto">
            <div className="absolute top-0 left-0 flow-runner bg-gray-200 font-extrabold w-full bg-gray-100 flex items-center">
                {elements}
            </div>
        </div>
    );
}

export default FlowAnimation
