import { Carousel } from "flowbite-react";
// Inside the component or file where you want to import the images
import slider1 from "../../assets/images/sliders/slider1.jpg"
import slider2 from "../../assets/images/sliders/slider2.jpg"
import slider3 from "../../assets/images/sliders/slider3.jpg"
import slider4 from "../../assets/images/sliders/slider4.jpg"

function CarouselComponent() {
  const sliders = [slider1, slider2, slider3, slider4]
  return (
    <div className="h-full">
      <Carousel>
        {sliders.map((slider, i) => (
          <img key={`sliderImage${i}`} className="object-fill" src={slider} alt="..." />
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselComponent