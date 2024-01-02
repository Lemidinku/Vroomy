import React from "react";
import "./CarCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChair,
  faGears,
  faLocationDot,
  faCar,
} from "@fortawesome/free-solid-svg-icons";

import carImage from "./g-class pick up.jpg";
import OwnerprofileImage from "./profile-sample.png";

const CarCard = () => {
  return (
    <div className="car-card car-card--electric shadow rounded">
      <img className="car-card__image" src={carImage} alt="g-class pick up" />
      <div className="car-card__text grid">
        <h2 className="p-2">Mercedice G-class 2015</h2>

        <div className="car-card__description">
          <ul>
            <li className="flex-start">
              <FontAwesomeIcon
                className="car-card__description__icon"
                icon={faCar}
              />
              <p>Convertable</p>
            </li>
            <li className="flex-start">
              <FontAwesomeIcon
                className="car-card__description__icon"
                icon={faChair}
              />
              <p>
                <span>5 </span> Seats
              </p>
            </li>
            <li className="flex-start">
              <FontAwesomeIcon
                className="car-card__description__icon"
                icon={faGears}
              />
              <p>Manual</p>
            </li>
            <li className="flex-start">
              <FontAwesomeIcon
                className="car-card__description__icon"
                icon={faLocationDot}
              />
              <p>4-kilo</p>
            </li>
          </ul>
          <div className="car-card__about-owner ">
            <img
              src={OwnerprofileImage}
              alt="profile image of owner"
              width="60"
              height="60"
            />
            <p>Owner Name</p>
            <ol className="flex owner-stars">
              <li className="star star-checked">
                {" "}
                <FontAwesomeIcon icon={faStar} />{" "}
              </li>
              <li className="star star-checked">
                {" "}
                <FontAwesomeIcon icon={faStar} />{" "}
              </li>
              <li className="star star-checked">
                {" "}
                <FontAwesomeIcon icon={faStar} />{" "}
              </li>
              <li className="star">
                {" "}
                <FontAwesomeIcon icon={faStar} />{" "}
              </li>
              <li className="star">
                {" "}
                <FontAwesomeIcon icon={faStar} />{" "}
              </li>
            </ol>
          </div>
        </div>
        <p className="price">$500</p>
      </div>
    </div>
  );
};

export default CarCard;
