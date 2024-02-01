import React, { useEffect, useState } from "react";
import profileImg from "./profile-sample.png";
import rateImage from "./rate image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../AuthenticatedPages/Notifications.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const MainContent = ({ notification, car }) => {
  let leftContent = "";
  let rightContent = "";
  if (notification.notification_type == "request expired") {
    leftContent = `Your rental request on `;
    rightContent = "has expired.";
  } else if (notification.notification_type == "rent_started") {
    leftContent = `Your rent on `;
    rightContent = "starts today.";
  } else if (notification.notification_type == "rent_completed") {
    leftContent = `Your rent on `;
    rightContent = "ended today.";
  } else if (notification.notification_type == "got_rated") {
    leftContent = `You got rated on rental of `;
  } else {
    leftContent = "Generic notification";
  }

  return (
    <span>
      {leftContent}
      <Link to={`../cars/${car.id}`}>
        {`${car?.make_and_model} ${car?.type} ${car?.year}`}
      </Link>
      {rightContent}
    </span>
  );
};

const NotificationCard = ({ notification }) => {
  const [starsChoosen, setStarsChoosen] = useState(1);
  const [car, setCar] = useState({}); // car info
  const [owner, setOwner] = useState({}); // owner info
  const { user } = React.useContext(AuthContext);
  const [rent, setRent] = useState({}); // rent info

  // fetch car info
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/cars/${notification.car_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };

    const fetchRent = async () => {
      try {
        let rentId = notification.message.split(":")[1];
        const response = await fetch(
          `http://localhost:9000/api/v1/rents/${rentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRent(data);
      } catch (error) {
        console.error("Error fetching Rent:", error);
      }
    };

    fetchCar();
    if (notification.notification_type == "got_rated") {
      fetchRent();
    }
  }, []);

  // a function that accepts a date and returns a string like "1d ago" or "2h ago"
  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return `${Math.floor(interval)}y`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)}m`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)}d`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)}h`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)}min`;
    }
    return `${Math.floor(seconds)}s`;
  };

  const submitRate = async () => {
    let rentId = notification.message.split(":")[1];
    const res = await fetch(`http://localhost:9000/api/v1/rents/${rentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: starsChoosen,
        account_type: user.user_metadata.account_type,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  let rated =
    user.user_metadata.account_type === "owner"
      ? rent?.renter_satisfaction
      : rent?.owner_satisfaction;

  return (
    <div className="notification_card notification_unread">
      .
      <div className="notification_card_main">
        <div className="notification_card_main_left">
          <img
            className="notification_card_main_avatar"
            src={profileImg}
            alt="profile_image"
          />
          <p className="notification_card_main_content">
            {/* {`Your rental request on ${car?.make_and_model} ${car?.type} ${car?.year} has expired.`} */}
            <MainContent notification={notification} car={car} />
          </p>
        </div>

        <div className="notification_card_main_right">
          <span>{timeSince(new Date(notification.created_at))}</span>
          <span className="notification_card_circle"></span>
        </div>
      </div>
      <div className="notification_card_sub">
        {notification.notification_type == "got_rated" && (
          <div className="notification_stars">
            <FontAwesomeIcon
              className={"notification__star--colored"}
              icon={faStar}
            />
            <FontAwesomeIcon
              className={
                rated >= "2"
                  ? "notification__star--colored"
                  : `notification__star`
              }
              icon={faStar}
            />
            <FontAwesomeIcon
              className={
                rated >= "3"
                  ? "notification__star--colored"
                  : `notification__star`
              }
              icon={faStar}
            />
            <FontAwesomeIcon
              className={
                rated >= "4"
                  ? "notification__star--colored"
                  : `notification__star`
              }
              icon={faStar}
            />
            <FontAwesomeIcon
              className={
                rated >= "5"
                  ? "notification__star--colored"
                  : `notification__star`
              }
              icon={faStar}
            />
          </div>
        )}

        {notification.notification_type == "rent_completed" && (
          <Popup
            trigger={
              <button className="notification_card_rate_btn">Rate</button>
            }
            position="center"
            offsetY={100}
            arrow={false}
          >
            <div className="notification_card_rate_popup">
              <img className="notification_rate_img" src={rateImage} />
              <p className="notification_rate_title">Rate your experience</p>
              <div className="notification_stars">
                <FontAwesomeIcon
                  className={
                    starsChoosen >= "1"
                      ? "notification__star--colored"
                      : "notification__star"
                  }
                  icon={faStar}
                  onClick={() => setStarsChoosen(1)}
                />
                <FontAwesomeIcon
                  className={
                    starsChoosen >= "2"
                      ? "notification__star--colored"
                      : "notification__star"
                  }
                  icon={faStar}
                  onClick={() => setStarsChoosen(2)}
                />
                <FontAwesomeIcon
                  className={
                    starsChoosen >= "3"
                      ? "notification__star--colored"
                      : "notification__star"
                  }
                  icon={faStar}
                  onClick={() => setStarsChoosen(3)}
                />
                <FontAwesomeIcon
                  className={
                    starsChoosen >= "4"
                      ? "notification__star--colored"
                      : "notification__star"
                  }
                  icon={faStar}
                  onClick={() => setStarsChoosen(4)}
                />
                <FontAwesomeIcon
                  className={
                    starsChoosen >= "5"
                      ? "notification__star--colored"
                      : "notification__star"
                  }
                  icon={faStar}
                  onClick={() => setStarsChoosen(5)}
                />
              </div>

              <button
                onClick={submitRate}
                className="notification_card_submit_btn"
              >
                Submit
              </button>
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
