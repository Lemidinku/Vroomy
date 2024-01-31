import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import profile from "../../AuthenticatedPages/DashboardImages/portrait.jpg";
import "./Navbar.css";
import { useState } from "react";

const Navbar = ({ pageTitle, isAuthenticated }) => {
  const [Visible, setVisible] = useState(false);
  const handleHamburgerClick = () => {
    setVisible(true);
  };
  const handleCloseBtnClick = () => {
    setVisible(false);
  };
  return (
    <>
      <nav className="rental__nav">
        <div className="logo">
          <p className="logo__text">
            VR<span className="logo__text--blue">OO</span>MY
          </p>
        </div>
        <div className="page__title">
          <p>{pageTitle}</p>
        </div>
        <div className="browse-profile">
          <div className="browse--nav">
            <Icon icon="ph:globe" width="30" height="30" className="globe" />
            <p className="browse__text">Browse</p>
          </div>
          <div
            className="hamburger__menu"
            id="hamburgerMenu"
            onClick={handleHamburgerClick}
          >
            <Icon icon="solar:hamburger-menu-broken" width="30" height="30" />
          </div>

          {isAuthenticated ? (
            <>
            <NavLink to="/">
              <div className="navbar-dashboard">
                <p>Dashboard</p>
              </div>
            </NavLink>

            <NavLink to = "/">
              <div className="navbar--notification">
              <Icon icon="iconamoon:notification" width="30" height="30"/>
              </div>
            </NavLink>

            <NavLink to = "/">
              <div className="profile">
                <img src={profile} alt="Profile Picture" className="profile__img" />
              </div>
            </NavLink>
            </>
            

          ) : (
            <NavLink to = "/">
              <div className="signup-button--navbar">
                <p>Create Account</p>
              </div>
            </NavLink>
          )}



          {/* <div className="profile">
            <img src={profile} alt="Profile Picture" className="profile__img" />
          </div> */}
        </div>

        {/*Mobile Menu */}
        <div
          className="mobile-menu"
          id="mobileMenu"
          style={{ display: Visible ? "flex" : "none" }}
        >
          <div className="close-btn" id="closeBtn">
            <Icon
              icon="ph:x"
              width="30"
              height="30"
              onClick={handleCloseBtnClick}
            />
          </div>
          <div className="dashboard-mobile">
            <ul className="dashboard__ul-mobile">
              <li className="dashboard__li-mobile">
                <NavLink to="/">
                  <Icon
                    icon="clarity:car-line"
                    width="25"
                    height="25"
                    className="dashboard__li__icons"
                  />
                  <p className="dashboard__text">My Cars</p>
                </NavLink>
              </li>
              <li className="dashboard__li-mobile">
                <NavLink to="/rentalhistory">
                  <Icon
                    icon="material-symbols-light:history"
                    width="25"
                    height="25"
                    className="dashboard__li__icons"
                  />
                  <p className="dashboard__text">Rental History</p>
                </NavLink>
              </li>
              <li className="dashboard__li-mobile">
                <NavLink to="/requests">
                  <Icon
                    icon="mdi:account-multiple-plus"
                    width="25"
                    height="25"
                    className="dashboard__li__icons"
                  />
                  <p className="dashboard__text">Booking Requests</p>
                </NavLink>
              </li>
              <li className="dashboard__li-mobile">
                <NavLink to="/bookings">
                  <Icon
                    icon="material-symbols:book-outline"
                    width="25"
                    height="25"
                    className="dashboard__li__icons"
                  />
                  <p className="dashboard__text">Bookings</p>
                </NavLink>
              </li>
              <li className="dashboard__li-mobile">
                <NavLink to="/notifications">
                  <Icon
                    icon="ion:notifications-outline"
                    width="25"
                    height="25"
                    className="dashboard__li__icons"
                  />
                  <p className="dashboard__text">Notifications</p>
                </NavLink>
              </li>
              <li className="dashboard__li-mobile">
                <NavLink to="/">
                  <Icon
                    icon="clarity:car-line"
                    width="25"
                    height="25"
                    className="dashboard__li__icons"
                  />
                  <p className="dashboard__text">Add Car</p>
                </NavLink>
              </li>
            </ul>
            <li className="dashboard__li-mobile__log">
              <NavLink to="/logout">
                <Icon
                  icon="material-symbols:logout"
                  width="25"
                  height="25"
                  className="dashboard__li__icons"
                />
                <p className="dashboard__text">Logout</p>
              </NavLink>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
