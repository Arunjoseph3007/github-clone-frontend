import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import Clock from "@/icons/clock";

function RepoAllElement({
  RepoTitle,
  RepoDescription,
  RepoType = "Public",
  Date,
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full">
      <div className="grid h-[8rem] card rounded-box place-items-center">
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <Link href={router.query.userName + "/" + RepoTitle}>
              <h2 className="card-title hover:cursor-pointer hover:underline text-blue-500">
                {RepoTitle}
              </h2>
            </Link>
            <span className="indicator-item badge self-end rounded-full">
              {RepoType}
            </span>
          </div>
          <p>{RepoDescription}</p>
          <div className="flex gap-2 items-center text-sm">
            {" "}
            <Clock />{" "}
            <p className="grow-0" >
                created at :  {Date}
            </p>{" "}
          </div>
        </div>
      </div>
      <div className="divider mt-0"></div>
    </div>
  );
}

export default RepoAllElement;
