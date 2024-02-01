import React from "react";

import Footer from "./Footer/Footer";
import { Outlet } from "react-router";
import Navbar from "./NavBar/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
