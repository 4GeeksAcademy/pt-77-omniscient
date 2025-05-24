import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { RawgGameCard } from "../components/RawgGameCard.jsx";

export const Games = () => {
  const { store } = useGlobalReducer();
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("https://api.rawg.io/api/games?key=e09cf7c5817241ee825687b3373f921f")
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (Array.isArray(data)) {
            setGames(data);
          } else if (Array.isArray(data.results)) {
            setGames(data.results);
          } else {
            console.error("Unexpected format from /api/games:", data);
            setGames([]);
          }
        } catch (err) {
          console.error("Invalid JSON response:", text);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    setGames(store.rawgGames?.results || store.rawgGames || []);
  }, [store.rawgGames]);

  return (
    <div className="text-center mt-5">
      {games.map((rawgGame) => (
        <RawgGameCard
          key={rawgGame.id}
          img={rawgGame.cover?.url || rawgGame.background_image}
          name={rawgGame.name}
          released={rawgGame.released}
          rating={rawgGame.rating}
        />
      ))}
    </div>
  );
};