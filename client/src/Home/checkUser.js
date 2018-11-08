import React from 'react';
import { NavLink } from 'react-router-dom'

const CheckUser = () => {
    return (
        <p> Would you like to register to
            <NavLink to='/SignUpUser'> make a request </NavLink> or a
            <NavLink to='/SignUpArtisan'> Skilled Artisan </NavLink>
        </p>
    )
}

export default CheckUser;