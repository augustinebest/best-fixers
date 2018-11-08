import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'
const profile = 'https://pbs.twimg.com/profile_images/1033683143214149632/gtVExQg1_400x400.jpg'

const Sidebar = () => {
    return (
        <div>
            <div className='sideNavigation'>
                <div className='adminProf'>
                    <img src={profile} alt='{}' />
                    <h3> Adegoke Oluwafemi </h3>
                </div>
                <div className='sidebardetails'>
                    <NavLink to='/admin'>
                        <button className='btn btn-default btn-md' style={{ marginLeft: 10 }}> <i className='fa fa-file'></i>&nbsp; All Books </button>
                    </NavLink> <br /><br />
                    <NavLink to='/admin/addbooks'>
                        <button className='btn btn-default btn-md'>  + <i className='fa fa-book'></i> Add Books </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Sidebar);