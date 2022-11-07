import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import Clock from "@/icons/clock";
import { format } from "timeago.js";

function SearchRepoElement({
  repoTitle,
  username,
  repoDescription,
  createdAt,
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full">
      <div className="grid h-[8rem] card rounded-box place-items-center">
        <div className="flex flex-col w-[80%] justify-between">
          <div className="flex justify-between">
            <Link href={username + "/" + repoTitle}>
              <h2 className="card-title hover:cursor-pointer hover:underline text-blue-500">
                {username+"/"+repoTitle}
              </h2>
            </Link>
          </div>
          <p>{repoDescription}</p>
          <div className="flex gap-2 items-center text-sm">
            <Clock /> <p className="grow-0">created {format(createdAt)}</p>
          </div>
        </div>
      </div>
      <div className="divider mt-0"></div>
    </div>
  );
}

export default SearchRepoElement;
