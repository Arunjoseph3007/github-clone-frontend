import Clock from "@/icons/clock";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function RepoCards({RepoTitle, RepoDescription, RepoType='Public', Date}) {
    const router = useRouter();
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body ">
        <div className="flex justify-between">
            <Link href={router.query.userName+'/'+RepoTitle}>
                <h2 className="card-title hover:cursor-pointer hover:underline text-blue-500">{RepoTitle}</h2>
            </Link>
          <span className="indicator-item badge self-end rounded-full">
            {RepoType}
          </span>
        </div>
        <p>
          {RepoDescription}
        </p>
        <div className="flex gap-2 items-center text-sm" > <Clock/> <p className="grow-0 tooltip tooltip-right " data-tip='created at'>{Date}</p> </div>
      </div>
    </div>
  );
}

export default RepoCards;
