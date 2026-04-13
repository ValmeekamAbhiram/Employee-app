import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main className="container" style={{ flex: 1, paddingBottom: '4rem' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout