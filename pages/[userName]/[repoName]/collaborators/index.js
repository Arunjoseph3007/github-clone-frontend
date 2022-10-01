import { CollaboratorsIcon } from "@/icons/collaborators";
import { RemoveUserIcon } from "@/icons/removeUser";
import { SearchIcon } from "@/icons/search";
import MainRepoLayout from "@/layouts/MainRepoLayout";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const DEFAULT_COLLABORATOR_DATA = [
  {
    id: 1,
    fullName: "Bhavik shah",
    userName: "bhavikshah2002",
    role: "Collaborator",
    image: "https://placeimg.com/80/80/people",
  },
  {
    id: 2,
    fullName: "Bhavik shah",
    userName: "bhavikshah2002",
    role: "Collaborator",
    image: "https://placeimg.com/80/80/people",
  },
  {
    id: 3,
    fullName: "Bhavik shah",
    userName: "bhavikshah2002",
    role: "Collaborator",
    image: "https://placeimg.com/80/80/people",
  },
  {
    id: 4,
    fullName: "Bhavik shah",
    userName: "bhavikshah2002",
    role: "Collaborator",
    image: "https://placeimg.com/80/80/people",
  },
  {
    id: 5,
    fullName: "Bhavik shah",
    userName: "bhavikshah2002",
    role: "Collaborator",
    image: "https://placeimg.com/80/80/people",
  },
];

export default function ColaboratorsPage({ collaborators: collabs }) {
  const [collaborators, setCollaborators] = useState(collabs);

  //$ For removing collaborators
  const removeCollaborator = async (collaborator) => {
    try {
      // const res=await axios.delete('some url',collaborator)

      setCollaborators((prev) => prev.filter((c) => c.id !== collaborator.id));
    } catch (e) {
      console.log(e);
    }
  };

  // $ For adding collaborators
  const addCollaborator = async (collaborator) => {
    try {
      const res = await axios.post("some url");
      setCollaborators((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="p-3 w-full max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl">Manage Acces</h1>
          <label
            htmlFor="modal-for-add-people"
            className="btn btn-success gap-2 modal-button"
          >
            <CollaboratorsIcon />
            <span>Add People</span>
          </label>

          {/* //@ Modal */}
          <input
            type="checkbox"
            id="modal-for-add-people"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box  w-11/12 max-w-[700px]">
              <h3 className="font-bold text-lg">
                Add a collaborator to your repository
              </h3>
              <p className="py-4">
                You can controll the access given to the user, and of course you
                can remove them any time
              </p>

              {/* //@ Search bar */}
              <div className="input-group">
                <button className="btn btn-square">
                  <SearchIcon />
                </button>
                <input
                  type="text"
                  placeholder="Search for any user..."
                  className="input input-bordered w-full"
                />
              </div>

              {/* //@ Buttons */}
              <div className="modal-action">
                <button className="btn btn-success">Add collaborator</button>
                <label htmlFor="modal-for-add-people" className="btn">
                  Close
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />

        {/* //@ List of collabs */}
        <div>
          <div className="input-group mt-4 w-[95%] mx-auto">
            <button className="btn btn-square">
              <SearchIcon />
            </button>
            <input
              type="text"
              placeholder="Search for Collaborators"
              className="input input-bordered w-full"
            />
          </div>
          {collaborators.map((collaborator, i) => (
            <div
              className="flex items-center gap-4 w-full justify-between my-2 py-2 border-b"
              key={i}
            >
              <input className="checkbox checkbox-xs" type="checkbox" />
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={collaborator.image} />
                </div>
              </div>
              <div className="flex-1">
                <Link href={`/${collaborator.userName}`}>
                  <a className="font-semibold link link-hover">
                    {collaborator.fullName}
                  </a>
                </Link>
                <div className="flex items-center text-sm text-gray-600">
                  <h3>{collaborator.userName}</h3>
                  <div className="divider lg:divider-horizontal" />
                  <h3>{collaborator.role}</h3>
                </div>
              </div>
              <button
                onClick={(e) => removeCollaborator(collaborator)}
                data-tip={`Once Remove ${collaborator.userName} will no longer have access to the this repository.`}
                className="btn btn-error flex gap-2 tooltip tooltip-left"
              >
                <RemoveUserIcon />
                <span>remove</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ColaboratorsPage.getLayout = MainRepoLayout;

export const getServerSideProps = async (ctx) => {
  try {
    // const res = await axios.get("some url");

    return { props: { collaborators: DEFAULT_COLLABORATOR_DATA } };
  } catch (error) {
    return { notFound: true };
  }
};
