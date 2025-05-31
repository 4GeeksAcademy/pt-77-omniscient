import React from "react";

export const RawgGameCarousel = ({ games }) => {
  if (!games || games.length === 0) return <p>No games to show.</p>;

  return (
    <div
      id="rawDawgCarousel"
      className="card mb-3"
      style={{
        minWidth: "18rem",
        backgroundColor: "transparent",
        border: "none",
      }}
    >
      <div
        id="rawDawgCarouselInner"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-indicators">
          {games.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#rawDawgCarouselInner"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {games.map((game, index) => (
            <div
              key={game.uid || index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="d-flex justify-content-center">
                <img
                  src={
                    game?.img?.startsWith("//")
                      ? `https:${game.img}`
                      : game.img || "/fallback.jpg"
                  }
                  alt={game.name || "Game image"}
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                  className="d-block"
                  style={{
                    maxHeight: "18rem",
                    width: "50%",
                    // maxWidth: "600px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>{game.name || "Unnamed Game"}</h5>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#rawDawgCarouselInner"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#rawDawgCarouselInner"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
