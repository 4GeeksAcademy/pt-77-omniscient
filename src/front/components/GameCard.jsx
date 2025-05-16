import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const GameCard = (props) => {


  return (
    <div className="card text-bg-primary mb-3" style={{ minWidth: "18rem" }}>
      <div className="card-body">
      <img
            src=""
            className="card-img-top"
            alt="gameImage"
            style={{ height: "300px", objectFit: "cover" }}
          />
        <h5 className="card-title">{props.name}</h5>
        
        {/* <Link to={`/planet/${props.uid}`} className="btn btn-primary">
          More Info
        </Link> */}
      </div>
    </div>
  );
};
