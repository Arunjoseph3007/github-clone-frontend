import Link from "next/link";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();

    /*
    @ handle login here
    */
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
                placeholder="email"
                className="input input-bordered"
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
