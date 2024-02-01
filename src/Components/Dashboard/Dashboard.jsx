import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import "./Dashboard.css";
import { AuthContext } from "../../AuthProvider";
import React from "react";
import { supabase } from "../../auth";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);
  let role = user.user_metadata.account_type;
  const supabaseLogout = async (e) => {
    try {
      const { user, error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error.message);
      } else {
        console.log("Logged out successful:");
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out", error.message);
    }
  };
  const deleteAccount = async () => {
    let temp_id = user.id;
    await supabaseLogout();
    const { data, error } = await supabase.auth.admin.deleteUser(temp_id);
    if (error) {
      console.error("Error deleting user:", error);
      return;
    }
    navigate("/");
    console.log("User deleted:", data);
  };
  return (
    <>
      <nav id="dashboard__side">
        <div className="dashboard">
          <div className="dashboard__title">
            <p>Dashboard</p>
          </div>
          <ul className="dashboard__ul">
            {role === "owner" && (
              <li className="dashboard__li">
                <NavLink to="/mydashboard" end>
                  <Icon
                    icon="material-symbols-light:history"
                    width="40"
                    height="40"
                    className="dashboard__li__icons"
                  />
                  <p className="dashboard__text">My Cars</p>
                </NavLink>
              </li>
            )}
            <li className="dashboard__li">
              <NavLink
                to={
                  role === "owner" ? "/mydashboard/requests" : "/mydashboard/"
                }
                end
              >
                <Icon
                  icon="mdi:account-multiple-plus"
                  width="40"
                  height="40"
                  className="dashboard__li__icons"
                />
                <p className="dashboard__text">Requests</p>
              </NavLink>
            </li>
            <li className="dashboard__li">
              <NavLink to="/mydashboard/bookings">
                <Icon
                  icon="material-symbols:book-outline"
                  width="40"
                  height="40"
                  className="dashboard__li__icons"
                />
                <p className="dashboard__text">Bookings</p>
              </NavLink>
            </li>
            <li className="dashboard__li">
              <NavLink to="/mydashboard/rentalhistory">
                <Icon
                  icon="material-symbols:book-outline"
                  width="40"
                  height="40"
                  className="dashboard__li__icons"
                />
                <p className="dashboard__text">Rental History</p>
              </NavLink>
            </li>
            {/* <li className="dashboard__li">
              <NavLink to="notifications">
                <Icon
                  icon="ion:notifications-outline"
                  width="40"
                  height="40"
                  className="dashboard__li__icons"
                />
                <p className="dashboard__text">Notifications</p>
              </NavLink>
            </li> */}
            {role === "owner" && (
              <li className="dashboard__li">
                <NavLink to="/mydashboard/addcar">
                  <Icon
                    icon="clarity:car-line"
                    width="40"
                    height="40"
                    className="dashboard__li__icons"
                  />
                  <p className="dashboard__text">Add Car</p>
                </NavLink>
              </li>
            )}
          </ul>
          <li className="dashboard__li__log" onClick={supabaseLogout}>
            <NavLink to="">
              <Icon
                icon="material-symbols:logout"
                width="40"
                height="40"
                className="dashboard__li__icons"
              />
              <p className="dashboard__text">Logout</p>
            </NavLink>
          </li>
          <li className="dashboard__li__log" onClick={deleteAccount}>
            <NavLink to="">
              <Icon
                icon="material-symbols:delete"
                width="40"
                height="40"
                className="dashboard__li__icons"
              />
              <p className="dashboard__text">Delete Account</p>
            </NavLink>
          </li>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Dashboard;
