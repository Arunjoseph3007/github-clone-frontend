import Clock from "@/icons/clock";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { format } from "timeago.js";

function RepoCards({ repoTitle, repoDescription, isPublic = true, createdAt }) {
  const router = useRouter();

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body ">
        <div className="flex justify-between">
          <Link href={router.query.userName + "/" + repoTitle}>
            <h2 className="card-title hover:cursor-pointer hover:underline text-blue-500">
              {repoTitle}
            </h2>
          </Link>
          <span className="indicator-item badge self-end rounded-full">
            {isPublic ? "Public" : "Private"}
          </span>
        </div>
        <p>{repoDescription}</p>
        <div className="flex gap-2 items-center text-sm">
          <Clock />
          <p className="grow-0 tooltip tooltip-right " data-tip="created at">
            created {format(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RepoCards;
