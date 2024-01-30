import userImg from "../../AuthenticatedPages/DashboardImages/user.jpg";
import "./BookingRow.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthProvider";
const BookingRow = ({ booking }) => {
  const generalUrl =
    "https://wwoucxtafkpgzvjrwjye.supabase.co/storage/v1/object/public/avatars/";
  const { user } = useContext(AuthContext);
  const [person, setPerson] = useState();
  function formatDate(date) {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options);
  }
  const cancelBooking = (status) => {
    fetch("http://localhost:9000/api/v1/bookings/" + booking.id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  };
  let car = booking.cars;
  let para =
    user.user_metadata.account_type == "renter"
      ? car.owner_id
      : booking.renter_id;
  useEffect(() => {
    fetch("http://localhost:9000/api/v1/auth/" + para)
      .then((res) => res.json())
      .then((data) => {
        setPerson(data);
      });
  }, []);
  return (
    <>
      <div className="row">
        <div className="row_data">
          <div className="user-name">
            <img
              src={
                person?.avatar_url ? generalUrl + person.avatar_url : userImg
              }
              alt="User Profile"
              className="profile__img"
            />
            <p className="user-name--name">{person?.full_name}</p>
          </div>
        </div>
        <div className="row_data--carname">
          <p>{car.make_and_model + " " + car.year}</p>
        </div>
        <div className="row_data--bookingdate">
          <div className="row__data--date">
            <p>{formatDate(new Date(booking.start_date))}</p>
          </div>
          <i className="fa-solid fa-arrow-right"></i>
          <div className="row__data--date">
            <p>{formatDate(new Date(booking.return_date))}</p>
          </div>
        </div>
        <div className="row_data--withdrawal">
          <p onClick={cancelBooking}>Cancel</p>
        </div>
      </div>
    </>
  );
};

export default BookingRow;
