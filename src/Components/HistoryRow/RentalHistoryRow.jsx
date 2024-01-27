import React from "react";
import userImg from "../../AuthenticatedPages/DashboardImages/user.jpg";
import "./RentalHistoryRow.css";
const RentalHistoryRow = ({ rentalStatus }) => {
  const getStatusClassName = () => {
    // Determine the class name based on the rentalStatus
    if (rentalStatus === "Ongoing") {
      return "row_data row__data--ongoing";
    } else if (rentalStatus === "Finished") {
      return "row_data row__data--finished";
    }
  };
  return (
    <>
      <div className="row__history">
        <div className="row_data row_data--number">1</div>
        <div className="row_data row_data--username">
          <div className="user-name">
            <img src={userImg} alt="User Profile" className="profile__img" />
            <p className="user-name--name">Charolette Andrews</p>
          </div>
        </div>
        <div className="row_data row_data--carname">
          <p>Volkswagen ID.4</p>
        </div>
        <div className={getStatusClassName()}>
          <p>{rentalStatus}</p>
        </div>
      </div>
    </>
  );
};

export default RentalHistoryRow;
