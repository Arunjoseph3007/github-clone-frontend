import React from "react";
import { Bookmarks } from "@/icons/bookmarks";
import { StarIcon } from "@/icons/star";

function ListPinRepo({RepoName="REPO NAME",stars=5,is_pinned=false}) {
  return (
    <label className="label  cursor-pointer ">
      <div className="flex justify-start gap-5 ">
        {<input type="checkbox" defaultChecked={is_pinned}  className="checkbox checkbox-primary" />}
        <Bookmarks />
        <span className="label-text font-semibold">{RepoName}</span>
      </div>
      <div className="rating rating-md gap-2">
        <p>{stars}</p>
        <StarIcon />
      </div>
    </label>
  );
}

export default ListPinRepo;
