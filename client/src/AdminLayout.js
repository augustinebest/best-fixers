import React from 'react';
import AdminHeader from "./Admin/AdminHeader";
import Sidebar from './Admin/AdminSidebar';


const AdminLayout = (props) => {
    return (
        <div>
            <AdminHeader />
            <Sidebar />
            {props.children}
        </div>
    )
}

export default AdminLayout;