import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { GameCard } from "../components/GameCard.jsx";


export const RawgGames = () => {
  const { store, dispatch, getRawgGames } = useGlobalReducer()
  const [rawgGames, setRawgGames] = useState([])


  useEffect(() => {
    if (store.rawgGames.length == 0) {
      getRawgGames()
    }
  }, [])

  useEffect(() => {
    setRawgGames(store.rawgGames)
    // console.log(store.rawgGames)
  }, [store.RawgGames])

  return (
    <div className="text-center mt-5">

      {rawgGames?.map((rawgGames, index) => {
        return <GameCard key={rawgGames.uid} type={"rawgGames"} name={rawgGames.name} uid={rawgGames.id} img={rawgGames.cover.url} />
      })}

    </div>
  );
}; 