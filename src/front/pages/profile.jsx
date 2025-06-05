import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectimage1 from "../assets/img/projectimage1.png";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Profile = () => {
  const navigate = useNavigate();
  const { theId } = useParams();
  const { store, dispatch, getUserById } = useGlobalReducer();
  const [message, setMessage] = useState("");
  const [about, setAbout] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

 useEffect(() => {
  if (theId && !store.user) {
    getUserById(theId);
  }
}, [theId, store.user]);

  useEffect(() => {
    if (store.user?.about !== undefined) {
      setAbout(store.user.about);
    }
  }, [store.user?.about]);

  useEffect(() => {
    console.log("Checking auth", store.access_token, store.user);
    if (!store.access_token || !store.user) {
      console.log("Redirecting to /must-login");
      navigate("/must-login");
    } else {
      setMessage(`Hello! ${store.user.email}`);
      setAbout(store.user.about || "");
    }
  }, [store.user, store.access_token]);

  const handleSave = async () => {
    const token = sessionStorage.getItem("access_token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ about }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({
          type: "update_about",
          payload: about,
        });
        setSuccessMsg("About updated successfully!");
        setIsEditing(false);
      } else {
        setSuccessMsg(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      setSuccessMsg("Failed to update about info.");
    }
  };

  const handleDeleteAbout = async () => {
  const token = sessionStorage.getItem("access_token");

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ about: "" }), // Send empty string
    });

    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "update_about", payload: "" }); // Clear from store
      setAbout(""); // Clear from local state
      setSuccessMsg("About section deleted.");
      setIsEditing(false); // Exit editing mode
    } else {
      setSuccessMsg(`Error: ${data.error || "Something went wrong"}`);
    }
  } catch (err) {
    setSuccessMsg("Failed to delete about section.");
  }
};

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
          <img src="https://i.pinimg.com/736x/5c/a7/c6/5ca7c68dabec33e530fd510941632abe.jpg" className="img-fluid" alt="..."></img>
          <h1 className="username text-xl font-bold">{message}</h1>
          <p className="about-user">
            <h2><strong>About</strong></h2>
          </p>
          {isEditing ? (
            <div>
              <textarea
                className="text-sm text-white p-2 rounded w-full bg-transparent border-none"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={4}
              />
              <div className="save and delete">
              <button
                className=" save mx-auto mt-2 bg-white text-[#4A007D] px-4 py-1 rounded font-bold"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className=" delete mt-2 bg-gray-300 text-black px-4 py-1 rounded font-bold"
                 onClick={handleDeleteAbout}
              >
                Delete
              </button>
              <p className="text-green-200 mt-2">{successMsg}</p>
            </div>
            </div>
          ) : (
            <div>
              <p className="edit text-sm text-gray-200">{about}</p>
              <button
                className="mt-2 bg-white text-[#4A007D] px-4 py-1 rounded font-bold"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="saved-games-card">
        <h2>
          <strong>Saved Games</strong>
        </h2>
      </div>
    </div>
  );
};
