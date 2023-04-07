import React, { useEffect, useState } from "react";
import "./ProfileEvent.css";
import {
  faCalendar,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const id = JSON.parse(localStorage.getItem("user")).decodedToken._id;
// console.log(id)

const ProfileEvent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    let result = await fetch("http://localhost:8000/myEvent", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result);
    setData(result);
  };

  return (
    <div className="profile-event-overall">

      {data.length ?
        data.map((item)=>(
          <div key={item._id} className="profile-event-card">
          <h4>{item.title}</h4>
          <div className="profile-event-icon-desc">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="fa-xl"
              style={{ color: "#FE0000" }}
            />
            <p>{item.venue}</p>
          </div>
  
          <div className="profile-event-icon-desc-flex">
            <div className="profile-event-icon-desc">
              <FontAwesomeIcon
                icon={faCalendar}
                className="fa-xl"
                style={{ color: "#0028B7" }}
              />
              <p>{item.eventDate}</p>
            </div>
            <div className="profile-event-icon-desc">
              <FontAwesomeIcon
                icon={faClock}
                className="fa-xl"
                style={{ color: "#B70099" }}
              />
              <p>{item.eventTime}</p>
            </div>
          </div>
  
          <div className="profile-event-description">
            <div style={{ fontWeight: "700" }}>Description:</div>
            <div style={{ marginLeft: "10px" }}>
              {item.desc}
            </div>
          </div>
  
          <div className="profile-event-footer">
            <div className="profile-event-date">{item.date}</div>
            <div className="profile-event-button">View In Calendar</div>
          </div>
        </div>
        )) : <div className="font-[700] text-[1.1rem] pt-2 text-center m-auto">You haven't posted any event yet!</div>
      }
    </div>
  );
};

export default ProfileEvent;
