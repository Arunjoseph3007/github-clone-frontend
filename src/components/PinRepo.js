import RepoCards from "./RepoCards";

function PinRepo({ repos }) {
  return (
    <>
      <div className="flex justify-center m-5 ">
        <h3 className="font-serif text-2xl underline">Popular Repositories</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {repos ? (
          repos.map((repo) => {
            return (
              <div key={repo.name} className=" flex justify-center">
                <RepoCards
                  repoTitle={repo.name}
                  repoDescription={repo.description}
                  isPublic={repo.ispublic}
                  createdAt={"12/03/2022"}
                />
              </div>
            );
          })
        ) : (
          <div className=" flex justify-center"></div>
        )}
      </div>
    </>
  );
}

export default PinRepo;
