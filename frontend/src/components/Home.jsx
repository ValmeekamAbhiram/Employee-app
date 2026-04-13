import React from 'react'
import { Link } from 'react-router'

function Home() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-badge">Employee Management</div>
        <h1 className="hero-title">Streamline Your Workforce</h1>
        <p className="hero-subtitle">
          The modern platform for managing your team. Track, onboard, and grow your employee database with ease.
        </p>
        <div className="hero-actions">
          <Link to="/create-emp" className="btn-primary no-underline">Get Started</Link>
          <Link to="/list" className="btn-ghost no-underline">Employee List →</Link>
        </div>
      </div>
    </div>
  )
}

export default Home