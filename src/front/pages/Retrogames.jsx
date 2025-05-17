import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const RetroGames = () => {
const { store, dispatch, getVintageGames } = useGlobalReducer()
  
useEffect(() => {
  getVintageGames()
  console.log(store.vintageGames)
},[])

  return (
    <div className="text-center mt-5">
   
   <h1>Retro Games Page</h1>

    </div>
  );
};