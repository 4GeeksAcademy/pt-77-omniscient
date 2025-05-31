import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const RawgGameCard = (props) => {
  console.log("GameCard props:", props);

  return (
    <div
      className="card text bg-transparent mb-3 h-100 text-center"
      style={{
        minWidth: "18rem",
        border: "1px solid rgba(10, 10, 10, 0.2)",
        borderRadius: "1rem",
        background: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        color: "white",
      }}
    >
      <div className="card-body">
        <img
          src={props.img}
          className="card-img-top"
          alt="gameImage"
          style={{
            height: "300px",
            objectFit: "contain",
            imageRendering: "auto",
            borderRadius: ".5rem",
          }}
        />
        <h2 className="card-title">{props.name}</h2>
        <h3 className="released">Release Date:{props.released}</h3>
        <h4 className="rating">Rated: {props.rating}</h4>
        <p className="bio">{props.description}</p>
      </div>
    </div>
  );
};
