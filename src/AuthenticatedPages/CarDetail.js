import React, { useEffect, useState } from "react";
import "./CarDetail.css";
import "../Components/Calendar.css";

import Calendar from "../Components/Calendar";
import frontImage from "./images/front.webp";
import insideImage from "./images/inside.jpg";
import rearImage from "./images/rear.jpeg";
import profileImage from "./images/profile-sample.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faArrowLeft,
  faGears,
  faLocationDot,
  faChair,
  faCar,
} from "@fortawesome/free-solid-svg-icons";

import { useParams, Link, useLocation } from "react-router-dom";
import SendRequest from "../Components/SendRequest";

const CarDetail = () => {
  const generalCarImageUrl =
    "https://wwoucxtafkpgzvjrwjye.supabase.co/storage/v1/object/public/car_images/";
  const generalAvatarUrl =
    "https://wwoucxtafkpgzvjrwjye.supabase.co/storage/v1/object/public/avatars/";
  const [car, setCar] = useState(null);
  const [activeImage, setActiveImage] = React.useState(2);
  const { carId } = useParams();
  const location = useLocation();

  useEffect(() => {
    // fetch car details from backend
    fetch(
      `http://localhost:9000/api/v1/cars/${carId}`,
      (Headers = { "Content-Type": "application/json", method: "GET" })
    )
      .then((res) => res.json())
      .then((data) => setCar(data));
  }, []);

  let back_to_cars = location.state?.search || "";
  let activeImageUrl = `photo_url_${activeImage}`;
  console.log(activeImage);
  return (
    <>
      {car ? (
        <div className="grid car-detail main-contianer">
          <Link
            to={`/cars${back_to_cars}`}
            state={{ search: `${back_to_cars}` }}
          >
            <FontAwesomeIcon className="car-detail__back" icon={faArrowLeft} />
          </Link>
          <section className=" flex about-car section-container">
            <div className="about-car__car-images grid">
              <img
                className="about-car__car-images__main"
                src={
                  car[activeImageUrl]
                    ? generalCarImageUrl + car[activeImageUrl]
                    : frontImage
                }
                alt="front view of car selected"
              />
              <ul className="grid about-car__car-images__additionals">
                <li>
                  <img
                    src={
                      car?.photo_url_2
                        ? generalCarImageUrl + car?.photo_url_2
                        : insideImage
                    }
                    alt=""
                    className="shadow rounded"
                    onClick={() => setActiveImage(1)}
                  />
                </li>
                <li>
                  <img
                    src={
                      car?.photo_url_1
                        ? generalCarImageUrl + car?.photo_url_1
                        : frontImage
                    }
                    alt=""
                    className="shadow rounded"
                    onClick={() => setActiveImage(2)}
                  />
                </li>
                <li>
                  <img
                    src={
                      car?.photo_url_3
                        ? generalCarImageUrl + car?.photo_url_3
                        : rearImage
                    }
                    alt=""
                    className="shadow rounded"
                    onClick={() => setActiveImage(3)}
                  />
                </li>
              </ul>
            </div>
            <div className="grid about-car__description">
              <h1 className="h-2">
                {car?.make_and_model + " " + car?.year || "Car Model"}
              </h1>

              <ul className="grid about-car__description__specification">
                <li className="flex-start">
                  <FontAwesomeIcon
                    className="car-card__description__icon"
                    icon={faCar}
                  />
                  <p className="car-details--p">{car?.type || "Vitz"}</p>
                </li>
                <li className="flex-start">
                  <FontAwesomeIcon
                    className="car-card__description__icon"
                    icon={faChair}
                  />
                  <p className="car-details--p">
                    <span>{car?.seating_capacity || 7} </span> Seats
                  </p>
                </li>
                <li className="flex-start">
                  <FontAwesomeIcon
                    className="car-card__description__icon"
                    icon={faGears}
                  />
                  <p className="car-details--p">
                    {car?.transmission_type || "Manual"}
                  </p>
                </li>
                <li className="flex-start">
                  <FontAwesomeIcon
                    className="car-card__description__icon"
                    icon={faLocationDot}
                  />
                  <p className="car-details--p">4-kilo</p>
                </li>
              </ul>
              <h2 className="h-3">Features</h2>
              <ul className="grid about-car__description__specification">
                <li>
                  <p className="car-details--p">specification</p>
                </li>
                <li>
                  <p className="car-details--p">specification</p>
                </li>
                <li>
                  <p className="car-details--p">specification</p>
                </li>
                <li>
                  <p className="car-details--p">specification</p>
                </li>
              </ul>

              <div className="flex">
                <p className="car-detail__price">
                  <span>5000</span>Br
                </p>
                <Link
                  to={`/profile/${car?.profiles.username}`}
                  className="owner-rating"
                >
                  <img
                    src={
                      car?.profiles.avatar_url
                        ? generalAvatarUrl + car.profiles.avatar_url
                        : profileImage
                    }
                    className="car-detail__owner__image"
                  />
                  <p className="car-details--p">{car?.profiles.username}</p>
                  <ol className="star-container flex">
                    <FontAwesomeIcon
                      className="star--checked star--big"
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className="star--checked star--big"
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className="star--checked star--big"
                      icon={faStar}
                    />
                    <FontAwesomeIcon className="star--big" icon={faStar} />
                    <FontAwesomeIcon className="star--big" icon={faStar} />
                  </ol>
                </Link>
              </div>
            </div>
          </section>
          <section className=" deal">
            <SendRequest carId={car?.id} daily_price={car.daily_rental_fee} />
            <div className="calendar-container center-text">
              <p className="h-3" style={{ margin: "10px" }}>
                Availabilty Calendar
              </p>
              {car?.id && <Calendar carId={car?.id} />}
            </div>
          </section>
        </div>
      ) : (
        <h1>Loading... or Car not found</h1>
      )}
    </>
  );
};

export default CarDetail;
