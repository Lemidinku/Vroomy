import Dashboard from "../Components/Dashboard/Dashboard";
import RentalHistoryRow from "../Components/HistoryRow/RentalHistoryRow";
import promotionAside from "../AuthenticatedPages/DashboardImages/bwink_tsp_01_single_09.jpg";
import "./RentalHistory.css";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";

const RentalHistory = () => {
  const [rentalsList, setRentalsList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRentals = async () => {
      const res = await fetch(`http://localhost:9000/api/v1/rents/owner`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          user_id: user.id,
        },
      });
      const data = await res.json();
      setRentalsList(data);
    };
    fetchRentals();
  }, []);
  let rents;
  if (rentalsList.length > 0) {
    rents = rentalsList.map((rent) => {
      return <RentalHistoryRow key={rent.rent_id} rent={rent} />;
    });
  } else {
    rents = <p style={{ textAlign: "center" }}>No Rents</p>;
  }
  console.log(rentalsList);
  return (
    <div className="container">
      <main>
        <Dashboard />
        <div className="main__content">
          <div className="promotion-status">
            <div className="promotion__card">
              <div className="promotion__desc">
                <div className="promotion__desc__title">
                  <p>Get Where You Need To Go With Our Service</p>
                </div>
                <div className="promotion__desc__text">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </p>
                </div>
                <div className="promotion__btn">
                  <a href="#">Start Exploring</a>
                </div>
              </div>
              <div className="promotion__img">
                <img
                  src={promotionAside}
                  alt="Photo"
                  width="250px"
                  height="250px"
                />
              </div>
            </div>
            <div className="status__card">
              <div className="status__card__title">
                <p>Total Rentals</p>
              </div>
              <div className="status__card__main">
                <div className="status__card__main__desc">
                  <p>Ongoing Rentals</p>
                  <p className="status__card__main__desc__display">70</p>
                </div>
                <div className="progress__bar">
                  <div className="progress__bar--colored ongoing"></div>
                </div>
              </div>
              <div className="status__card__main">
                <div className="status__card__main__desc">
                  <p>Booked Rentals</p>
                  <p className="status__card__main__desc__display--booked">
                    85
                  </p>
                </div>
                <div className="progress__bar">
                  <div className="progress__bar--colored booked"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="rental__history">
            <div className="rental__history__header">
              <div className="rental__history__title">
                <p>History</p>
              </div>
              <div className="rental__history__dropdown">
                <label htmlFor="myDropdown"></label>
                <select
                  id="myDropdown"
                  name="myDropdown"
                  className="dropdown--select"
                >
                  <option value="option1">This Week</option>
                  <option value="option2">This Month</option>
                  <option value="option3">This Year</option>
                </select>
              </div>
            </div>
            <div className="rental__history__table">
              <div className="rental__history__table__container">
                <div className="row__header--grid">
                  <div className="row__header row__header--number">
                    <p>No.</p>
                  </div>
                  <div className="row__header row__header--username">
                    <p>User's Name</p>
                  </div>
                  <div className="row__header">
                    <p>Car Name</p>
                  </div>
                  <div className="row__header">
                    <p>Status</p>
                  </div>
                </div>

                {/* <RentalHistoryRow rentalStatus={"Ongoing"} />

                <RentalHistoryRow rentalStatus={"Finished"} />

                <RentalHistoryRow rentalStatus={"Finished"} />

                <RentalHistoryRow rentalStatus={"Ongoing"} /> */}
                {rents}
              </div>
            </div>
            <div className="pagination">
              <a href="#">&laquo;</a>
              <a href="#" className="active">
                1
              </a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">&raquo;</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RentalHistory;
