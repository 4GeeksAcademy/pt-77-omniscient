import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { GameCard } from "../components/GameCard.jsx";


export const Games = () => {

const { store, dispatch } = useGlobalReducer()

  return (
    <div className="text-center mt-5">
   
   <h1>Games Page</h1>
   <GameCard/>
   

    </div>
  );
};