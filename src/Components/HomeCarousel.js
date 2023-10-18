import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../media/maria-teneva-uHDbnG-Avpc-unsplash.jpg";
import img2 from "../media/mahmoud-sulaiman-QF_CGDotbGY-unsplash.jpg";
import img3 from "../media/julie-ricard-i9rzrKo5Vao-unsplash.jpg"
import img4 from "../media/jonathan-ramalho-0uQUV_JDU4Y-unsplash.jpg"
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function HomeCarousel() {
  let carouselSlides = [
      {
        img: img1,
        caption: "Madrid, Spain",
        alt: "img-1",
        link: "/news-and-events/The%20UN%20Security%20Council%20Must%20Do%20More%20to%20End%20Attacks%20on%20Civilians%20in%20Syria",
      },
      {
        img: img2,
        caption: "Aftermath of civil war in Daraa, Syria",
        alt: "img-2",
        link: "/news-and-events/44%20Syrian%20and%20International%20NGOs%20Call%20for%20Immediate%20End%20to%20Attacks%20on%20Civilians%20and%20Hospitals%20in%20Idlib,%20Syria",
      },
      {
        img: img3,
        caption: "Syrian refugee camp outside Athens, Greece",
        alt: "img-3",
        link: "/news-and-events/Uniting%20for%20Peace%20in%20Syria:%20Global%20Civil%20Society%20Appeal%20to%20UN%20Member%20States",
      },
      {
        img: img4,
        caption: "Refugee camp in Iraq",
        alt: "img-4",
        link: "/news-and-events/Joint%20NGO%20Statement%20Syria%20Cross-Border",
      }
  ]
  return (
    <Carousel fade>
      {
        carouselSlides.map((slide) => {
          return (
            <Carousel.Item>
              <Link to={slide.link}>
                <img
                  src={slide.img}
                  alt={slide.alt}
                  className="d-block w-100"
                  style={{ height: "95vh" }}
                />
                <Carousel.Caption>
                  <h4>{slide.caption}</h4>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          );
        })
      }
    </Carousel>
  );
}

export default HomeCarousel;