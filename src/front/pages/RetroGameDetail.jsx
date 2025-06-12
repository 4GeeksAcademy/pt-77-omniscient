import React from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import projectimage1 from "../assets/img/projectimage1.png";

export const RetroGameDetails = () => {
  const { uid } = useParams();
  const { store } = useGlobalReducer();

  const game = store.vintageGames?.find((g) => g.id.toString() === uid);

  if (!game) {
    return <p className="text-white text-center mt-5">Game not found</p>;
  }

  const releaseDate = game.first_release_date
    ? new Date(game.first_release_date * 1000).toLocaleDateString()
    : "Unknown";

  const coverUrl = game.cover?.url
    ? game.cover.url.startsWith("http")
      ? game.cover.url.replace("t_thumb", "t_cover_big")
      : `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
    : null;

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
      <div className="container text-white p-4" style={{ maxWidth: 900 }}>
        <h2>{game.name}</h2>
        {coverUrl && (
          <img
            src={coverUrl}
            alt={game.name}
            style={{
              width: "30%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: "1rem",
              marginBottom: "1rem",
            }}
          />
        )}

        <p>{game.summary}</p>

        {/* Release Date and Genres on the same line */}
        <div
          className="mt-4 mb-3"
          style={{
            fontSize: "1.1rem",
            color: "#ccc",
            lineHeight: "1.6",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <strong style={{ color: "#0ff" }}>Release Date:</strong>{" "}
            <em>{releaseDate}</em>
          </div>

          {game.genres?.length > 0 && (
            <div>
              <strong style={{ color: "#f90" }}>Genres:</strong>{" "}
              {game.genres.map((g) => g.name).join(", ")}
            </div>
          )}
        </div>

        <div
          className="mb-4"
          style={{
            fontSize: "1.1rem",
            color: "#ccc",
            lineHeight: "1.6",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {game.platforms?.length > 0 && (
            <div>
              <strong style={{ color: "#0ff" }}>Platforms:</strong>{" "}
              {game.platforms.map((p) => p.name).join(", ")}
            </div>
          )}

          {game.involved_companies?.length > 0 && (
            <div>
              <strong style={{ color: "#0ff" }}>Developer:</strong>{" "}
              {game.involved_companies.find((c) => c.developer)?.company
                ?.name || "N/A"}
            </div>
          )}

          {game.rating && (
            <div>
              <strong style={{ color: "#ff0" }}>Rating:</strong>{" "}
              <span style={{ fontSize: "1.2rem", color: "#fefefe" }}>
                {Math.round(game.rating)} / 100
              </span>
            </div>
          )}
        </div>

        {game.involved_companies?.length > 0 && (
          <p>
            <strong>Developer:</strong>{" "}
            {game.involved_companies.find((c) => c.developer)?.company?.name ||
              "N/A"}
          </p>
        )}

        <h3 className="mt-5">Screenshots</h3>
        {game.screenshots?.length > 0 ? (
          <div
            className="mt-5"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {game.screenshots.map((shot, idx) => (
              <img
                key={idx}
                src={
                  shot.url.startsWith("http")
                    ? shot.url.replace("t_thumb", "t_screenshot_med")
                    : `https:${shot.url.replace("t_thumb", "t_screenshot_med")}`
                }
                alt={`Screenshot ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              />
            ))}
          </div>
        ) : (
          <p>No screenshots available for this game.</p>
        )}
      </div>
    </div>
  );
};
