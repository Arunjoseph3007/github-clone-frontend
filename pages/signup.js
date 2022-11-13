import { useUser } from "@/context/userContext";
import axios from "@/libs/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

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
  const router = useRouter();
  const { register } = useUser();

  //$ Change handler
  const handleChange = (e) =>
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  //$ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userDetails.password !== userDetails.confirmPassword) return;

    const res = await register(userDetails);

    if (res.success) router.push("/login");
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content p-[0.5rem] sm:p-[1rem] gap-[1rem] lg:gap-[8rem] flex-col lg:flex-row">
        <img
          src="logo3.png"
          className="max-w-[10rem]  sm:max-w-sm rounded-lg"
        />

        <div className="card text-[0.8rem] md:text-[0.875rem] flex-shrink-0 w-full max-w-[15rem] sm:max-w-sm  shadow-lg md:shadow-2xl bg-base-100">
          {/* //? Form */}
          <form
            onSubmit={handleSubmit}
            className="card-body gap-[0rem] sm:gap-[0.5rem] p-[1.4rem] sm:p-[2rem]"
          >
            {/* //@ First name last name */}
            <div className="form-control">
                <label className="label hidden md:block">
                  <span className="label-text">Name</span>
                </label>
                <div className="flex flex-col md:flex-row justify-around">
                  <label className="label block md:hidden">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="first-name"
                    name="firstName"
                    onChange={handleChange}
                    className="input input-bordered"
                    style={{ width: "9.5rem" }}
                    required
                  />
                  <label className="label block md:hidden">
                    <span className="label-text">Last Name</span>
                  </label>
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
              <button
                type="submit"
                className="btn btn-primary btn-xs sm:btn-sm"
              >
                Sign-up
              </button>
            </div>

            {/* //@ Redirect to login */}
            <div className="mt-1 flex justify-center">
              <div>
                Already have an account?{" "}
                <Link href="/login">
                  <a className="link link-hover" style={{ color: "blue" }}>
                    Login
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
// style={{backgroundImage: "url('/background1.png')"}}
