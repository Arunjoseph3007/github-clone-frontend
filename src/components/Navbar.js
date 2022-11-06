import { useUser } from "@/context/userContext";
import { PlusIcon } from "@/icons/plus";
import { SearchIcon } from "@/icons/search";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useUser();

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
            {user ? (
              <div className="dropdown dropdown-left">
                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoUrl} />
                  </div>
                </label>
                <div
                  tabIndex="0"
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow-md bg-base-100 rounded-box w-[24rem]"
                >
                  <Link href={`/${user.userName}`}>
                    <div className="flex flex-col items-center gap-2">
                      <img
                        className="avatar h-[4rem] rounded-full"
                        src={user.photoUrl}
                      />
                      <a className="text-xl">{user.userName}</a>
                      <a className="font-thin text-gray-700">{user.email}</a>
                    </div>
                  </Link>
                  <hr className="my-2" />
                  <ul>
                    <li>
                      <Link href={"/" + user.userName}>
                        <a className="w-full">Profile</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a className="w-full">Settings</a>
                      </Link>
                    </li>
                    <li>
                      <a onClick={logout} className="w-full">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <a className="btn text-white">Login</a>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
