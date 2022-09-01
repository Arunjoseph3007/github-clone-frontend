import AllRepo from "@/components/AllRepo";
import PinRepo from "@/components/PinRepo";
import CircularStack from "@/icons/CircularStack";
import { DocumentIcon } from "@/icons/documents";
import { useState } from "react";

export default function User() {
  const [active, setActive] = useState(true);
  const [FName, setFName] = useState("First Name");
  const [LName, setLName] = useState("Last Name");
  const [UName, setUName] = useState("Username");
  function onPinClick() {
    setActive(true);
  }
  function onAllClick() {
    setActive(false);
  }
  return (
    <div className="min-h-screen bg-base-200  flex">
      <div className="w-[30%] bg-white">
        <div className="avatar flex justify-center mt-[3rem]">
          <div className="w-[20rem] rounded-full overflow-hidden shadow-xl border border-base-300 ">
            <img className="overflow-hidden opacity-90 " src="/logo4.png" />
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="flex justify-center text-4xl font-serif">
            {FName} {LName}
          </div>
          <div className="flex justify-center text-xl font-sans">{UName}</div>
        </div>
      </div>
      <div className="w-[70%]">
        <div className="">{active ? <PinRepo /> : <AllRepo />}</div>
        <div className="btm-nav w-[70%] left-auto">
          <button className={`${active ? "active" : ""}`} onClick={onPinClick}>
            <DocumentIcon />
            <span className="btm-nav-label">Popular Repositories</span>
          </button>
          <button className={`${active ? "" : "active"}`} onClick={onAllClick}>
            <CircularStack />
            <span className="btm-nav-label">All Repositories</span>
          </button>
        </div>
      </div>
    </div>
  );
}
