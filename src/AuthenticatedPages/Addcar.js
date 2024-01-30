import "./AddCar.css";
import Dashboard from "../../src/Components/Dashboard/Dashboard";
import CarFront from "./DashboardImages/images-front.jpg";
import CarSide from "./DashboardImages/images-side.jpg";
import CarBack from "./DashboardImages/images-back.jpg";
import React, { useContext } from "react";
import { supabase } from "../auth";
import { AuthContext } from "../AuthProvider";
import { v4 as urlGenerator } from "uuid";

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const [imagePath, setImagePath] = React.useState({});
  const [carInfo, setCarInfo] = React.useState({
    make: "",
    model: "",
    year: "",
    type: "",
    color: "",
    seatingCapacity: "",
    dailyRentalFee: "",
    location: "",
    transmissionType: "automatic",
    additionalFeatures: "",

    //photos
    photo1: "",
    photo2: "",
    photo3: "",
  });
  console.log(user);
  const uploadCarImage = async (imagePath, image) => {
    const { error: uploadError } = await supabase.storage
      .from("car_images")
      .upload(imagePath, image);
    if (uploadError) console.log("Error Occured while uploading the file");
  };

  const handleSubmit = async (e) => {
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
      fetch("http://localhost:9000/api/v1/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          user_id: user.id,
        },
        body: JSON.stringify({
          make_and_model: carInfo.make + " " + carInfo.Model,
          owner_id: user.id,
          year: carInfo.year,
          color: carInfo.color,
          seating_capacity: carInfo.seatingCapacity,
          daily_rental_fee: carInfo.dailyRentalFee,
          location: carInfo.location,
          transmission_type: carInfo.transmissionType,
          additional_features: carInfo.additionalFeatures,
          photo_url_1: url_1,
          photo_url_2: url_2,
          photo_url_3: url_3,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            throw new Error(data.error);
            return;
          }
        });
    } catch (error) {
      console.error(error.message);
      console.log("Error Occured while inserting the data");
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
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (readerEvent) {
      setImagePath((prev) => {
        return {
          ...prev,
          [e.target.name]: readerEvent.target.result,
        };
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePath((prev) => {
        return {
          ...prev,
          [e.target.name]: "",
        };
      });
    }
  };

  console.log(carInfo);
  return (
    <>
      <div className="addcar_container">
        <main>
          <Dashboard />
          <form onSubmit={handleSubmit} className="main__content">
            <div className="page__title--mobile">Add New Cars</div>
            <div className="save__cancel">
              <button className="save__btn" type="submit">
                Submit
              </button>
              <button className="cancel__btn" type="reset">
                Cancel
              </button>
            </div>
            <div className="input__section">
              <div className="car__images">
                <div className="car__images__title">
                  <p>Car Images</p>
                </div>
                <div className="car__images__container">
                  <div className="car__images--image__top">
                    <img
                      src={imagePath.photo1 || CarFront}
                      alt="Front Image"
                      className="car__images--top"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImgChange}
                      id="photo1"
                      name="photo1"
                      required
                    />
                  </div>
                  <div className="car__images--image__bottom">
                    <div>
                      <img
                        src={imagePath.photo2 || CarSide}
                        alt="Side Image"
                        className="car__images--bottom"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImgChange}
                        name="photo2"
                      />
                    </div>

                    <div>
                      <img
                        src={imagePath.photo3 || CarBack}
                        alt="Back Image"
                        className="car__images--bottom"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImgChange}
                        name="photo3"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="car__images__btn">
                  <p>Upload Image</p>
                </div> */}
              </div>
              <div className="input__form">
                <div className="make__model">
                  <div className="make">
                    <div className="make__title">
                      <p>Make</p>
                    </div>
                    <div>
                      <label htmlFor="dropdown"></label>
                      <select
                        id="dropdown"
                        name="make"
                        className="dropdown"
                        onChange={handleChange}
                        value={carInfo.make}
                      >
                        <option value="" hidden></option>
                        <option value="Toyota">Toyota</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="Hyundai">Hyundai</option>
                        <option value="BMW">BMW</option>
                        <option value="Tesla">Tesla</option>
                      </select>
                    </div>
                  </div>
                  <div className="model">
                    <div className="make__title">
                      <p>Model</p>
                    </div>
                    <label htmlFor="model"></label>
                    <input
                      type="text"
                      name="model"
                      className="text-input"
                      value={carInfo.model}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="year__color">
                  <div>
                    <div>
                      <p>Year</p>
                    </div>
                    <label htmlFor="year"></label>
                    <input
                      type="text"
                      name="year"
                      className="text-input"
                      min={new Date().getFullYear() - 30}
                      max={new Date().getFullYear()}
                      pattern="[0-9]{4}"
                      value={carInfo.year}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <div>
                      <p>Color</p>
                    </div>
                    <div>
                      <label htmlFor="dropdown"></label>
                      <select
                        id="dropdown"
                        className="dropdown"
                        name="color"
                        value={carInfo.color}
                        onChange={handleChange}
                      >
                        <option value="" hidden></option>
                        <option value="White">White</option>
                        <option value="Black">Black</option>
                        <option value="Blue">Blue</option>
                        <option value="Silver">Silver</option>
                        <option value="Red">Red</option>
                        <option value="Green">Green</option>
                        <option value="BMW">Gold</option>
                        <option value="Orange">Orange</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="seating_capacity_type">
                  <div className="seating__capacity">
                    <div className="seating">
                      <p>Seating Capacity</p>
                    </div>
                    <input
                      type="number"
                      id="seatingCapacity"
                      name="seatingCapacity"
                      min="2"
                      value={carInfo.seatingCapacity}
                      onChange={handleChange}
                      required
                      className="text-input"
                    />
                  </div>
                  <div className="seating__capacity">
                    <div className="seating">
                      <p>Type</p>
                    </div>
                    <input
                      type="text"
                      name="type"
                      id="type"
                      minLength="3"
                      value={carInfo.type}
                      onChange={handleChange}
                      required
                      placeholder="Vitz"
                      className="text-input"
                    />
                  </div>
                </div>
                <div className="seating__capacity">
                  <div className="seating">
                    <p>Location</p>
                  </div>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    minLength="3"
                    value={carInfo.location}
                    onChange={handleChange}
                    required
                    className="text-input"
                  />
                </div>

                <div className="transmission">
                  <div>
                    <p>Transmission</p>
                  </div>
                  <label>
                    <input
                      type="radio"
                      name="transmissionType"
                      value="automatic"
                      checked={carInfo.transmissionType == "automatic"}
                      onChange={handleChange}
                      required
                    />
                    Automatic
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="transmissionType"
                      value="manual"
                      checked={carInfo.transmissionType == "manual"}
                      onChange={handleChange}
                      required
                    />
                    Manual
                  </label>
                </div>
                <div className="rental__fee">
                  <div>
                    <p>Daily Rental Fee</p>
                  </div>
                  <input
                    placeholder="Br."
                    className="text-input"
                    type="number"
                    id="dailyRentalFee"
                    name="dailyRentalFee"
                    min="1"
                    value={carInfo.dailyRentalFee}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="additional__feature">
                  <div>
                    <p>Additional Features</p>
                  </div>
                  <div className="checkboxes">
                    <div className="checkbox--group">
                      <label htmlFor="checkbox1">
                        <input type="checkbox" id="checkbox1" name="option1" />
                        Option 1
                      </label>
                      <label htmlFor="checkbox2">
                        <input type="checkbox" id="checkbox2" name="option2" />
                        Option 2
                      </label>
                      <label htmlFor="checkbox3">
                        <input type="checkbox" id="checkbox3" name="option3" />
                        Option 3
                      </label>
                    </div>
                    <div className="checkbox--group">
                      <label htmlFor="checkbox1">
                        <input type="checkbox" id="checkbox1" name="option1" />
                        Option 1
                      </label>
                      <label htmlFor="checkbox2">
                        <input type="checkbox" id="checkbox2" name="option2" />
                        Option 2
                      </label>
                      <label htmlFor="checkbox3">
                        <input type="checkbox" id="checkbox3" name="option3" />
                        Option 3
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default AddCar;
