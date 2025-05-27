import React, { useContext } from "react";
import { CartContext } from "../components/CartContext";
import { Cartitems } from "../components/Cartitems";

export const Checkout = () => {

const { cartItems } = useContext(CartContext);

  return (
    <div className="Checkout-page">
      <h1>Checkout</h1>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <Cartitems key={item.id} item={item} />
            ))}
          </div>
        </>
          
      )}
    </div>
  );

};
