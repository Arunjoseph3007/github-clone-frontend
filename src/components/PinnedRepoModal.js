import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "@/libs/axios";
import { PlusIcon } from "@/icons/plus";
import ListPinRepo from "./ListPinRepo";

function PinnedRepoModal({ allRepos }) {
  const [pinList, setPinList] = useState(
    allRepos.filter((r) => r.is_pinned).map((r) => r.id)
  );

  const addOrRemovePin = (id) => {
    if (pinList.includes(id)) {
      setPinList((prev) => prev.filter((el) => el !== id));
    }

    if (pinList.length >= 4) return;

    if (!pinList.includes(id)) {
      setPinList((prev) => [...prev, id]);
    }
  };

  const handleSave = async (e) => {
    try {
      const res = await axios.post(
        `/main/pinned_repo/?list_of_repo_ids=${pinList.join(",")}`
      );

      if (res.status == 200) {
        toast.success("Pinned repo changed");
        location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // & UI
  return (
    <div className="modal-box">
      <label
        htmlFor="my-modal2"
        className="btn btn-sm rounded-full h-10 w-10 absolute top-5 right-5 rotate-45"
      >
        <PlusIcon />
      </label>
      <h3 className="font-bold text-lg mb-5">Edit Pinned Repositories</h3>
      <div className="h-[25rem] overflow-scroll">
        <div className="form-control overflow-scroll">
          {allRepos.map((repo) => (
            <ListPinRepo
              key={repo.id}
              RepoName={repo.name}
              stars={repo.stars}
              is_pinned={pinList.includes(repo.id)}
              handlePin={() => addOrRemovePin(repo.id)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default PinnedRepoModal;
