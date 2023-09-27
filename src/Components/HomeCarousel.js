import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../media/maria-teneva-uHDbnG-Avpc-unsplash.jpg";
import img2 from "../media/mahmoud-sulaiman-QF_CGDotbGY-unsplash.jpg";
import img3 from "../media/julie-ricard-i9rzrKo5Vao-unsplash.jpg"
import img4 from "../media/jonathan-ramalho-0uQUV_JDU4Y-unsplash.jpg"

function HomeCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img src={img1} alt="img-1" 
        className="d-block w-100"
        style={{height: "95vh"}} />
        <Carousel.Caption>
          <h4>Madrid, Spain</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img2} alt="img-2" 
        className="d-block w-100"
        style={{height: "95vh"}} />
        <Carousel.Caption>
          <h4>Aftermath of civil war in Daraa, Syria</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img3} alt="img-3" 
        className="d-block w-100"
        style={{height: "95vh"}} />
        <Carousel.Caption>
          <h4>Syrian refugee camp outside Athens, Greece</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img4} alt="img-4" 
        className="d-block w-100"
        style={{height: "95vh"}} />
        <Carousel.Caption>
          <h4>Refugee camp in Iraq</h4>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;