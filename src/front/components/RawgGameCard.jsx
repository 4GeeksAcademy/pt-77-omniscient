import React, { useState, useEffect, useContext } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const RawgGameCard = (props) => {
  const { store, dispatch, saveGameForLater } = useGlobalReducer();
  const [ isSaving, setIsSaving ] = useState(false)
  const [ saveMessage, setSaveMessage ] = useState("")

  // Use localStorage keys unique per game UID to persist likes/dislikes
  const likesKey = `likes_${props.uid}`;
  const dislikesKey = `dislikes_${props.uid}`;

  const [likes, setLikes] = useState(() => {
    // Load from localStorage or start at 0
    return Number(localStorage.getItem(likesKey)) || 0;
  });

  const [dislikes, setDislikes] = useState(() => {
    return Number(localStorage.getItem(dislikesKey)) || 0;
  });
 
  // Whenever likes change, save to localStorage
  useEffect(() => {
    localStorage.setItem(likesKey, likes);
  }, [likes, likesKey]);

  // Whenever dislikes change, save to localStorage
  useEffect(() => {
    localStorage.setItem(dislikesKey, dislikes);
  }, [dislikes, dislikesKey]);


  const handleSaveForLater = async () => {
    // console.log("Saving for later:", props.name);
    setIsSaving(true);
    setSaveMessage('');
    // Prepare game data for the backend
    const gameData = {
      id: props.uid,
      name: props.name,
      uid: props.uid,
      img: props.img,
      summary: props.summary,
      // Add any other props you want to save
      cover: props.img ? { url: props.img } : null,
    };
    try {
      const result = await saveGameForLater(gameData);
      if (result && result.success) {
        setSaveMessage('Saved!');
        // Also dispatch to local state for immediate UI update
        dispatch({
          type: "save_for_later",
          payload: gameData,
        });
      } else {
        setSaveMessage(result?.message || 'Already saved');
      }
    } catch (error) {
      console.error('Error saving game:', error);
      setSaveMessage('Error saving');
      // Fallback to local state only
      dispatch({
        type: "save_for_later",
        payload: gameData,
      });
    } finally {
      setIsSaving(false);
      // Clear message after 2 seconds
      setTimeout(() => setSaveMessage(''), 2000);
    }
  };
 const isGameSaved = store.save_for_later?.some(
      savedGame => savedGame.uid===props.uid || savedGame.name===props.name
    )

  return (
    <div
      className="card text bg-transparent mb-3 h-100 text-center"
      style={{
        minWidth: "18rem",
        border: "2px solid blue",
        borderRadius: "1rem",
        background: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        color: "white",
      }}
    >
      <div className="card-body">
        <Link
          to={`/game/${props.slug}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
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
        </Link>
        <h2 className="card-title">{props.name}</h2>
      </div>
      <div className="d-flex justify-content-center gap-2 mt-2">
        <button
          className="btn btn-outline-success"
          onClick={() => setLikes((prev) => prev + 1)}
        >
          👍 {likes}
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => setDislikes((prev) => prev + 1)}
        >
          👎 {dislikes}
        </button>
         <button
            className={`btn ${isGameSaved ? 'btn-success' : 'btn-primary'}`}
            onClick={handleSaveForLater}
            disabled={isSaving}
            title={isGameSaved ? "Already saved" : "Save for later"}
          >
            <i className={`fa-solid ${isGameSaved ? 'fa-check' : 'fa-bookmark'} me-1`}></i>
            {isSaving ? 'Saving...' : isGameSaved ? 'Saved' : 'Save'}
          </button>
      </div>
    </div>
  );
};
