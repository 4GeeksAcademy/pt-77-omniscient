import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const GameCard = (props) => {
  console.log("GameCard props:", props);
 

  return (
    <div className="card text-bg-primary mb-3" style={{ minWidth: "18rem" }}>
      <div className="card-body">
        <img src={`https:${props.img}`}
          className="card-img-top"
          alt="gameImage"
          style={{ height: "300px", objectFit: "cover" }}
        />
        <h4 className="card-title">{props.name}</h4>
        <h5 className="retroBio">{props.description}</h5>

        {/* <Link to={`/planet/${props.uid}`} className="btn btn-primary">
          More Info
        </Link> */}
      </div>
    </div>
  );
};


