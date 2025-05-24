import React, { useContext } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { CartContext } from "./CartContext.jsx";
import { CartProvider } from "react-use-cart";

export const GameCard = (props) => {
 const {addToCart} = useContext(CartContext);

//  const handleAddToCart = () =>{
//      const item = {
//       // id: props.id,
//       name: props.name,
//       // price: props.price,
//       img: props.img,
  };
  console.log("adding to cart", item)
};

  return (
    <div className="card text-bg-primary mb-3 h-100 text-center" style={{ minWidth: "18rem" }}>
      <div className="card-body">
        <img src={`https:${props.img}`}
          className="card-img-top"
          alt="gameImage"
          style={{ maxHeight: "300px", objectFit: "contain" }}
        />
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
        {/* <button  className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button> */}

      </div>
    </div>
  );
};


