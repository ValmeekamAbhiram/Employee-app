import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const goToEmployee = (empObj) => navigate("/employee", { state: empObj });
  const goToEditEmployee = (empObj) => navigate("/edit", { state: empObj });

  const deleteByEmpId = async (id) => {
    if (!window.confirm("Remove this employee?")) return;
    try {
      const res = await fetch(`/employee-api/employee/${id}`, { method: "DELETE" });
      if (res.ok) setEmps((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/employee-api/employee");
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setEmps(data.payload || []);
        } else {
          const text = await res.text();
          console.error("Backend error:", text.substring(0, 100));
        }
      } catch (err) {
        console.error("Failed to fetch employees", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Employee List</h1>
          <p className="page-subtitle">Manage and view your entire workforce.</p>
        </div>
        <div className="stat-badge">
          <div className="stat-number">{emps.length}</div>
          <p className="stat-label">Members</p>
        </div>
      </div>

      {loading ? (
        <div className="loading-page">
          <div className="spinner"></div>
        </div>
      ) : emps.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-state-icon">👥</div>
          <p className="empty-state-text">No employees yet.</p>
          <button onClick={() => navigate("/create-emp")} className="btn-primary">Add Employee</button>
        </div>
      ) : (
        <div className="emp-grid">
          {emps.map((empObj) => (
            <div key={empObj._id} className="emp-card glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div className="emp-avatar">{empObj.name.charAt(0)}</div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {empObj.name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {empObj.designation || 'Employee'}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '1rem', flexGrow: 1 }}>{empObj.email}</p>
              <div className="emp-card-actions" style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                <button onClick={() => goToEmployee(empObj)} className="action-btn action-btn-view">View</button>
                <button onClick={() => goToEditEmployee(empObj)} className="action-btn action-btn-edit">Edit</button>
                <button onClick={() => deleteByEmpId(empObj._id)} className="action-btn action-btn-delete">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListOfEmps;