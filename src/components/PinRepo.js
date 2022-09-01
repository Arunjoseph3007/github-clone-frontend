import React from 'react'
import RepoCards from './RepoCards'
function PinRepo() {
  return (
    <>
      <div className="flex justify-center m-5 ">
          <h3 className="font-serif text-2xl">Popular Repositories</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className=" flex justify-end">
            <RepoCards
              RepoTitle={"GitBase"}
              RepoDescription={
                "If a dog chews shoes whose shoes does he choose? Lorem ipsum dolor sit amet consectetur adipisici elit"
              }
              RepoType={"Public"}
              Date={"12-02-2022"}
            />
          </div>
          <div className=" flex justify-start">
            <RepoCards
              RepoTitle={"GitBase"}
              RepoDescription={
                "If a dog chews shoes whose shoes does he choose? Lorem ipsum dolor sit amet consectetur adipisici elit"
              }
              RepoType={"Public"}
              Date={"12-02-2022"}
            />
          </div>
          <div className=" flex justify-end">
            <RepoCards
              RepoTitle={"GitBase"}
              RepoDescription={
                "If a dog chews shoes whose shoes does he choose? Lorem ipsum dolor sit amet consectetur adipisici elit"
              }
              RepoType={"Public"}
              Date={"12-02-2022"}
            />
          </div>
          <div className=" flex justify-start">
            <RepoCards
              RepoTitle={"GitBase"}
              RepoDescription={
                "If a dog chews shoes whose shoes does he choose? Lorem ipsum dolor sit amet consectetur adipisici elit"
              }
              RepoType={"Public"}
              Date={"12-02-2022"}
            />
          </div>
        </div>
    </>
  )
}

export default PinRepo
