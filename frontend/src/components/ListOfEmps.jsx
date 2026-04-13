import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from 'axios'

function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  
  const goToEmployee = (empObj) => {
    navigate("/employee", { state: empObj });
  }
  
  const goToEditEmployee = (empObj) => {
    navigate("/edit", { state: empObj })
  }
  
  const deleteByEmpId = async (id) => {
    if(!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      const res = await axios.delete(`/employee-api/employee/${id}`);
      if (res.status === 200) {
        setEmps((prev) => prev.filter((emp) => emp._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getEmps() {
    try {
      setLoading(true);
      let res = await fetch("/employee-api/employee");
      if (res.status === 200) {
        let resObj = await res.json();
        setEmps(resObj.payload);
      }
    } catch (err) {
      console.error("Failed to fetch employees", err);
    } finally {
      setLoading(false);
    }
  }
    
  useEffect(() => {
    getEmps();
  }, [])

  return (
    <div className="py-10">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-5xl mb-2">Team Directory</h1>
          <p className="text-slate-400">Manage and view your entire workforce in one place.</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-sky-400">{emps.length}</span>
          <p className="text-xs uppercase tracking-widest text-slate-500">Total Members</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-sky-400"></div>
        </div>
      ) : emps.length === 0 ? (
        <div className="glass-card p-20 text-center">
          <p className="text-xl text-slate-400">No employees found. Start by adding one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {emps.map((empObj) => (
            <div key={empObj._id} className="glass-card p-6 flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl mb-6 flex items-center justify-center text-2xl font-bold">
                {empObj.name.charAt(0)}
              </div>
              <h3 className="text-xl mb-1">{empObj.name}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-grow">{empObj.email}</p>
              
              <div className="flex gap-2 pt-4 border-t border-frost-border">
                <button 
                  onClick={() => goToEmployee(empObj)} 
                  className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-sm font-medium"
                >
                  Details
                </button>
                <button 
                  onClick={() => goToEditEmployee(empObj)} 
                  className="px-3 py-2 rounded-lg bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 transition-all text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteByEmpId(empObj._id)}
                  className="px-3 py-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-all text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListOfEmps;