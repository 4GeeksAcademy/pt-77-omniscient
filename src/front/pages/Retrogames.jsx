import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { GameCard } from "../components/GameCard.jsx";


export const RetroGames = () => {
  const { store, dispatch, getVintageGames } = useGlobalReducer()
  const [retroGames, setRetroGames] = useState([])


  useEffect(() => {
    if (store.vintageGames.length == 0) {
      getVintageGames()
    }
  }, [])

  useEffect(() => {
    setRetroGames(store.vintageGames)
    // console.log(store.vintageGames)
  }, [store.vintageGames])

  return (
    <div className="text-center mt-5">

      {retroGames?.map((vintageGames, index) => {
        return <GameCard key={vintageGames.uid} type={"vintageGames"} name={vintageGames.name} uid={vintageGames.uid} />
      })}

    </div>
  );
}; 