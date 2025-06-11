import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import projectimage1 from "../assets/img/projectimage1.png";

export const GameDetails = () => {
    const { slug } = useParams();
    const [game, setGame] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGameDetailsAndVideos = async () => {
            try {
                const res = await fetch(
                    `https://api.rawg.io/api/games/${slug}?key=e09cf7c5817241ee825687b3373f921f`
                );
                const gameData = await res.json();
                setGame(gameData);
if (gameData.id) {
    const screenshotsRes = await fetch(
        `https://api.rawg.io/api/games/${gameData.id}/screenshots?key=e09cf7c5817241ee825687b3373f921f`
    );
    const screenshotsData = await screenshotsRes.json();
    setScreenshots(screenshotsData.results || []);
}


            } catch (error) {
                console.error("Error fetching game details or videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGameDetailsAndVideos();
    }, [slug]);

    if (loading) return <div>Loading...</div>;
    if (!game) return <div>Game not found.</div>;

    return (
       <div
      className="main"
      style={{
        backgroundImage: `url(${projectimage1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        // height: "100vh",
        width: "100vw",
      }}
    >
      <div className="p-5 text-center text-white ">
        <h1 className="mb-3 text-center">{game.name}</h1>
        <img
          src={game.background_image}
          alt={game.name}
          style={{ maxWidth: "100%", borderRadius: "10px" }}
        />
        <p
          className="mb-4"
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.7",
            color: "white",
          }}
        >
          {game.description_raw}
        </p>
        <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
          <div>
            <span style={{ fontWeight: "bold", color: "#0ff" }}>Released:</span>{" "}
            <span style={{ fontStyle: "italic", color: "#F8F8F8" }}>
              {game.released}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: "bold", color: "#ff0" }}>Rating:</span>{" "}
            <span style={{ fontSize: "1.2rem", color: "#FEFEFE" }}>
              {game.rating}
            </span>
          </div>
        </div>
        <h3
          className="mt-5"
          style={{ fontSize: "2rem", borderBottom: "1px solid #555" }}
        >
          Screenshots
        </h3>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
          {screenshots.length > 0 ? (
            screenshots.map((shot) => (
              <img
                key={shot.id}
                src={shot.image}
                alt="Game screenshot"
                style={{
                  maxWidth: "600px",
                  width: "100%",
                  borderRadius: "10px",
                }}
              />
            ))
          ) : (
            <p>No screenshots available for this game.</p>
          )}
        </div>
      </div>
    </div>
  );
};