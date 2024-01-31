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
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const CarCard = ({ car }) => {
  const generalCarImageUrl =
    "https://wwoucxtafkpgzvjrwjye.supabase.co/storage/v1/object/public/car_images/";
  const generalAvatarUrl =
    "https://wwoucxtafkpgzvjrwjye.supabase.co/storage/v1/object/public/avatars/";

  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Link
      className="car-card shadow rounded"
      to={`${car.id}`}
      state={{ search: `?${searchParams.toString()}` }}
    >
      <div className="car-card__image-container">
        {car.is_electric && (
          <div className="car-card__electric">
            <p>Electric</p>
          </div>
        )}
        <img
          className="car-card__image"
          src={
            car.photo_url_1 ? generalCarImageUrl + car.photo_url_1 : carImage
          }
          alt="Car Image"
        />
      </div>
      <div className="car-card__text grid">
        <h2 className="p-2">{`${car.make_and_model} ${car.year}`}</h2>

        <div className="car-card__description">
          <ul>
            <li className="flex-start">
              <FontAwesomeIcon
                className="car-card__description__icon"
                icon={faCar}
              />
              <p>{car.type}</p>
            </li>
            <li className="flex-start">
              <FontAwesomeIcon
                className="car-card__description__icon"
                icon={faChair}
              />
              <p>
                <span>{car.seating_capacity} </span> Seats
              </p>
            </li>
            <li className="flex-start">
              <FontAwesomeIcon
                className="car-card__description__icon"
                icon={faGears}
              />
              <p>{car.transmission_type}</p>
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
              src={
                car.profiles.avatar_url
                  ? generalAvatarUrl + car.profiles.avatar_url
                  : OwnerprofileImage
              }
              alt="profile image of owner"
            />
            <p>{car.profiles.username}</p>
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
        <p className="price">{car.daily_rental_fee} BR</p>
      </div>
    </Link>
  );
};

export default CarCard;
