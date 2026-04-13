import React, { useContext } from 'react'
import React from 'react'
import { Link } from 'react-router'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="glass-card p-12 max-w-2xl">
        <h1 className="text-6xl mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Streamline Your Workforce
        </h1>
        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
          The ultimate platform for managing your team efficiently. Track, edit, and grow your employee database with ease and elegance.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/create-emp" className="btn-primary no-underline">
            Get Started
          </Link>
          <Link to="/list" className="px-6 py-3 rounded-xl border border-frost-border hover:bg-white/5 transition-all no-underline text-white">
            View Analytics
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home