import React from "react";
import userImg from "../../AuthenticatedPages/DashboardImages/user.jpg";
import "./RentalHistoryRow.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthProvider";
const RentalHistoryRow = ({ rent }) => {
  const generalUrl =
    "https://wwoucxtafkpgzvjrwjye.supabase.co/storage/v1/object/public/avatars/";
  const { user } = useContext(AuthContext);
  const [person, setPerson] = useState();
  let car = rent.cars;
  let para =
    user.user_metadata.account_type == "renter" ? car.owner_id : rent.renter_id;
  useEffect(() => {
    fetch("http://localhost:9000/api/v1/auth/" + para)
      .then((res) => res.json())
      .then((data) => {
        setPerson(data);
      });
  }, []);
  const getStatusClassName = () => {
    // Determine the class name based on the rentalStatus
    if (rent.status === "ongoing") {
      return "row_data row__data--ongoing";
    } else if (rent.status === "completed") {
      return "row_data row__data--finished";
    }
  };
  return (
    <>
      <div className="row__history">
        <div className="row_data row_data--username">
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
        <div className="row_data row_data--carname">
          <p>{car.make_and_model + " " + car.year}</p>
        </div>
        <div className={getStatusClassName()}>
          <p>{rent.status}</p>
        </div>
      </div>
    </>
  );
};

export default RentalHistoryRow;
