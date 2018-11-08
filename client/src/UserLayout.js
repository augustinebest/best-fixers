import React from 'react';
import Header from "./Components/header";

const UserLayout = (props) => {
    return (
        <div>
            <Header />
            {props.children}
        </div>
    )
}

export default UserLayout;