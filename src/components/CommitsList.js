export default function CommitsList({ data }) {
  const len = data.length;

  return (
    <div className="table w-full">
      {data.map((commit, i) => {
        return (
          <div
            className="border border-gray-500 bg-neutral-focus p-2 my-2 rounded-md flex justify-between items-center w-full "
            key={commit.objectId}
          >
            <div className="w-1/2">
              <p className="cursor-pointer text-xl">{commit.message}</p>
              <div className="flex items-center gap-3">
                <p className="text-lg">{commit.authorName}</p>
                <p>{commit.date}</p>
              </div>
            </div>
            <p className="w-1/3">{commit.objectId}</p>
          </div>
        );
      })}
    </div>
  );
}
