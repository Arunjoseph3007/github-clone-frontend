import AllRepo from "@/components/AllRepo";
import PinRepo from "@/components/PinRepo";
import CircularStack from "@/icons/CircularStack";
import { DocumentIcon } from "@/icons/documents";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/context/userContext";

export default function User() {
  const api = process.env.NEXT_PUBLIC_API;
  const [active, setActive] = useState(true);
  const { user } = useUser();
  const [cards, setCards] = useState([]);
  
  function onPinClick() {
    setActive(true);
  }
  function onAllClick() {
    setActive(false);
  }

  useEffect(() => {
    axios.get(api + "/main/repo/").then((res) => setCards(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-base-200  flex">
      <div className="w-[30%] bg-white">
        <div className="avatar flex justify-center mt-[3rem]">
          <div className="w-[20rem] rounded-full overflow-hidden shadow-xl border border-base-300 ">
            <img className="overflow-hidden opacity-90 " src={user.photoUrl} />
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="flex justify-center text-4xl font-serif">
            {user.firstName} {user.lastName}
          </div>
          <div className="flex justify-center text-xl font-sans">
            {user.userName}
          </div>
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
