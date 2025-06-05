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
  console.log(game);
  const releaseDate = game.first_release_date
    ? new Date(game.first_release_date * 1000).toLocaleDateString()
    : "Unknown";

  console.log("Full game object:", JSON.stringify(game, null, 2));

  const coverUrl = game.cover?.url
    ? game.cover.url.startsWith("http")
      ? game.cover.url.replace("t_thumb", "t_cover_big")
      : `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
    : null;

  return (
    <div
      className=" text-center  container-fluid"
      style={{
        backgroundImage: `url(${projectimage1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        //  height: "100vh",
        width: "100vw",
      }}
    >
      <div className="container text-white ">
        <h2>{game.name}</h2>
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

        <p>{game.summary}</p>
        <p>
          <strong>Release Date:</strong> {releaseDate}
        </p>

        {game.genres?.length > 0 && (
          <p>
            <strong>Genres:</strong> {game.genres.map((g) => g.name).join(", ")}
          </p>
        )}

        {game.platforms?.length > 0 && (
          <p>
            <strong>Platforms:</strong>{" "}
            {game.platforms.map((p) => p.name).join(", ")}
          </p>
        )}

        {game.involved_companies?.length > 0 && (
          <p>
            <strong>Developer:</strong>{" "}
            {game.involved_companies.find((c) => c.developer)?.company?.name ||
              "N/A"}
          </p>
        )}

        {game.rating && (
          <p>
            <strong>Rating:</strong> {Math.round(game.rating)} / 100
          </p>
        )}

        <h3 className="mt-5">Screenshots</h3>
        {game.screenshots?.length > 0 && (
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
        )}
      </div>
    </div>
  );
};
