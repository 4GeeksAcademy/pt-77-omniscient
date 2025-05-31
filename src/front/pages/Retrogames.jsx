import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { GameCard } from "../components/GameCard.jsx";
import projectimage1 from "../assets/img/projectimage1.png";


export const RetroGames = () => {
  const { store, dispatch, getVintageGames } = useGlobalReducer();
  const [retroGames, setRetroGames] = useState([]);

  useEffect(() => {
    if (store.vintageGames.length == 0) {
      getVintageGames();
    }
  }, []);

  useEffect(() => {
    setRetroGames(store.vintageGames);
    // console.log(store.vintageGames)
  }, [store.vintageGames]);

  return (
    <div className=" text-center  container-fluid"
     style={{
             backgroundImage: `url(${projectimage1})`,
             backgroundSize: "cover",
             backgroundPosition: "center",
             backgroundAttachment: "fixed",
             backgroundRepeat: "no-repeat",
            //  height: "100vh",
             width: "100vw",
           }}>
      <div>
        <h1>Welcome to our Retro Game selcetion</h1>
      </div>
<div className="row">
      {retroGames?.map((vintageGames, index) => {
       
        return (
          <div key={vintageGames.uid} className="col-6 col-md-4 col-lg-3 mb-4">
          <GameCard
            key={vintageGames.uid}
            type={"vintageGames"}
            name={vintageGames.name}
            uid={vintageGames.id}
            img={vintageGames.cover.url}
            summary={vintageGames.summary}
          />
          </div>
        
        );
      })}
      </div>


    </div>
  );
};
