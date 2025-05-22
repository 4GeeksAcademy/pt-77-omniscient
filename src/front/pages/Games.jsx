import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { GameCard } from "../components/GameCard.jsx";


export const Games = () => {
  const { store, dispatch, getRawgGames } = useGlobalReducer()
  const [Games, setGames] = useState([])


  useEffect(() => {
    if (store.rawgGames.length == 0) {
      getRawgGames()
    }
  }, [])

  useEffect(() => {
    setGames(store.rawgGames)
    // console.log(store.rawgGames)
  }, [store.RawgGames])

  return (
    <div className="text-center mt-5">

      {Games?.map((rawgGames, index) => {
        return <GameCard key={rawgGames.uid} type={"rawgGames"} name={rawgGames.name} uid={rawgGames.id} img={rawgGames.cover.url} />
      })}

    </div>
  );
}; 