import React, { useContext } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { CartContext } from "./CartContext.jsx";
import { CartProvider } from "react-use-cart";

export const GameCard = (props) => {
  // const { addToCart } = useContext(CartContext);

  // const handleAddToCart = () => {
  //   const item = {
  //     id: props.id,
  //     name: props.name,
  //     price: props.price,
  //     img: props.img,
  //   };
  //   addToCart(item)
  // };

  return (
    <div
      className="card text bg-transparent mb-3 h-100 text-center"
      style={{
        minWidth: "18rem",
        border: "1px solid rgba(255, 255, 255, 0.2)",
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
          src={`https:${props.img}`}
          className="card-img-top"
          alt="gameImage"
          style={{
            maxHeight: "300px",
            objectFit: "contain",
            imageRendering: "auto",
            borderRadius: ".5rem",
          }}
        />
        <h4 className="card-title">{props.name}</h4>
        <h5 className="retroBio">{props.description}</h5>

        {/* <Link to={`/planet/${props.uid}`} className="btn btn-primary">
          More Info
        </Link> */}
       
        <button className="btn btn-primary" >Add to Cart</button>
      </div>
    </div>
  );
};
