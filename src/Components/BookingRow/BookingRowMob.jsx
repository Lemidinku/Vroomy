import userImg from "../../AuthenticatedPages/DashboardImages/user.jpg";
import "./BookingRow.css";
const BookingRowMob = ({ booking }) => {
  console.log(booking);
  function formatDate(date) {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options);
  }
  let car = booking.cars;
  return (
    <>
      <div className="row--mobile">
        <div className="row_data--user-car">
          <div className="row_data">
            <div className="user-name">
              <img src={userImg} alt="User Profile" className="profile__img" />
              <p className="user-name--name--mobile">Charolette Andrews</p>
            </div>
          </div>
          <div className="row_data--carname--booking">
            <p>{car.make_and_model + " " + car.year}</p>
          </div>
        </div>
        <div className="row_data--date-status">
          <div className="row_data--bookingdate">
            <div className="row__data--date">
              <p>{booking.start_date}</p>
            </div>
            <i className="fa-solid fa-arrow-right"></i>
            <div className="row__data--date">
              <p>{booking.return_date}</p>
            </div>
          </div>
          <div className="row_data--withdrawal">
            <p>Withdrawal</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingRowMob;
