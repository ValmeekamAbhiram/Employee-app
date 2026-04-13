import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div>
        <Header/>
        <main className="container pb-20">
            <Outlet/>
        </main>
    </div>
  )
}

export default RootLayout