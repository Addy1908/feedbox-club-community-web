import React, { useState, useEffect } from "react";
import "./HomePageEvent.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Scrollbars from "react-custom-scrollbars";

const HomePageEvent = () => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async (e) => {
    let result = await fetch("http://localhost:8000/getAllEvent");
    result = await result.json();
    setEvent(result);
  };

  return (
    <div className="overall-main-page-event">
      <div className="event-main-div-res">
        {event.map((item) => (
          <div className="HomePageEvent" key={item._id}>
            <h2>{item.title}</h2>
            <div className="home-page-event-time">
              <img src="Images/clock.svg" alt="" />
              <p className="home-page-event-time-p">
                Event Date : {item.eventDate}
              </p>
            </div>
            <div className="home-page-event-description">{item.desc}</div>
            <div className="home-page-event-button">
              <button className="home-page-event-button-interested">
                Interested
              </button>
              <button className="home-page-event-button-knowmore">
                Know More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* mobile view */}
      <div className="main-event-carousel">

        <Carousel
          autoPlay interval="5000" 
          showArrows={true}
          showIndicators={true}
          showThumbs={false}
          infiniteLoop
          // dynamicHeight
          // className=""
        >
          {event.map((item, index) => (
            <div className="HomePageEvent ">
              <Scrollbars style={{ height: "150px" }}>
              <h2> {item.title} </h2>
              <div className="home-page-event-time">
                <FontAwesomeIcon icon={faClock} className="fa-xl" />
                <p className="home-page-event-time-p">{item.eventDate}</p>
              </div>
              <div className="home-page-event-description">
                {item.desc}
              </div>
              <div className="home-page-event-button">
                <button className="home-page-event-button-knowmore">
                  Know More
                </button>
                <button className="home-page-event-button-interested">
                  Interested
                </button>
              </div>
              </Scrollbars>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomePageEvent;
