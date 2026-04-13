import React from 'react'
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router'
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios'

function EditEmployee() {
  const {
      register,
      handleSubmit,
      formState: { errors },
      setValue
    } = useForm();

  const navigate=useNavigate()

  //get empObj from navigate hook
  const { state } = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: state
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onEmployeeEditSubmit = async (empObj) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.put(`/employee-api/employee/${state._id}`, empObj);
      if (res.status === 200) {
        navigate("/list");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
        <form onSubmit={handleSubmit(onEmployeeEditSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              {...register("mobile", { required: "Mobile number is required" })}
            />
            {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="designation">Designation</label>
              <input
                type="text"
                id="designation"
                {...register("designation", { required: "Designation is required" })}
              />
              {errors.designation && <p className="text-red-400 text-xs mt-1">{errors.designation.message}</p>}
            </div>
            <div>
              <label htmlFor="companyName">Company</label>
              <input
                type="text"
                id="companyName"
                {...register("companyName", { required: "Company name is required" })}
              />
              {errors.companyName && <p className="text-red-400 text-xs mt-1">{errors.companyName.message}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl border border-frost-border hover:bg-white/5 transition-all text-white flex-1"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-[2]" disabled={loading}>
              {loading ? "Saving Changes..." : "Update Record"}
            </button>
          </div>
        </form>
  )
}

export default EditEmployee