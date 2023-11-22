import React from "react";
import { Outlet } from "react-router";


const MyDashboardLayout = () => {
    return (
        <>
        <h1>MyDashboardLayout</h1>
        <Outlet/>
        </>
    )
}

export default MyDashboardLayout;