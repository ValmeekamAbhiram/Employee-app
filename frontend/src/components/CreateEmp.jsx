import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

function CreateEmp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //form submit
  const onFormSubmit = async (newEmpObj) => {
    try {
      setLoading(true);
      //make HTTP POST req
      let res = await fetch("http://localhost:4000/employee-api/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmpObj),
      });

      if (res.status === 201) {
        //navigate to employees component programatically
        navigate("/list");
      } else {
        let errorRes = await res.json();
        console.log("error responce is ", errorRes);
        throw new Error(errorRes.reason);
      }
    } catch (err) {
      console.log("err in catch", err);
      //deal with err
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(error);

  if (loading) {
    return <p className="text-center text-4xl">Loading....</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center text-3xl">{error}</p>;
  }
  return (
    <div className="flex justify-center py-10">
      <div className="glass-card p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-2 text-center text-white">Add New Talent</h2>
        <p className="text-slate-400 text-center mb-10">Fill in the details to expand your team.</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onEmployeeSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="john@company.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              placeholder="+1 (555) 000-0000"
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
                placeholder="Software Engineer"
                {...register("designation", { required: "Designation is required" })}
              />
              {errors.designation && <p className="text-red-400 text-xs mt-1">{errors.designation.message}</p>}
            </div>
            <div>
              <label htmlFor="companyName">Company</label>
              <input
                type="text"
                id="companyName"
                placeholder="TechCorp"
                {...register("companyName", { required: "Company name is required" })}
              />
              {errors.companyName && <p className="text-red-400 text-xs mt-1">{errors.companyName.message}</p>}
            </div>
          </div>

          <button type="submit" className="btn-primary w-full mt-4" disabled={loading}>
            {loading ? "Onboarding..." : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEmp;