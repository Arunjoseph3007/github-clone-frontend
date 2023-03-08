import React from "react";
import { StarIcon } from "@/icons/star";
import Starred from "@/icons/starred";
import { BranchIcon } from "@/icons/branch";
import Link from "next/link";
import { useUser } from "@/context/userContext";

function ForkStar({ basePath, isStar, Star_Repo }) {
  const { user } = useUser();
  if (!user) return <></>;
  return (
    <div className="hidden md:flex items-center gap-5 py-3">
      <Link href={basePath + "fork"}>
        <button className="btn gap-2">
          <BranchIcon />
          <span>fork</span>
        </button>
      </Link>
      <button className="btn gap-2" onClick={Star_Repo}>
        {isStar ? <Starred /> : <StarIcon />}
        <span>star</span>
      </button>
    </div>
  );
}

export default ForkStar;
