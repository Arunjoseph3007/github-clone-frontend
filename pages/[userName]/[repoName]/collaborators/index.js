import { CollaboratorsIcon } from "@/icons/collaborators";
import { SearchIcon } from "@/icons/search";
import MainRepoLayout from "@/layouts/MainRepoLayout";

export default function ColaboratorsPage() {
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
      </div>
    </div>
  );
}

ColaboratorsPage.getLayout = MainRepoLayout;
