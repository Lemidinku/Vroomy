import { useEffect, useState, useContext } from "react";
import NotificationCard from "../Components/NotificationCard";
import "./Notifications.css";
import { AuthContext } from "../AuthProvider";
const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if (!user.id) return;
    fetch("http://localhost:9000/api/v1/notifications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        user_id: user.id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
      });
  }, []);

  let noti_list;
  if (notifications.length) {
    noti_list = notifications.map((noti) => {
      return <NotificationCard key={noti.id} notification={noti} />;
    });
  }
  return (
    <>
      <main className="notification_main">
        <h1>Notifications</h1>

        <div className="notification_filters">
          <span className="active">All</span>
          <span>Ratings</span>
          <span>Requests</span>
          <span>Bookings</span>
        </div>

        <div className="notification_container">
          {/* <NotificationCard /> */}
          {noti_list}
        </div>
      </main>
    </>
  );
};

export default Notifications;
