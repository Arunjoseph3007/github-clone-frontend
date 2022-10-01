import { useState,useEffect } from "react";
import RepoCards from "./RepoCards";
function PinRepo() {
  const [cards, setCards] = useState(['','','','']);
  let card = [
    "GitBase",
    "If a dog chews shoes whose shoes does he choose? Lorem ipsum dolor sit amet consectetur adipisici elit",
    "Public",
    "12-02-2022",
  ];
  function trail() {
      setCards([card,card,card,card])   
  }
  useEffect(() => {
    trail()
   //eslint-disable-next-line
 }, []);
  return (
    <>
      <div className="flex justify-center m-5 ">
        <h3 className="font-serif text-2xl underline">Popular Repositories</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* <div className=" flex justify-end">
          <RepoCards
            RepoTitle={"GitBase"}
            RepoDescription={
              "If a dog chews shoes whose shoes does he choose? Lorem ipsum dolor sit amet consectetur adipisici elit"
            }
            RepoType={"Public"}
            Date={"12-02-2022"}
          />
        </div> */}
        { cards?cards.map((cards) => {
        return (
        <div className=" flex justify-center">
          <RepoCards
            RepoTitle={cards[0]}
            RepoDescription={cards[1]}
            RepoType={cards[2]}
            Date={cards[3]}
          />
        </div>
          
        );
      }):<div className=" flex justify-center"></div>}
        
      </div>
    </>
  );
}

export default PinRepo;
