import { CollaboratorsIcon } from "@/icons/collaborators";
import { PlusIcon } from "@/icons/plus";
import { RemoveUserIcon } from "@/icons/removeUser";
import { SearchIcon } from "@/icons/search";
import MainRepoLayout from "@/layouts/MainRepoLayout";
import axios from "@/libs/axios";
import Link from "next/link";
import { useState, useDeferredValue, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/userContext";
import { toast } from "react-toastify";

export default function ColaboratorsPage() {
  const [collaborators, setCollaborators] = useState([]);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [userSearcResult, setUserSearchResult] = useState([]);
  const deferedUserSearchTerm = useDeferredValue(userSearchTerm);
  const { user: myUser } = useUser();
  const [newColabs, setNewColabs] = useState();
  const [show, setShow] = useState(false);
  const { query } = useRouter();

  useEffect(() => {
    const getCollaborators = async () => {
      if (!query.repoName || !query.userName) return;

      try {
        const res = await axios.get("/main/contributor/", {
          params: { reponame: query.repoName, owner_name: query.userName },
        });

        setCollaborators(
          res.data.map((collab) => ({
            id: collab.id,
            fullName: `${collab.contributor_user.first_name} ${collab.contributor_user.last_name}`,
            userName: collab.contributor_user.username,
            role: collab.has_read_write_access ? "Collaborator" : "Viewer",
            image: `${process.env.NEXT_PUBLIC_API}${collab.contributor_user.profile_pic}`,
          }))
        );
      } catch (error) {
        console.log({ error });
      }
    };

    getCollaborators();
  }, [query]);

  useEffect(() => {
    getSearchUserResult();
  }, [deferedUserSearchTerm]);

  // $ For searching users
  const getSearchUserResult = async () => {
    if (!userSearchTerm) {
      setUserSearchResult([]);
      return;
    }

    try {
      const res = await axios.get(
        `/main/usersearch/?usersearch=${userSearchTerm}`
      );
      setUserSearchResult(
        res.data.map((user) => ({
          userName: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          fullName: user.first_name + " " + user.last_name,
          email: user.email,
          userId: user.user_id,
          image: user.profile_pic?.replace("http://", "https://"),
          role: "Collaborator",
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  function addButtonClick(user) {
    setNewColabs(user);
    setShow(true);
  }

  function removeNewColab(user) {
    setNewColabs(null);
    setShow(false);
    document.getElementById("modal-for-add-people").checked = false;
  }

  //$ For removing collaborators
  const removeCollaborator = async (collaborator) => {
    try {
      const res = await axios.delete(
        `/main/contributor_detail/${collaborator.id}/`
      );

      setCollaborators((prev) => prev.filter((c) => c.id !== collaborator.id));
    } catch (e) {
      console.log(e);
    }
  };

  // $ For adding collaborators
  const addCollaborator = async (collaborator) => {
    try {
      const res = await axios.post(
        "/main/contributor/",
        {
          contributor_user: newColabs.userId,
        },
        { params: { reponame: query.repoName } }
      );
      console.log(newColabs);
      setCollaborators((prev) => [...prev, newColabs]);
      document.getElementById("modal-for-add-people").checked = false;
      toast.success("Collaborator Added Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  // & UI
  return (
    <div>
      <div className="p-3 w-full max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl">Manage Access</h1>
          {myUser?.userName === query.userName ? (
            <>
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
                <div className="modal-box relative w-11/12 max-w-[700px]">
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                    onClick={removeNewColab}
                  >
                    ✕
                  </label>
                  <h3 className="font-bold text-lg">
                    Add a collaborator to your repository
                  </h3>
                  <p className="py-4">
                    You can controll the access given to the user, and of course
                    you can remove them any time
                  </p>
                  <div>
                    {/* //@ Search bar */}
                    <div className={`input-group ${show ? " hidden " : " "}`}>
                      <button className="btn btn-square">
                        <SearchIcon />
                      </button>
                      <input
                        value={userSearchTerm}
                        onChange={(e) => setUserSearchTerm(e.target.value)}
                        type="text"
                        placeholder="Search for any user..."
                        className="input input-bordered w-full"
                      />
                    </div>

                    {/* Single New Collaborator Display */}
                    {show ? (
                      <div className={`flex flex-col gap-2 mt-3 }`}>
                        <div
                          className="flex w-full justify-between items-center gap-4 border rounded p-2"
                          key={newColabs["id"]}
                        >
                          <img
                            className="avatar rounded-full h-14 aspect-square"
                            src={newColabs["image"]}
                            alt="user profile pic"
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold">
                              {newColabs["userName"]}
                            </h3>
                            <h3 className="text-gray-800 text-sm">
                              {newColabs["email"]}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* //@ List of users */}
                    <div
                      className={`flex flex-col gap-2 mt-3 ${
                        show ? " hidden " : " "
                      }`}
                    >
                      {userSearcResult?.length === 0 && (
                        <div className="flex flex-col items-center">
                          <h1 className="text-2xl font-semibold">OOPS!!</h1>
                          <h3 className="text-gray-800 text-sm">
                            No results were found for ther given search term
                          </h3>
                        </div>
                      )}
                      {userSearcResult
                        .filter((u) => u.userName != myUser?.userName)
                        .filter(
                          (u) =>
                            !collaborators
                              .map((c) => c.userName)
                              .includes(u.userName)
                        )
                        .map((user) => (
                          <div
                            className="flex w-full justify-between items-center gap-4 border rounded p-2"
                            key={user.id}
                          >
                            <img
                              className="avatar rounded-full h-14 aspect-square"
                              src={user.image}
                              alt="user profile pic"
                            />
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold">
                                {user.userName}
                              </h3>
                              <h3 className="text-gray-800 text-sm">
                                {user.email}
                              </h3>
                            </div>
                            <button
                              className="btn"
                              onClick={(e) => addButtonClick(user)}
                            >
                              <PlusIcon />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* //@ Buttons */}
                  {show ? (
                    <div className="modal-action">
                      <button
                        className="btn btn-success"
                        onClick={addCollaborator}
                      >
                        Add collaborator
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <hr />
        {/* //@ List of collabs */}
        <div>
          {collaborators.length ? (
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
          ) : (
            <div className="dead-center pt-2 text-3xl">No Collaborator!</div>
          )}
          {collaborators.map((collaborator, i) => (
            <div
              className="flex items-center gap-4 w-full justify-between my-2 py-2 border-b"
              key={i}
            >
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
                className="btn  flex gap-2 tooltip tooltip-left"
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

export const getServerSideProps = async () => ({ props: {} });
