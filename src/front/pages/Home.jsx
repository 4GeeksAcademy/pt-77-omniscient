import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import projectimage1 from "../assets/img/projectimage1.png";
import { Carousel } from "../components/Carousel.jsx";
import { RawgGameCarousel } from "../components/RawgGameCarousel.jsx";


export const Home = () => {
  const { store, dispatch, getVintageGames, getRawgGames } = useGlobalReducer();
  const [retroGames, setRetroGames] = useState([]);
  const [newGames, setNewGames] = useState([]);

  useEffect(() => {
    if (store.vintageGames.length == 0) {
      getVintageGames(dispatch);
    }
    if (!store.rawgGames || store.rawgGames.length === 0) {
      getRawgGames(dispatch);
    }
  }, []);

  useEffect(() => {
    setRetroGames(store.vintageGames);
    setNewGames(store.rawgGames || []);
  }, [store.vintageGames, store.rawgGames]);

  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${projectimage1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1 className="text-white mx-auto text-center p-3">Retro Games</h1>

      <div>
        {retroGames?.length > 0 && (
          <Carousel
            games={retroGames.map((game) => ({
              uid: game.id,
              name: game.name,
              img: game.cover?.url??"",
            }))}
          />
        )}
      </div>
      <h1 className="text-white mx-auto text-center p-3">New Games</h1>
      <div>
        {newGames?.length > 0 && (
          <RawgGameCarousel
            games={newGames.map((game) => ({
              uid: game.id,
              name: game.name,
              img: game.background_image,
            }))}
          />
        )}
      </div>
    </div>
  );
};
