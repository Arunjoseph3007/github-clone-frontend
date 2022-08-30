import Link from "next/link";
export default function Signup() {
  return (
    <div className="hero min-h-screen bg-base-200" >
      <div className="hero-content gap-[1rem] md:gap-[8rem] flex-col lg:flex-row">
        <img src="logo3.png" className="max-w-sm rounded-lg" />
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
          <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <div className="flex flex-row justify-around">
                <input
                  type="text"
                  placeholder="first-name"
                  className="input input-bordered"
                  style={{ width: "9.5rem" }}
                />
                <input
                  type="text"
                  placeholder="last-name"
                  className="input input-bordered"
                  style={{ width: "9.5rem" }}
                />
              </div>
            </div>
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
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
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
            </div>
            <div className="form-control mt-3">
              <button className="btn btn-primary">Sign-up</button>
            </div>
            <div className="mt-1 flex justify-center">
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
// style={{backgroundImage: "url('/background1.png')"}}