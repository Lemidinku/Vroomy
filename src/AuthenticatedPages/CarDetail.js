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
  console.log(car);
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
                src={frontImage}
                alt="front view of car selected"
              />
              <ul className="grid about-car__car-images__additionals">
                <li>
                  <img src={insideImage} alt="" className="shadow rounded" />
                </li>
                <li>
                  <img src={rearImage} alt="" className="shadow rounded" />
                </li>
                <li>
                  <img src={frontImage} alt="" className="shadow rounded" />
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
                  <p>{car?.type || "Vitz"}</p>
                </li>
                <li className="flex-start">
                  <FontAwesomeIcon
                    className="car-card__description__icon"
                    icon={faChair}
                  />
                  <p>
                    <span>{car?.seating_capacity || 7} </span> Seats
                  </p>
                </li>
                <li className="flex-start">
                  <FontAwesomeIcon
                    className="car-card__description__icon"
                    icon={faGears}
                  />
                  <p>{car?.transmission_type || "Manual"}</p>
                </li>
                <li className="flex-start">
                  <FontAwesomeIcon
                    className="car-card__description__icon"
                    icon={faLocationDot}
                  />
                  <p>4-kilo</p>
                </li>
              </ul>
              <h2 className="h-3">Features</h2>
              <ul className="grid about-car__description__specification">
                <li>
                  <p>specification</p>
                </li>
                <li>
                  <p>specification</p>
                </li>
                <li>
                  <p>specification</p>
                </li>
                <li>
                  <p>specification</p>
                </li>
              </ul>

              <div className="flex">
                <p className="car-detail__price">
                  <span>5000</span>Br
                </p>
                <footer className="owner-rating">
                  <img
                    src={profileImage}
                    alt="profile image of owner"
                    width="60"
                    height="60"
                  />
                  <p>{car?.profiles.username}</p>
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
                </footer>
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
