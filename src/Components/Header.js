import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import { NavLink } from 'react-router-dom';

function Header() {
    const  {user} = useContext(AuthContext)
    let account_type = user?.user_metadata.account_type
    return (
        <header>
            <NavLink to="/">HOME</NavLink>
            <NavLink to="cars">Cars</NavLink>
            {user && <>
            <NavLink to="mydashboard">My Dashboard</NavLink>
            <NavLink to="notifications">Notifications</NavLink>
            <NavLink to="myprofile">Profile</NavLink>
            </>}
            {!user && <>
            <NavLink to="about">About</NavLink>
            <NavLink to="login">Login</NavLink>
            <NavLink to="signup">Sign Up</NavLink>
            </>}

        </header>
    );
}

export default Header;
