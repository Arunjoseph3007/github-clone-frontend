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
    <div className="gap-2 flex items-center md:gap-5 py-3">
      <Link href={basePath + "fork"}>
        <button className="btn btn-sm md:btn gap-2 items-center ">
          <BranchIcon />
          <span className="hidden md:block">fork</span>
        </button>
      </Link>
      <button className="btn btn-sm md:btn gap-2 items-center " onClick={Star_Repo}>
        {isStar ? <Starred /> : <StarIcon  />}
        <span className="hidden md:block">star</span>
      </button>
    </div>
  );
}

export default ForkStar;
