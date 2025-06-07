import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { GameCard } from "../components/GameCard.jsx";
import projectimage1 from "../assets/img/projectimage1.png";
// import { Link } from "react-router-dom";

export const RetroGames = () => {
  const { store, dispatch, getVintageGames } = useGlobalReducer();
  const [retroGames, setRetroGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (store.vintageGames.length === 0) {
      getVintageGames();
    }
  }, []);

  useEffect(() => {
    setRetroGames(store.vintageGames);
  }, [store.vintageGames]);

  const filteredGames = retroGames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="text-center container-fluid"
      style={{
        backgroundImage: `url(${projectimage1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        width: "100vw",
      }}
    >
      {/* Header with centered title and top-right search bar */}
      <div
        style={{
          position: "relative",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h1
          className="text-white"
          style={{
            textAlign: "center",
            margin: 0,
            fontWeight: "bold",
          }}
        >
          A Wide Selection of Retro Games
        </h1>

        <input
          type="text"
          placeholder="Search retro games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "250px",
            minWidth: "150px",
            padding: "0.4rem 0.75rem",
            borderRadius: "20px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            fontSize: "1rem",
            outline: "none",
          }}
        />
      </div>

      <div className="row">
        {filteredGames.length > 0 ? (
          filteredGames.map((vintageGames) => (
            <div
              key={vintageGames.uid}
              className="col-6 col-md-4 col-lg-3 mb-4"
            >
              {/* <Link
                to={`/retrogame/${vintageGames.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              > */}
                <GameCard
                  type={"vintageGames"}
                  name={vintageGames.name}
                  uid={vintageGames.id}
                  img={vintageGames.cover?.url || ""}
                  summary={vintageGames.summary}
                />
              {/* </Link> */}
            </div>
          ))
        ) : (
          <p className="text-white">No retro games found.</p>
        )}
      </div>
    </div>
  );
};
