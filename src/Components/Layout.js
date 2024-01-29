import React from "react";

import Header from "./Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
