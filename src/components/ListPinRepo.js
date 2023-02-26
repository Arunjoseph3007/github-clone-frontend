import React from "react";
import { Bookmarks } from "@/icons/bookmarks";
import { StarIcon } from "@/icons/star";

function ListPinRepo({
  RepoName = "REPO NAME",
  stars = 5,
  is_pinned = false,
  handlePin,
}) {
  return (
    <label className="label  cursor-pointer ">
      <div className="flex items-center justify-start gap-5 ">
        {
          <input
            onChange={handlePin}
            type="checkbox"
            checked={is_pinned}
            className="checkbox checkbox-sm checkbox-primary"
          />
        }
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
