import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import { NavLink } from 'react-router-dom';

function Header() {
    const  {user} = useContext(AuthContext)

    return (
        <header>
            <NavLink to="/">HOME</NavLink>
            
            {!user ?
            <>
            <NavLink to="login">Login</NavLink>
            <NavLink to="signup">Sign Up</NavLink>
            </>
            : <NavLink to="profile">Profile</NavLink>
            }

        </header>
    );
}

export default Header;
