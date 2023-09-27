import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../media/maria-teneva-uHDbnG-Avpc-unsplash.jpg";
import img2 from "../media/mahmoud-sulaiman-QF_CGDotbGY-unsplash.jpg";
import img3 from "../media/julie-ricard-i9rzrKo5Vao-unsplash.jpg"
import img4 from "../media/jonathan-ramalho-0uQUV_JDU4Y-unsplash.jpg"

function HomeCarousel() {
  let carouselSlides = [
      {
        img: img1,
        caption: "Madrid, Spain",
        alt: "img-1"
      },
      {
        img: img2,
        caption: "Aftermath of civil war in Daraa, Syria",
        alt: "img-2"
      },
      {
        img: img3,
        caption: "Syrian refugee camp outside Athens, Greece",
        alt: "img-3"
      },
      {
        img: img4,
        caption: "Refugee camp in Iraq",
        alt: "img-4"
      }
  ]
  return (
    <Carousel fade>
      {
        carouselSlides.map((slide) => {
          return (
            <Carousel.Item>
              <img
                src={slide.img}
                alt={slide.alt}
                className="d-block w-100"
                style={{ height: "95vh" }}
              />
              <Carousel.Caption>
                <h4>{slide.caption}</h4>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })
      }
    </Carousel>
  );
}

export default HomeCarousel;