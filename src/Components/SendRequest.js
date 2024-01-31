import { useEffect, useState, useContext } from "react";
import "react-material-symbols/rounded";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router";

const SendRequest = ({ carId, daily_price }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [requestdates, setRequestDates] = useState({
    startDate: "",
    endDate: "",
  });
  const [isAvailable, setIsAvailable] = useState(false);
  console.log(carId);
  useEffect(() => {
    const checkAvailability = async () => {
      setIsAvailable(false);
      const res = await fetch(
        `http://localhost:9000/api/v1/bookings/availability/${carId}?start=${requestdates.startDate}&end=${requestdates.endDate}`,
        (Headers = { "Content-Type": "application/json", method: "GET" })
      );
      const data = await res.json();
      if (!data.error) {
        console.log(data);
        setIsAvailable(data.availability);
      }
    };
    if (requestdates.startDate && requestdates.endDate) checkAvailability();
  }, [requestdates]);

  let price = 0;
  // calculate price
  if (requestdates.startDate && requestdates.endDate) {
    const start = new Date(requestdates.startDate);
    const end = new Date(requestdates.endDate);
    const timeDifference = end - start;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    price = daysDifference * daily_price;
  }

  const sendRequest = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.user_metadata.account_type !== "renter") {
      alert("You need to be a renter to send a request");
      return;
    }

    const res = await fetch("http://localhost:9000/api/v1/requests/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user_id: user.id,
      },
      body: JSON.stringify({
        car_id: carId,
        start_date: requestdates.startDate,
        end_date: requestdates.endDate,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  console.log("isAvailable", isAvailable);
  return (
    <div className="request-container">
      <div className="deal__booking grid rounded">
        <h2 className="h-3">Request this car</h2>
        {price ? (
          <p className="price">
            <span className="price__amount">${price}</span>
          </p>
        ) : (
          <p>Select dates</p>
        )}
        <div className="flex section-container ">
          <div className="btn request-date-input">
            <label className="p-2" htmlFor="start">
              Start
            </label>
            <input
              type="date"
              name="start"
              id="start"
              value={requestdates.startDate}
              max={requestdates.endDate || ""}
              onChange={(e) =>
                setRequestDates({ ...requestdates, startDate: e.target.value })
              }
            />
          </div>
          <div className="btn request-date-input">
            <label className="p-2" htmlFor="end">
              End
            </label>
            <input
              type="date"
              name="end"
              id="end"
              value={requestdates.endDate}
              min={requestdates.startDate || ""}
              onChange={(e) =>
                setRequestDates({ ...requestdates, endDate: e.target.value })
              }
            />
          </div>
        </div>
        <button
          className={`btn btn--primary ${isAvailable ? "" : " btn--disabled"}`}
          disabled={!isAvailable}
          onClick={sendRequest}
        >
          Request
        </button>
      </div>
    </div>
  );
};

export default SendRequest;
