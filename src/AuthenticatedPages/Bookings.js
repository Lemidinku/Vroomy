import "./Booking.css";
import Navbar from "../../src/Components/NavBar/Navbar";
import Dashboard from "../../src/Components/Dashboard/Dashboard";
import BookingRow from "../../src/Components/BookingRow/BookingRow";
import bookingPromotionAside from "../AuthenticatedPages/DashboardImages/Wavy_Bus-08_Single-09.jpg";
import BookingRowMob from "../../src/Components/BookingRow/BookingRowMob";
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider";
const Bookings = () => {
  const [bookingList, setBookingList] = React.useState([]);
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch(`http://localhost:9000/api/v1/bookings/owner`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          user_id: user.id,
        },
      });
      const data = await res.json();
      setBookingList(data);
    };
    fetchBookings();
  }, []);
  console.log(bookingList);
  let bookings;
  if (bookingList.length > 0) {
    bookings = bookingList.map((booking) => {
      return <BookingRow key={booking.id} booking={booking} />;
    });
  } else {
    bookings = <p>No requests</p>;
  }
  return (
    <>
      <div className="container">
        <main>
          <Dashboard />
          <div className="main__content">
            <div className="promotion-status">
              <div className="promotion__card">
                <div className="promotion__desc">
                  <div className="promotion__desc__title">
                    <p>Withdrawal isn't available Two Days Before Rentals</p>
                  </div>
                  <div className="promotion__desc__text">
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Dolorum, explicabo.
                    </p>
                  </div>
                  <div className="promotion__btn">
                    <a href="#">Terms and Policies</a>
                  </div>
                </div>
                <div className="promotion__img">
                  <img
                    src={bookingPromotionAside}
                    alt="Photo"
                    width="250px"
                    height="250px"
                  />
                </div>
              </div>
              <div className="status__card">
                <div className="status__card__title">
                  <p>Books</p>
                </div>
                <div className="status__card__main">
                  <div className="status__card__main__desc">
                    <p>Booking Requests</p>
                    <p className="status__card__main__desc__display">80</p>
                  </div>
                  <div className="progress__bar">
                    <div className="progress__bar--colored requests"></div>
                  </div>
                </div>
                <div className="status__card__main">
                  <div className="status__card__main__desc">
                    <p>Books Accepted</p>
                    <p className="status__card__main__desc__display--booked">
                      120
                    </p>
                  </div>
                  <div className="progress__bar">
                    <div className="progress__bar--colored booked"></div>
                  </div>
                </div>
              </div>
            </div>

            {/*Booking*/}
            <div className="page__title--mobile">
              <p>My VBookings</p>
            </div>
            <div className="booking">
              <div className="booking__header">
                <div className="booking__title">
                  <p>My Bookings</p>
                </div>
                <div className="booking__dropdown">
                  <label htmlFor="myDropdown"></label>
                  <select id="myDropdown" name="myDropdown">
                    <option value="option1">This Week</option>
                    <option value="option2">This Month</option>
                    <option value="option3">This Year</option>
                  </select>
                </div>
              </div>
              <div className="booking__table">
                <div className="booking__table__container">
                  <div className="row__header--flex">
                    <div className="row__header">
                      <p>User's Name</p>
                    </div>
                    <div className="row__header--carname">
                      <p>Car Name</p>
                    </div>
                    <div className="row__header">
                      <p>Booking Date</p>
                    </div>
                    <div className="row__header--status">
                      <p>Status</p>
                    </div>
                  </div>

                  {/*Mobile View*/}

                  <div className="row__mobile--booking">
                    {/* <BookingRowMob />
                    <BookingRowMob />
                    <BookingRowMob />
                    <BookingRowMob /> */}
                    {bookings}
                  </div>

                  {/*Desktop View*/}
                  <div className="row__desktop">
                    {/* <BookingRow />
                    <BookingRow />
                    <BookingRow />
                    <BookingRow /> */}
                    {bookings}
                  </div>
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
    </>
  );
};

export default Bookings;
