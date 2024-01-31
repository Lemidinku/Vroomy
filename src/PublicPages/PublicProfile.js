import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../auth";
import "../styles/profile.css";

// temporary imports
import carImage from "../images/car.png";
import userPhoto from "../images/userPhoto.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function PublicProfile() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState({});

  const generalUrl =
    "https://wwoucxtafkpgzvjrwjye.supabase.co/storage/v1/object/public/avatars/";

  const getProfileInfo = async () => {
    let { data: prof, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username);
    if (error) console.log(error);
    else setUserInfo(prof[0]);
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <>
      {!userInfo ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="profile">
          <div className="firstColumn">
            <div className="user">
              <div className="user__photoAndRating">
                <div className="user__photoAndRating__photo">
                  <img
                    className="user__photo__image"
                    src={
                      userInfo?.avatar_url
                        ? generalUrl + userInfo.avatar_url
                        : userPhoto
                    }
                    alt=""
                  />
                </div>
                <div className="user__photoAndRating__rating">
                  <div className="user__photoAndRating__rating__stars">
                    <FontAwesomeIcon
                      className={"rating__star--colored"}
                      icon={faStar}
                    />
                    <FontAwesomeIcon className={"rating__star"} icon={faStar} />
                    <FontAwesomeIcon className={"rating__star"} icon={faStar} />
                    <FontAwesomeIcon className={"rating__star"} icon={faStar} />
                    <FontAwesomeIcon className={"rating__star"} icon={faStar} />
                  </div>
                  <div className="user__photoAndRating__rating__numberOfStars">
                    <h2>5 Stars</h2>
                  </div>
                </div>
              </div>

              <div className="user__name">
                {/* <input
                className="info__list__li__input"
                type="text"
                name="full_name"
                id="full_name"
                value={newUserInfo.full_name}
                onChange={handleChange}
                placeholder={userInfo.full_name}
                readOnly={editing ? false : true}
                required
              /> */}
                <div className="info__list__li__input">
                  {userInfo?.full_name}
                </div>
              </div>

              <div className="user__joiningDate">
                <h3>
                  Joined on{" "}
                  <span>
                    {new Date(userInfo?.created_at).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>{" "}
                  - 132 Trips
                </h3>
              </div>
            </div>
            <div className="info">
              <div className="info__heading">
                <h2>Personal Info</h2>
              </div>
              <div className="info__list">
                <ul className="info__list__ul">
                  <li className="info__list__li">
                    <h2>Email Address</h2>
                  </li>
                  <li className="info__list__li">
                    <h2>Username</h2>
                  </li>
                  <li className="info__list__li">
                    <h2>Phone Number</h2>
                  </li>
                </ul>
                <ul className="info__list__ul">
                  <li className="info__list__li">
                    <input
                      className="info__list__li__input"
                      type="email"
                      name="email"
                      placeholder={userInfo.email}
                      readOnly
                    />
                  </li>
                  <li className="info__list__li">
                    <input
                      className="info__list__li__input"
                      type="text"
                      name="username"
                      id="username"
                      placeholder={userInfo.username}
                      readOnly
                    />
                  </li>
                  <li className="info__list__li">
                    <input
                      className="info__list__li__input"
                      type="tel"
                      name="phone_number"
                      id="phone_number"
                      placeholder={userInfo.phone_number}
                      readOnly
                      required
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="secondColumn">
            <div className="carHeading">
              <h3>Darrow's Vehicles</h3>
            </div>
            <div className="car">
              <div>
                <img className="car__image" src={carImage} alt="" />
              </div>
              <div className="car__name">
                <h2>G wagon Brabus 2023</h2>
              </div>
              <div className="car__line">
                <hr />
              </div>
              <div className="car__price">
                <h2>$250/day</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PublicProfile;
