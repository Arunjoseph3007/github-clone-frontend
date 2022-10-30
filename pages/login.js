import { useUser } from "@/context/userContext";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const { setUser } = useUser();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  // @ Change handler
  const handleChange = (e) =>
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // @ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API}/accounts/login/`,{
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body:JSON.stringify(userDetails)
      // })
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/accounts/login/`,
        userDetails,
      );
      setUser(res.data);
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('id',res.data.user_id)
      window.location.href='/'+res.data.username
      
    } catch (error) {
      let msg = "Wrong Credentials"
      alert(msg)
      setUserDetails({
        email:"",
        password:""
      }
        
      )
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <div className="avatar">
          <div div className="w-24">
            <img src="/logo4.png" alt="Git" className="object-contain" />
          </div>
        </div>
        <div className="text-center ">
          <h1 className="text-xl font-bold">Sign-in to GitBase</h1>
        </div>

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            {/* //@ Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                value={userDetails.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* //@ */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-3">
              <button className="btn btn-primary">Login</button>
            </div>
            <div className="divider">OR</div>
            <div className="mt-1">
              New to GitBase?{" "}
              <Link href="/signup">
                <a className="link link-hover" style={{ color: "blue" }}>
                  Create an account
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
