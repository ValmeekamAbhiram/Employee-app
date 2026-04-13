import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

function CreateEmp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/employee-api/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await res.json();
        if (res.status === 201) {
          navigate("/list");
        } else {
          throw new Error(result.reason || result.message || "Failed to add employee");
        }
      } else {
        const text = await res.text();
        throw new Error(`Server Error: ${text.substring(0, 100)}...`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-container glass-card" style={{ padding: '2rem' }}>
        <h2 className="form-title">Add Employee</h2>
        <p className="form-subtitle">Fill in the details below.</p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit(onFormSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="John Doe" {...register("name", { required: "Required" })} />
            {errors.name && <p className="field-error">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="john@company.com" {...register("email", { required: "Required" })} />
            {errors.email && <p className="field-error">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="mobile">Mobile</label>
            <input type="text" id="mobile" placeholder="+1 555 000 0000" {...register("mobile", { required: "Required" })} />
            {errors.mobile && <p className="field-error">{errors.mobile.message}</p>}
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="designation">Designation</label>
              <input type="text" id="designation" placeholder="Software Engineer" {...register("designation", { required: "Required" })} />
              {errors.designation && <p className="field-error">{errors.designation.message}</p>}
            </div>
            <div>
              <label htmlFor="companyName">Company</label>
              <input type="text" id="companyName" placeholder="TechCorp" {...register("companyName", { required: "Required" })} />
              {errors.companyName && <p className="field-error">{errors.companyName.message}</p>}
            </div>
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.25rem' }}>
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEmp;