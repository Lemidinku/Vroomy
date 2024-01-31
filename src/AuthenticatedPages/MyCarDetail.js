import { supabase } from "../auth";
import React, { useEffect, useState, useContext } from "react";
import { v4 as urlGenerator } from "uuid";
import { AuthContext } from "../AuthProvider";
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

const MyCarDetail = () => {
  const generalCarImageUrl =
    "https://wwoucxtafkpgzvjrwjye.supabase.co/storage/v1/object/public/car_images/";
  const generalAvatarUrl =
    "https://wwoucxtafkpgzvjrwjye.supabase.co/storage/v1/object/public/avatars/";
  const [car, setCar] = useState(null);

  const { user } = useContext(AuthContext);
  const { carId } = useParams();
  // taken from input
  const [carInfo, setCarInfo] = React.useState({
    // makeAndModel: "",
    // year: "",
    // type: "",
    // color: "",
    // seatingCapacity: "",
    daily_rental_fee: "",
    location: "",
    // transmissionType: "automatic",
    // additionalFeatures: "",

    //photos
    photo1: "",
    photo2: "",
    photo3: "",
  });
  const [editing, setEditing] = React.useState(false);
  const [activeImage, setActiveImage] = React.useState(2);

  useEffect(() => {
    // fetch car details from backend
    fetch(
      `http://localhost:9000/api/v1/cars/${carId}`,
      (Headers = { "Content-Type": "application/json", method: "GET" })
    )
      .then((res) => res.json())
      .then((data) => setCar(data));
  }, []);

  const uploadCarImage = async (imagePath, image) => {
    const { error: uploadError } = await supabase.storage
      .from("car_images")
      .upload(imagePath, image);
    if (uploadError) console.log("Error Occured while uploading the file");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    //generate random urls for the images
    let url_1;
    let url_2;
    let url_3;

    // upload images
    try {
      if (carInfo.photo1) {
        url_1 = urlGenerator();
        await uploadCarImage(url_1, carInfo.photo1);
      }

      if (carInfo.photo2) {
        url_2 = urlGenerator();
        await uploadCarImage(url_2, carInfo.photo2);
      }
      if (carInfo.photo3) {
        url_3 = urlGenerator();
        await uploadCarImage(url_3, carInfo.photo3);
      }
    } catch (err) {
      console.error(err.message);
      return;
    }

    try {
      await fetch(`http://localhost:9000/api/v1/cars/${carId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          user_id: user.id,
        },
        body: JSON.stringify({
          location: carInfo.location,
          daily_rental_fee: carInfo.daily_rental_fee,
          photo_url_1: url_1,
          photo_url_2: url_2,
          photo_url_3: url_3,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    setCarInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleImgChange = (e) => {
    setCarInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.files[0],
      };
    });
  };

  let activeImageUrl = `photo_url_${activeImage}`;
  console.log(carInfo);
  console.log(car?.owner_id, user.id);
  return (
    <>
      {car ? (
        <div className="grid car-detail main-contianer">
          <div className="flex" style={{ justifyContent: "space-between" }}>
            <Link to={`../`}>
              <FontAwesomeIcon
                className="car-detail__back"
                icon={faArrowLeft}
              />
            </Link>
            <div>
              {editing && (
                <div className="saveCofirmation">
                  <button
                    type="submit"
                    className="saveConfirmation__saveButton "
                    onClick={handleSave}
                  >
                    <h3>Save Changes</h3>
                  </button>
                  <button
                    type="reset"
                    className="saveConfirmation__cancelButton"
                    onClick={() => setEditing(false)}
                  >
                    <h3>Cancel</h3>
                  </button>
                </div>
              )}
              {!editing && (
                <div className="editProfile">
                  <button
                    type="button"
                    className="editProfile__button"
                    onClick={() => setEditing(true)}
                  >
                    <h3>Edit Car</h3>
                  </button>
                  <button
                    type="button"
                    className="editProfile__button"
                    // onClick={}
                  >
                    <h3>Delete</h3>
                  </button>
                </div>
              )}
            </div>
          </div>

          <form
            className=" flex about-car section-container"
            style={{ margin: "auto" }}
          >
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
                    onClick={() => setActiveImage(1)}
                    src={
                      car?.photo_url_1
                        ? generalCarImageUrl + car?.photo_url_1
                        : insideImage
                    }
                    alt=""
                    className="shadow rounded"
                  />
                  {editing && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImgChange}
                      name="photo1"
                      className="image-input"
                    />
                  )}
                </li>
                <li>
                  <img
                    onClick={() => setActiveImage(2)}
                    src={
                      car?.photo_url_2
                        ? generalCarImageUrl + car?.photo_url_2
                        : frontImage
                    }
                    alt=""
                    className="shadow rounded"
                  />

                  {editing && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImgChange}
                      name="photo2"
                      required
                      className="image-input"
                    />
                  )}
                </li>
                <li>
                  <img
                    onClick={() => setActiveImage(3)}
                    src={
                      car?.photo_url_3
                        ? generalCarImageUrl + car?.photo_url_3
                        : rearImage
                    }
                    alt=""
                    className=" shadow rounded"
                  />
                  {editing && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImgChange}
                      name="photo3"
                      className="image-input"
                    />
                  )}
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

                  <p>{car?.type || "Type"}</p>
                </li>
                <li className="flex-start">
                  <FontAwesomeIcon
                    className="car-card__description__icon"
                    icon={faChair}
                  />
                  <p>{car?.seating_capacity || 0} Seats</p>
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

                  {editing ? (
                    <input
                      type="text"
                      name="location"
                      id="location"
                      minLength="3"
                      value={carInfo.location}
                      onChange={handleChange}
                      required
                    />
                  ) : (
                    <p>{car?.location || "Location"}</p>
                  )}
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
                  {editing ? (
                    <input
                      placeholder={car?.daily_rental_fee}
                      onChange={handleChange}
                      name="daily_rental_fee"
                    />
                  ) : (
                    <span>{car?.daily_rental_fee}Br</span>
                  )}
                </p>
                <div className="owner-rating">
                  <img
                    src={
                      car?.profiles.avatar_url
                        ? generalAvatarUrl + car?.profiles.avatar_url
                        : profileImage
                    }
                    alt="profile image of owner"
                    className="car-detail__owner__image"
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
                </div>
              </div>
            </div>
          </form>
          <section className=" deal">
            <div className="calendar-container center-text">
              <p className="h-3" style={{ margin: "10px" }}>
                Availabilty Calendar
              </p>
              {car?.id && <Calendar carId={car?.id} />}
            </div>
          </section>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default MyCarDetail;
