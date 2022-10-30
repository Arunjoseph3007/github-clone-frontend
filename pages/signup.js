import { useUser } from "@/context/userContext";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const { setUser } = useUser();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //$ Change handler
  const handleChange = (e) =>
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  //$ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userDetails.password !== userDetails.confirmPassword) return;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/accounts/register/`,
        {
          first_name: userDetails.firstName,
          last_name: userDetails.lastName,
          email: userDetails.email,
          username: userDetails.userName,
          password: userDetails.password,
        }
      );
      if(res.data.username==userDetails.userName){
        console.log(res.data);
        setUser(res.data);
        let msg = "Verification Mail Sent to your mail id."
        alert(msg)
        window.location.href='/login'
      }
      else if(res.data.email){
        let msg = "Email Already Registerd try to Login"
        alert(msg)
      }
      else{
        let msg = res.data.username
        alert(msg)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content gap-[1rem] md:gap-[8rem] flex-col lg:flex-row">
        <img src="logo3.png" className="max-w-sm rounded-lg" />

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          {/* //? Form */}
          <form onSubmit={handleSubmit} className="card-body">
            {/* //@ First name last name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <div className="flex flex-row justify-around">
                <input
                  type="text"
                  placeholder="first-name"
                  name="firstName"
                  onChange={handleChange}
                  className="input input-bordered"
                  style={{ width: "9.5rem" }}
                  required
                />
                <input
                  type="text"
                  placeholder="last-name"
                  className="input input-bordered"
                  style={{ width: "9.5rem" }}
                  name="lastName"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* //@ Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                onChange={handleChange}
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            {/* //@ Username */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                onChange={handleChange}
                name="userName"
                className="input input-bordered invalid:border-error"
                title="Consisting of alphabets, numbers or special characters - or _ of length between 4 and 32 characters"
                pattern="[a-zA-Z0-9\-_]{4,32}"
                required
              />
            </div>

            {/* //@ Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                onChange={handleChange}
                name="password"
                className="input input-bordered invalid:border-error"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,264}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              />
            </div>

            {/* //@ Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                name="confirmPassword"
                className="input input-bordered invalid:border-error"
                required
              />
            </div>

            {/* //@ Submit btn */}
            <div className="form-control mt-3">
              <button type="submit" className="btn btn-primary">
                Sign-up
              </button>
            </div>

            {/* //@ Redirect to login */}
            <div className="mt-1 flex justify-center">
              Already have an account?{" "}
              <Link href="/login">
                <a className="link link-hover" style={{ color: "blue" }}>
                  Login
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
// style={{backgroundImage: "url('/background1.png')"}}
