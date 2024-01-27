import userImg from "../../AuthenticatedPages/DashboardImages/user.jpg";
import "./BookingRow.css";
const BookingRow = () => {
  return (
    <>
      <div className="row">
        <div className="row_data">
          <div className="user-name">
            <img src={userImg} alt="User Profile" className="profile__img" />
            <p className="user-name--name">Charolette Andrews</p>
          </div>
        </div>
        <div className="row_data--carname">
          <p>Volkswagen ID.4</p>
        </div>
        <div className="row_data--bookingdate">
          <div className="row__data--date">
            <p>Dec 3,2023</p>
          </div>
          <i className="fa-solid fa-arrow-right"></i>
          <div className="row__data--date">
            <p>Dec 7,2023</p>
          </div>
        </div>
        <div className="row_data--withdrawal">
          <p>Withdrawal</p>
        </div>
      </div>
    </>
  );
};

export default BookingRow;
