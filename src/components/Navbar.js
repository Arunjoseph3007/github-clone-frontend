import { PlusIcon } from "@/icons/plus";
import { SearchIcon } from "@/icons/search";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow">
      {/* //@ Left section */}
      <div className="flex-1 ">
        <Link href="/">
          <>
            <img src="/logo4.png" className="w-12" />
            <a className="btn btn-ghost normal-case text-xl">GitBase</a>
          </>
        </Link>
        {/* //@ Search bar */}
        <div className="input-group gap-4">
          <input
            type="text"
            placeholder="Search on GitBase"
            className="input w-full border-none outline-none"
          />
          <button className="btn-square">
            <SearchIcon />
          </button>
        </div>
      </div>

      {/* //@ Right section */}
      <div className="flex-none ">
        <ul className="menu menu-horizontal p-0">
          <li tabIndex="0">
            <Link href="/new">
              <a>
                <PlusIcon />
              </a>
            </Link>
            <div className="dropdown dropdown-left">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" />
                </div>
              </label>
              <ul
                tabIndex="0"
                className="menu menu-compact dropdown-content mt-3 p-2 shadow-md bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/">
                    <a className="w-full">Profile</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className="w-full">Settings</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className="w-full">Logout</a>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
