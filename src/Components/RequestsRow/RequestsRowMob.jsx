import userImg from "../../AuthenticatedPages/DashboardImages/user.jpg";
import "./RequestsRow.css";
const BookingRowMob = () => {
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
            <p>Volkswagen ID.4</p>
          </div>
        </div>
        <div className="row_data--date-status">
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
      </div>
    </>
  );
};

export default BookingRowMob;
