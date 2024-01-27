import "./AddCar.css";
import Navbar from "../../src/Components/NavBar/Navbar";
import Dashboard from "../../src/Components/Dashboard/Dashboard";
import Footer from "../../src/Components/Footer/Footer";
import CarFront from "./DashboardImages/images-front.jpg";
import CarSide from "./DashboardImages/images-side.jpg";
import CarBack from "./DashboardImages/images-back.jpg";

const AddCar = () => {
  return (
    <>
      <div className="container">
        <Navbar pageTitle={"Add Car"} />
        <main>
          <Dashboard />
          <div className="main__content">
            <div className="page__title--mobile">Add New Cars</div>
            <div className="save__cancel">
              <div className="save__btn">
                <p>Save</p>
              </div>
              <div className="cancel__btn">
                <p>Cancel</p>
              </div>
            </div>
            <div className="input__section">
              <div className="car__images">
                <div className="car__images__title">
                  <p>Car Images</p>
                </div>
                <div className="car__images__container">
                  <div className="car__images--image__top">
                    <img
                      src={CarFront}
                      alt="Front Image"
                      className="car__images--top"
                    />
                  </div>
                  <div className="car__images--image__bottom">
                    <img
                      src={CarSide}
                      alt="Side Image"
                      className="car__images--bottom"
                    />
                    <img
                      src={CarBack}
                      alt="Back Image"
                      className="car__images--bottom"
                    />
                  </div>
                </div>
                <div className="car__images__btn">
                  <p>Upload Image</p>
                </div>
              </div>
              <div className="input__form">
                <div className="make__model">
                  <div className="make">
                    <div className="make__title">
                      <p>Make</p>
                    </div>
                    <div>
                      <label htmlFor="dropdown"></label>
                      <select id="dropdown" name="car__model">
                        <option value="" hidden></option>
                        <option value="Toyota">Toyota</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="Hyundai">Hyundai</option>
                        <option value="BMW">BMW</option>
                      </select>
                    </div>
                  </div>
                  <div className="model">
                    <div className="make__title">
                      <p>Model</p>
                    </div>
                    <label htmlFor="model"></label>
                    <input type="text" name="model" className="text-input" />
                  </div>
                </div>
                <div className="year__color">
                  <div>
                    <div>
                      <p>Year</p>
                    </div>
                    <label htmlFor="year"></label>
                    <input type="text" name="year" className="text-input" />
                  </div>
                  <div>
                    <div>
                      <p>Color</p>
                    </div>
                    <div>
                      <label htmlFor="dropdown"></label>
                      <select id="dropdown" name="car__model">
                        <option value="" hidden></option>
                        <option value="Toyota">Toyota</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="Hyundai">Hyundai</option>
                        <option value="BMW">BMW</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="seating__capacity">
                  <div className="seating">
                    <p>Seating Capacity</p>
                  </div>
                  <input
                    type="text"
                    name="seating__capacity"
                    className="text-input"
                  />
                </div>
                <div className="transmission">
                  <div>
                    <p>Transmission</p>
                  </div>
                  <label>
                    <input type="radio" name="transmission" value="Manual" />
                    Manual
                  </label>

                  <label>
                    <input type="radio" name="transmission" value="Automatic" />
                    Automatic
                  </label>
                </div>
                <div className="rental__fee">
                  <div>
                    <p>Daily Rental Fee</p>
                  </div>
                  <input
                    type="text"
                    name="rental__fee"
                    placeholder="Br."
                    className="text-input"
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
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AddCar;
