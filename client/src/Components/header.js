import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="App-header">
            <h1 className="App-Head"><NavLink to='/'> The Fixers </NavLink></h1>
            <b style={{ float: "right", marginRight: 40, marginTop: -34 }}>
            <NavLink to='/signinartisan'> Log In </NavLink> &nbsp;&nbsp;
            <NavLink to='/checkUserDetail'> Sign Up </NavLink>
            </b>
        </header>
    )
}

export default Header;