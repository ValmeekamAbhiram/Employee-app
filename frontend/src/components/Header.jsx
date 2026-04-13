import React from 'react'
import { Link, NavLink } from 'react-router'

function Header() {
  return (
    <nav className="header-nav glass">
      <div className="container nav-inner">
        <Link to="/" className="nav-brand">
          ⬡ EmpManager
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/create-emp" className={({isActive}) => isActive ? 'active' : ''}>Add Employee</NavLink>
          </li>
          <li>
            <NavLink to="/list" className={({isActive}) => isActive ? 'active' : ''}>Employee List</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;