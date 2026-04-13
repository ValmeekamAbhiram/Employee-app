import React from 'react'
import { Link, NavLink } from 'react-router'

function Header() {
  return (
    <nav className="header-nav glass">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
          EmpManager
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
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