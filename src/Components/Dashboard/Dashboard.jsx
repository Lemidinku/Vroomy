import { NavLink, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Dashboard.css";
import { AuthContext } from "../../AuthProvider";
import React from "react";

const Dashboard = () => {
  const { user } = React.useContext(AuthContext);
  let role = user.user_metadata.account_type;
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
          <li className="dashboard__li__log">
            <NavLink to="logout">
              <Icon
                icon="material-symbols:logout"
                width="40"
                height="40"
                className="dashboard__li__icons"
              />
              <p className="dashboard__text">Logout</p>
            </NavLink>
          </li>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Dashboard;
