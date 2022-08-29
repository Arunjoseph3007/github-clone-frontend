import Link from "next/link";
export default function Signup() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <div className="avatar">
          <div div className="w-24 mask mask-squircle">
            <img src="/logo2.png" alt="Git" className="object-contain" />
            {/* <img src='https://drive.google.com/file/d/1PElMWB9jza_0RvJcMJBrGA9jxtx8MjYk/view?usp=sharing' alt='Git' /> */}
            {/* <img src='https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80' alt='Git' /> */}
          </div>
        </div>
        <div className="text-center ">
          <h1 className="text-xl font-bold">Sign-in to GitBase</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-3">
              <button className="btn btn-primary">SignUp</button>
            </div>
            <div className="divider">OR</div>
            <div className="mt-1">
              Already have an account?{" "}
              <Link href="/login">
                <a className="link link-hover" style={{ color: "blue" }}>
                  Login
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
