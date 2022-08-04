import React from 'react';
import { NavLink } from 'react-router-dom';
import { CgMenuGridR } from 'react-icons/cg';
import { RiLogoutBoxRLine } from 'react-icons/ri'
import '../styles/components/NavBar.scss'

function NavBar(props) {
  const {logout} = props;
  
  return (
    <nav className="navbar">
      <div className="navbar-left-side">
        <CgMenuGridR id="menu-button"/>
        <div className="navbar-links">
          <NavLink to="/calendar" className="link"><p>Calendar</p></NavLink>
          <NavLink to="/team" className="link"><p>Team</p></NavLink>
          <NavLink to="/projects" className="link" activeclassname="active"><p>Projects</p></NavLink>
          <NavLink to="/profile" className="link"><p>Profile</p></NavLink>
        </div>
      </div>
      <div className="navbar-right-side">
        <RiLogoutBoxRLine id="logout-button" onClick={logout}/>
      </div>
    </nav>
  )
}

export default NavBar;