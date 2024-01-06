import React from "react";
import { useNavigate } from "react-router";
import { supabase } from "../auth";
import keyImage from "../images/key.png";
import "../styles/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faPhone, faLock } from "@fortawesome/free-solid-svg-icons";

function Signup() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
    repeatedPassword: "",
    role: "owner",
    fullname: "",
    username: "",
    phone_number: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(await validInputs())) return;
    try {
      const { error } = await supabase.auth.signUp({
        email: userInfo.email,
        password: userInfo.password,
        options: {
          data: {
            account_type: userInfo.role,
            full_name: userInfo.fullname,
            username: userInfo.username,
            phone_number: userInfo.phone_number,
          },
        },
      });
      if (error) {
        console.error("Error signing up:", error.message);
      } else {
        console.log("Signup successful:");
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const handleChange = (e) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const changeRole = (e) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        role: e.target.value,
      };
    });
  };

  const validInputs = async () => {
    let { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", userInfo.username);
    if (data[0]) {
      console.log("Username already exist");
      return false;
    }
    if (error) {
      console.log(error.message);
      return false;
    }

    if (userInfo.password !== userInfo.repeatedPassword) {
      console.log("Passwords does not match");
      return false;
    }

    const validatePhoneNumber = (phoneNum) => {
      if (!(phoneNum.startsWith("09") || phoneNum.startsWith("07")))
        return false;
      if (isNaN(parseInt(phoneNum))) return false;
      if (phoneNum.length !== 10) return false;

      return true;
    };

    if (!validatePhoneNumber(userInfo.phone_number)) {
      console.log("Invalid Phone Number");
      return false;
    }
    return true;
  };
  return (
    <div className="signup__component">
      <div className="signup__main">
        <div className="block-1__greeting">
          <h1 className="block-1__head">Welcome!</h1>
          <p className="block-1__desc">
            Roam with <span className="block-1__desc--span">Vroomy</span>, Your
            Reliable car rental companion
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="signup__inputs">
            <div className="signup__input__box">
              <FontAwesomeIcon icon={faUser} className="signup__input__icon" />
              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Fullname"
                value={userInfo.fullname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="signup__input__box">
              <FontAwesomeIcon icon={faUser} className="signup__input__icon" />
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Choose username"
                value={userInfo.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="signup__input__box">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="signup__input__icon"
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                value={userInfo.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup__input__box">
              <FontAwesomeIcon icon={faPhone} className="signup__input__icon" />
              <input
                type="tel"
                name="phone_number"
                id="phone_number"
                maxLength="10" //Specify max length if we want
                placeholder="Enter Phone Number"
                value={userInfo.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="signup__input__box">
              <FontAwesomeIcon icon={faLock} className="signup__input__icon" />
              <input
                type="password"
                minLength="6"
                name="password"
                id="password"
                placeholder="Set password"
                value={userInfo.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="signup__input__box">
              <FontAwesomeIcon icon={faLock} className="signup__input__icon" />
              <input
                type="password"
                minLength="6"
                name="repeatedPassword"
                id="repeatedPassword"
                placeholder="Confirm password"
                value={userInfo.repeatedPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="signup__type">
            <div>
              <label htmlFor="owner">Owner</label>
              <input
                type="radio"
                name="role"
                id="owner"
                value="owner"
                checked={userInfo.role == "owner"}
                onChange={changeRole}
                required
              ></input>
            </div>
            <div>
              <input
                type="radio"
                name="role"
                id="renter"
                value="renter"
                checked={userInfo.role == "renter"}
                onChange={changeRole}
                required
              ></input>
              <label htmlFor="renter">Renter</label>
            </div>
          </div>
          <button className="signup__button">Signup</button>
        </form>
        <p className="signup__account">
          Already have an account? <a href="#"> login</a>
        </p>
      </div>
      <div className="signup__graphic">
        <img className="signup__img" src={keyImage} />
      </div>
    </div>
  );
}

export default Signup;
