import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import projectimage1 from "../assets/img/projectimage1.png";
import { Carousel } from "../components/Carousel.jsx";

export const Home = () => {
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
    <div
      className="home container-fluid"
      style={{
        backgroundImage: `url(${projectimage1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1 className="text-white mx-auto text-center p-3">Retro Games</h1>

      {retroGames?.length > 0 && (
        <Carousel
          games={retroGames.map((game) => ({
            uid: game.id,
            name: game.name,
            img: game.cover.url,
          }))}
        />
      )}

 



    </div>
  );
};
