import React from 'react'
import { useLocation, useNavigate } from 'react-router'

function Employee() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    return (
      <div className="loading-page">
        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-dim)', marginBottom: '1.25rem' }}>No employee data found.</p>
          <button onClick={() => navigate("/list")} className="btn-primary">Back to Employee List</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2.5rem 0' }}>
      <div className="glass-card profile-card" style={{ padding: '2rem' }}>
        <div className="profile-header">
          <div className="profile-avatar">
            {state.name.charAt(0)}
          </div>
          <div>
            <h1 className="profile-name">{state.name}</h1>
            <p className="profile-tag">Employee Profile</p>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-field">
            <p className="profile-field-label">Email</p>
            <p className="profile-field-value">{state.email}</p>
          </div>
          <div className="profile-field">
            <p className="profile-field-label">Phone</p>
            <p className="profile-field-value">{state.mobile || 'N/A'}</p>
          </div>
          <div className="profile-field">
            <p className="profile-field-label">Designation</p>
            <p className="profile-field-value">{state.designation || 'N/A'}</p>
          </div>
          <div className="profile-field">
            <p className="profile-field-label">Company</p>
            <p className="profile-field-value">{state.companyName || 'N/A'}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={() => navigate(-1)} className="btn-ghost">← Back</button>
          <button onClick={() => navigate("/edit", { state })} className="btn-primary">Edit Profile</button>
        </div>
      </div>
    </div>
  )
}

export default Employee