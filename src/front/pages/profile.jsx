import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import projectimage1 from "../assets/img/projectimage1.png";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Profile = () => {
  const { theId } = useParams();
  const { store, getUserById } = useGlobalReducer();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (theId) {
      getUserById(theId);
    }
  }, [theId]);

  useEffect(() => {
    if (store.user == null) {
      setMessage("User not found or not logged in.");
    } else {
      setMessage(`Hello ${store.user.email}`);
    }
  }, [store.user]);

 return (
  <div
    className="text-center container-fluid"
    style={{
      backgroundImage: `url(${projectimage1})`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <div className="account-card mx-auto mt-10 p-6 rounded-2xl text-white text-center bg-[#4A007D] shadow-lg">
      <div className="photo mb-4">
        <div className="w-24 h-24 mx-auto bg-[#FF4081] rounded-full mb-4"></div>
        <h2 className="username text-xl font-bold">{message}</h2>
        <p className="about text-sm mt-2 text-gray-200">
          A game addict. I've been playing games since I was 9, so you can say
          it's part of my life.
        </p>
      </div>
    </div>
  </div>
);
};
