import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router'

function EditEmployee() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: state });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/employee-api/employee/${state._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        navigate("/list");
      } else {
        const err = await res.json();
        throw new Error(err.reason || "Update failed");
      }
    } catch (err) {
      setError("Failed to update. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!state) {
    return (
      <div className="loading-page">
        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>No employee data to edit.</p>
          <button onClick={() => navigate("/list")} className="btn-primary">Back to Employee List</button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-container glass-card" style={{ padding: '2rem' }}>
        <h2 className="form-title">Edit Employee</h2>
        <p className="form-subtitle">Update details for {state.name}.</p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" {...register("name", { required: "Required" })} />
            {errors.name && <p className="field-error">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email", { required: "Required" })} />
            {errors.email && <p className="field-error">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="mobile">Mobile</label>
            <input type="text" id="mobile" {...register("mobile", { required: "Required" })} />
            {errors.mobile && <p className="field-error">{errors.mobile.message}</p>}
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="designation">Designation</label>
              <input type="text" id="designation" {...register("designation", { required: "Required" })} />
              {errors.designation && <p className="field-error">{errors.designation.message}</p>}
            </div>
            <div>
              <label htmlFor="companyName">Company</label>
              <input type="text" id="companyName" {...register("companyName", { required: "Required" })} />
              {errors.companyName && <p className="field-error">{errors.companyName.message}</p>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
            <button type="button" onClick={() => navigate(-1)} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ flex: 2 }} disabled={loading}>
              {loading ? "Saving…" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee