import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const RawgGameCard = (props) => {
  console.log("GameCard props:", props);
 

  return (
    <div className="card text-bg-primary mb-3" style={{ minWidth: "18rem" }}>
      <div className="card-body">
        <img src={props.img}
          className="card-img-top"
          alt="gameImage"
          style={{ height: "300px", objectFit: "contain" }}
        />
        <h2 className="card-title">{props.name}</h2>
        <h3 className="released">{props.released}</h3>
        <h4 className="rating">{props.rating}</h4>
        <p className="bio">{props.description}</p>
        </div>
    </div>
  );
};

