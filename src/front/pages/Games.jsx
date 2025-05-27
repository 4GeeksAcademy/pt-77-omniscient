import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { RawgGameCard } from "../components/RawgGameCard.jsx";

export const Games = () => {
  const { store } = useGlobalReducer();
  const [games, setGames] = useState([]);
  const [gamesWithDescriptions, setGamesWithDescriptions] = useState([]);

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

  useEffect(() => {
  const fetchDescriptions = async () => {
    if (games.length === 0) return;

    const enrichedGames = await Promise.all(
      games.map(async (game) => {
        try {
          const res = await fetch(`https://api.rawg.io/api/games/${game.slug}?key=e09cf7c5817241ee825687b3373f921f`);
          const data = await res.json();
          return { ...game, description: data.description_raw || "" };
        } catch (error) {
          console.error(`Failed to fetch description for ${game.name}`, error);
          return { ...game, description: "" };
        }
      })
    );

    setGamesWithDescriptions(enrichedGames);
  };

  fetchDescriptions();
}, [games]);

  return (
    <div className="text-center mt-5">
      {gamesWithDescriptions.map((rawgGame) => (
        <RawgGameCard
          key={rawgGame.id}
          img={rawgGame.background_image}
          name={rawgGame.name}
          released={rawgGame.released}
          rating={rawgGame.rating}
          description={rawgGame.description}
        />
      ))}
    </div>
  );
};