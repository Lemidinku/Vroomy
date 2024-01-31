import React, { createContext } from "react";
import "./index.css";

import Login from "./PublicPages/login";
import Signup from "./PublicPages/signup";
import Layout from "./Components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import MyProfile from "./AuthenticatedPages/MyProfile";
import Notifications from "./AuthenticatedPages/Notifications.js";
import Home from "./PublicPages/Home";
import About from "./PublicPages/About";

import CarDetail from "./AuthenticatedPages/CarDetail";
import MyCars from "./AuthenticatedPages/MyCars";
import MyCarDetail from "./AuthenticatedPages/MyCarDetail.js";
import RentalHistory from "./AuthenticatedPages/RentalHistory";
import Bookings from "./AuthenticatedPages/Bookings.js";

import MyDashboardLayout from "./MyDashboardLayout.js";
import Requests from "./AuthenticatedPages/Requests.js";
import Cars from "./PublicPages/Cars.js";
import AddCar from "./AuthenticatedPages/Addcar.js";
import PublicProfile from "./PublicPages/PublicProfile.js";

function ContentWrapper() {
  const { user } = useContext(AuthContext);
  let account_type = user?.user_metadata.account_type;
  console.log(account_type);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cars" element={<Cars />} />

          {!user && (
            <>
              <Route path="Signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </>
          )}

          {user && (
            <>
              <Route path="myprofile" element={<MyProfile />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="cars/:carId" element={<CarDetail />} />
              <Route path="profile/:username" element={<PublicProfile />} />
            </>
          )}
          {account_type == "owner" && (
            <>
              <Route path="mydashboard" element={<MyDashboardLayout />}>
                <Route index element={<MyCars />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="requests" element={<Requests />} />
                <Route path="rentalhistory" element={<RentalHistory />} />
                <Route path="addcar" element={<AddCar />} />

                <Route path=":carId" element={<MyCarDetail />} />
              </Route>
            </>
          )}
          {account_type == "renter" && (
            // these pages will be different for renters, but used as a placeholders for now.
            <>
              <Route path="mydashboard" element={<MyDashboardLayout />}>
                <Route index element={<Requests />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="rentalhistory" element={<RentalHistory />} />
              </Route>
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default ContentWrapper;
