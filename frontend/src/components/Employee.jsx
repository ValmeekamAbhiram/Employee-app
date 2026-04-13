import React from 'react'
import { useLocation, useNavigate } from 'react-router'

function Employee() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    return (
      <div className="flex justify-center py-20">
        <div className="glass-card p-10 text-center">
          <p className="text-xl text-slate-400">No employee data found.</p>
          <button onClick={() => navigate("/list")} className="btn-primary mt-6">Back to List</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center py-10">
      <div className="glass-card p-12 w-full max-w-2xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="flex items-center gap-8 mb-10 pb-10 border-b border-frost-border">
          <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-blue-600 rounded-3xl flex items-center justify-center text-4xl font-bold text-white shadow-xl shadow-sky-500/20">
            {state.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{state.name}</h1>
            <p className="text-sky-400 font-medium tracking-wide uppercase text-sm">Employee Profile</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Email Address</p>
            <p className="text-lg text-slate-200">{state.email}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Phone Number</p>
            <p className="text-lg text-slate-200">{state.mobile || 'N/A'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Designation</p>
            <p className="text-lg text-slate-200">{state.designation || 'N/A'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Department / Company</p>
            <p className="text-lg text-slate-200">{state.companyName || 'N/A'}</p>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="px-8 py-3 rounded-xl border border-frost-border hover:bg-white/5 transition-all text-white font-medium"
          >
            Go Back
          </button>
          <button 
            onClick={() => navigate("/edit", { state })}
            className="btn-primary px-8"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default Employee