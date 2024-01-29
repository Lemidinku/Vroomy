import userImg from "../../AuthenticatedPages/DashboardImages/user.jpg";
import "./RequestsRow.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthProvider";
const RequestsRow = ({ request }) => {
  const generalUrl =
    "https://wwoucxtafkpgzvjrwjye.supabase.co/storage/v1/object/public/avatars/";
  const { user } = useContext(AuthContext);
  const [person, setPerson] = useState();
  let car = request.cars;
  let para =
    user.user_metadata.account_type == "renter"
      ? car.owner_id
      : request.renter_id;
  useEffect(() => {
    fetch("http://localhost:9000/api/v1/auth/" + para)
      .then((res) => res.json())
      .then((data) => {
        setPerson(data);
      });
  }, []);
  function formatDate(date) {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options);
  }
  const handleRequest = (status) => {
    fetch("http://localhost:9000/api/v1/requests/" + request.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  };
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
            <p className="user-name--name">{person?.full_name || ""}</p>
          </div>
        </div>
        <div className="row_data--carname">
          <p>{car.make_and_model + " " + car.year}</p>
        </div>
        <div className="row_data--bookingdate">
          <div className="row__data--date">
            <p>{formatDate(new Date(request.start_date))}</p>
          </div>
          <i className="fa-solid fa-arrow-right"></i>
          <div className="row__data--date">
            <p>{formatDate(new Date(request.return_date))}</p>
          </div>
        </div>
        <div className="row__data--status">
          <div className="row__data--status_accept">
            <p onClick={(e) => handleRequest("accepted")}>Accept</p>
          </div>
          <div className="row__data--status_decline">
            <p onClick={(e) => handleRequest("declined")}>Decline</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestsRow;
